import { Client } from "pg";

const client: Client = new Client({
  user: "megazord",
  host: "localhost",
  port: 5432,
  password: "12345",
  database: "movies_database",
});
const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database Connected Success");
};
export { startDataBase, client };
