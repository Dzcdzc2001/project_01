const express = require("express");
const indexRouter = require("./routers/indexRouter");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const app = express();
app.use(indexRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.listen(8989);

