import express, { Request, Response, NextFunction } from "express";

import { userRouter } from "./users/user";

const port = 8000;
const app = express();

app.use((req,res, next) => {
    console.log("Время: ", Date.now());
    next();
});

app.get("/hello", (req,res) => {
    res.end()
});

app.use("/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500);
});

app.listen(port, () => {
    console.log(`liistening on ${port}`);
});
