import express from "express";
import { createConnection } from "typeorm";
import { Article } from "./entities/Article";
import { User } from "./entities/User";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from root directory....",
  });
});

async function start() {
  await createConnection({
    type: "postgres",
    username: "counduit",
    password: "counduit",
    database: "counduit",
    entities: [User, Article],
    dropSchema: true,
    synchronize: true,
    logging: true,
    logger: "advanced-console",
  });
  app.listen(3232, () => {
    console.log("app is running on port ", 3232);
  });
}

start();
