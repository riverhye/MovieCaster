const express = require("express");
const app = express();
const PORT = 8000;
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

const router = require("./routes");
app.use("/", router);

const detailRouter = require("./routes/detail");
app.use("/detail", detailRouter);

const mypageRouter = require("./routes/mypage");
app.use("/mypage", mypageRouter);

const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

const signinRouter = require("./routes/signin");
app.use("/signin", signinRouter);

const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);

const findidRouter = require("./routes/findid");
app.use("/findid", findidRouter);

const findpwRouter = require("./routes/findpw");
app.use("/findpw", findpwRouter);

/*
app.get("*", function(req, res){
    res.render("404");
})
*/

app.listen(PORT, function () {
  console.log(`Server Open! 서버 주소: http://localhost:${PORT}`);
});
