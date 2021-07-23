const router = require("express").Router();
const indexController = require("../controllers");
const notesRouter = require("./dataSet");

router.get("/", indexController);
router.use("/data", notesRouter);

module.exports = router;
