import exceljs from "exceljs";
import TelegramBot from "node-telegram-bot-api";
import { writeToExcel } from "./config/excel.js";
import { getQuery } from "./config/graphql.js";
import { getMakers } from "./config/query.js";
import { getDateFromTimestamp } from "./config/dateToTimestamp.js";
import { TELEGRAM_BOT_API_KEY } from "./consts.js";

const { Workbook } = exceljs;

const workbook = new Workbook();

const worksheet = workbook.addWorksheet("My Sheet");

export const bot = new TelegramBot(TELEGRAM_BOT_API_KEY, {
  polling: true,
});

bot.on("text", async (msg) => {
  try {
    if (msg.text?.startsWith("/start")) {
      await bot.sendMessage(msg.chat.id, `Вы запустили бота!`);
    }
  } catch (error) {
    console.log(error);
  }
});

bot.onText(/\/wallet/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "Введите адрес торговой пары токена");
  bot.once("message", async (msg) => {
    let wallet = msg.text;
    if (wallet.startsWith("/")) return;
    await bot.sendMessage(
      chatId,
      "Старт транзакций (например 20.10.2023 17:00)"
    );
    bot.once("message", async (msg) => {
      if (msg.text.startsWith("/")) return;

      const startTransaction = getDateFromTimestamp(msg.text);

      await bot.sendMessage(chatId, "Конец транзакций");
      bot.once("message", async (msg) => {
        if (msg.text.startsWith("/")) return;

        const finishTransaction = getDateFromTimestamp(msg.text);

        if (!startTransaction || !finishTransaction || !wallet) {
          return;
        }

        const query = getMakers({
          wallet,
          startTransaction,
          finishTransaction,
        });

        const makers = await getQuery(query);

        const set = new Set();

        makers.forEach((element) => {
          set.add(element.maker);
        });

        writeToExcel(set, workbook, worksheet);

        setTimeout(() => {
          bot.sendDocument(msg.chat.id, "./myFile.xlsx");
        }, 500);
      });
    });
  });
});
