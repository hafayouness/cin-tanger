import { sequelize } from "../config/database.js";

export default async function setup() {
  let retries = 10;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("✅ DB ready for tests");
      break;
    } catch (err) {
      retries -= 1;
      console.log("DB not ready, retrying in 2s...");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}
