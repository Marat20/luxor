export const writeToExcel = (arr, workbook, worksheet) => {
  arr.forEach((row) => {
    worksheet.addRow([row]);
  });

  workbook.xlsx.writeFile("./myFile.xlsx");

  workbook.removeWorksheet(worksheet.id);
};
