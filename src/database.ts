import { Client } from "pg";
import "dotenv/config";

const client: Client = new Client({
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  password: process.env.DB_PASSWORD!,
  database: process.env.DB!,
});

const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database Connected Success");
};

export { startDataBase, client };
