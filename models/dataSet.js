const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    data:Object,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const dataSetModel = mongoose.model("dataSet", sessionSchema);

module.exports = dataSetModel;
