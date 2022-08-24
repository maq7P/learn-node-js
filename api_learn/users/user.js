import express from "express";

const userRouter = express.Router();

userRouter.use(() => {

});

userRouter.get("/login", (req, res) => {
    res.send("login")
});

userRouter.post("/register", (req, res) => {
    res.send("register")
});