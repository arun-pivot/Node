const router = require("express").Router();
const {
    createDataSet,
    getAllDataSet,
    calculateAvg
} = require("../controllers/dataSetController");

router.get("/", getAllDataSet);
router.post("/save", createDataSet);
router.post("/get-average", calculateAvg);
module.exports = router;
