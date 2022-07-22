const express = require("express");
const router = express.Router();
const { QuestionChoixMultiples } = require("../models");


//Route to all qcm
router.get("/", async (req, res)=>{
    var rows = [];
    const listOfQcm = await QuestionChoixMultiples.findAll();
    rows = listOfQcm.map(quiz=>({
        "id" : quiz.id,
        "question" : quiz.question,
        "choix1" : quiz.choix1,
        "choix2" : quiz.choix2,
        "choix3" : quiz.choix3,
        "choix4" : quiz.choix4,
        "reponse" : quiz.reponse,
        "niveauQuestion" : quiz.niveauQuestion,
        "versetBiblique" : quiz.versetBiblique
    }))
    res.json(rows);
});

//Route to add a new qcm
router.post("/", async (req, res)=>{
    const body = req.body;
    await QuestionChoixMultiples.create(body);
    res.json(body);
});

module.exports = router;