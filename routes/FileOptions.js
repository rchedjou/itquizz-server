const express = require("express");
const router = express.Router();
const fs = require("fs");

var data = "JEUX";

router.get("/", (req, res)=>{

});

router.post("/", (req, res)=>{
    var result;
    var error;
    fs.writeFile('../InfoJeux.txt', data, {flag : w+ }, (err)=>{
        if(err){
            console.log(err)
            error = err;
        }
        result="SUCCES";
        
    });
    res.json({result, error});
});