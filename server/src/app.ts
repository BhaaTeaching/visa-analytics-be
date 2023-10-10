import express, { Request, Response } from "express";
import { add, readeExcelFile } from "./services/files/FileService";

const app = express();
app.get("/greeting", (req: Request, res: Response) => {
  res.send("hello world");
});
app.get("/", (req: Request, res: Response) => {
  const fileContent = readeExcelFile();
  console.log("request reached ...");
  res.send(fileContent);
});

app.listen(5000, () => console.log("Server runing"));
