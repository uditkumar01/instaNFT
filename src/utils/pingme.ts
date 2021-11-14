import axios from "axios";
import { formatDate } from "./formatDate";

const CHAT_IDS = process.env.CHAT_IDS?.split(",") || [];

export async function pingMe(text: string) {
  const updatedText = `${formatDate(new Date())} \n\n${text}`;
  try {
    await Promise.all(
      CHAT_IDS.map(async (chatId) => {
        const res = await axios.post(
          `https://api.telegram.org/bot${process.env.BOT_ID}/sendMessage`,
          {
            chat_id: chatId,
            text: updatedText,
          }
        );
        return res?.data;
      })
    );
  } catch (error: any) {
    console.log(error?.response?.data, "error while sending tg message");
  }
}
