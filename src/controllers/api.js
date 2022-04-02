const { Router } = require("express");

const userRouter = require("./routes/user");
const contactRouter = require("./routes/contact");

const router = Router();

router.use("/user", userRouter);
router.use("/contact", contactRouter);

module.exports = router;
