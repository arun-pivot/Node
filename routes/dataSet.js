const router = require("express").Router();
const {
    createDataSet,
    getAllDataSet,
    calculateAvg
} = require("../controllers/dataSetController");

router.get("/", getAllDataSet);
router.post("/", createDataSet);
router.post("/avg", calculateAvg);
module.exports = router;
