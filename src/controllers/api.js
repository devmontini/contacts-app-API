const { Router } = require("express");

const perfilRouter = require("./routes/perfil");
const postRouter = require("./routes/post");
const contactRouter = require("./routes/contact");
const userRouter = require("./routes/user");
const followRouter = require("./routes/follow");

const router = Router();

router.use("/perfil", perfilRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/contact", contactRouter);
router.use("/follow", followRouter);

module.exports = router;
