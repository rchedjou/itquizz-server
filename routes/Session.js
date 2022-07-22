const express = require("express");
const router = express.Router();
const { Sessions } = require("../models");


//Route to get all session
router.get("/", async (req, res)=>{
    var rows = [];
    const listOfSession = await Sessions.findAll();
    rows = listOfSession.map(session=>({
        "id" : session.id,
        "codeSession" : session.codeSession,
        "nomSession" : session.nomSession,
        "niveauSession" : session.niveauSession,
        "sessionEncours" : session.sessionEncours
    }))
    res.json(rows);
});
router.get("/encours", async (req, res)=>{

    const sessionEncours = await Sessions.findOne({where : {sessionEncours : 1}});
    
    res.json(sessionEncours);
});

//Route to add a new session
router.post("/", async (req, res)=>{
    const body = req.body;
    await Sessions.create(body);
    res.json(body);
});

module.exports = router;