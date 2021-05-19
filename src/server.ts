import express from "express";
import { createConnection } from "typeorm";
import { Article } from "./entities/Article";
import { User } from "./entities/User";
import { userRouter } from "./routes/user";
import { usersRouter } from "./routes/users";
import { config } from "dotenv";
import { resolve } from "path";
// providing environment variables;
config({
  path: resolve(__dirname, "../src/config/.env"),
});

//  initializing our express app
const app = express();
app.use(express.json());
const Port = process.env.PORT || 5000;

// configuring  app end-point
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from root directory....",
  });
});
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);

// database connections
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
  app.listen(Port, () => {
    console.log("app is running on port ", Port);
  });
}

start();
console.log(process.env.JWT_SECRET, "IS JWT SERCRET STRING");
console.log(__dirname);
