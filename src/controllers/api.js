const { Router } = require("express");

const userRouter = require("./routes/user");
const postRouter = require("./routes/contact");
const contactRouter = require("./routes/contact");

const router = Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/contact", contactRouter);

module.exports = router;
