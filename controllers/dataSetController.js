const Dataset = require("../models/dataSet");
const mongoose = require("mongoose");
const _ = require("lodash");
let avg = [0];
const createDataSet = async (req, res, next) => {
    try {
        const { data } = req.body;
        const dataSet = await Dataset.create({
            data:data,
            createdAt: new Date()
        });
        return res.status(200).send({ success: true, data: dataSet });
     } catch (error) {
         next(error);
     }
};

const getAllDataSet = async (_req, res, next) => {
    try {
        const dataset = await Dataset.find({}, { __v: 0 }).sort({"createdAt":-1})
        return res.status(200).send({ success: true, data: dataset });
    } catch (error) {
        next(error);
    }
};
const calculateAvg = async (req, res, next) => {
        
    try {
        let parsedData = (JSON.parse(req.body.data))
        let smallestData = parsedData.reduce((prev, next) => prev.length > next.length ? next : prev)
        for(var i =0 ;i<parsedData.length;i++){
            parsedData[i].length = smallestData.length
         
        }
        result = parsedData.reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (((r[i]) || 0) + (b)/parsedData.length);
            });
            return r;
        }, []);
        return res.status(200).send({ success: true, data: JSON.stringify(result) });
     } catch (error) {
         next(error);
     }
};

module.exports = { createDataSet, getAllDataSet,calculateAvg };
