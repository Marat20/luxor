import axios from "axios";
import { DEFINED_API_KEY, DEFINED_URL } from "../consts.js";

export const getQuery = async (query) => {
  try {
    const response = await axios.post(
      DEFINED_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: DEFINED_API_KEY,
        },
      }
    );
    return response.data.data.getTokenEvents.items;
  } catch (error) {}
};
