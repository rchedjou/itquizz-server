const express = require("express");
const route = express.Router();
const { Qcm } = require("../models");


//Route to all qcm
route.get("/", async (req, res)=>{
    const listOfQcm = await Qcm.findAll();
    res.json(listOfQcm);
});

//Route to add a new qcm
route.post("/", async (req, res)=>{
    const qcm = req.body;
    await Qcm.create(qcm);
    res.json(qcm);
});

module.exports = route;