const express =  require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const socketio = require('socket.io');

app.use(express.json());
app.use(cors());

const {addGamer, removeGamer, getGamer, getgamersInRoom, updateGamer} = require('./gamers');

const server = http.createServer(app);
const io =socketio(server);


const PORT = process.env.PORT || 5000;


const db = require('./models');
const { QuestionChoixMultiples } = require("./models");
const { Sessions } = require("./models");

//MY SOCKET
io.on('connect', (socket)=>{
    GAMERlIST = {"Facile" : []};

    console.log('Socket connecter ok!');
    socket.on('join', ({teamName, sessionGame}, callback)=>{
        console.log({teamName, sessionGame});
        const {error, gamer} = addGamer({id:socket.id, teamName, sessionGame});
        if(error){
            return callback({error});
        }

        socket.emit('message', {teamName: gamer.teamName, text: `${gamer.teamName} Bien venue à cette nouvelle (${sessionGame}) partie de Quizz`});
        socket.broadcast.to(gamer.sessionGame).emit('message',{user: 'adminQuizz', text: `${gamer.teamName} nous a rejoint!` });
        socket.join(sessionGame);

        
        io.to(sessionGame).emit('sessionGammeData', {sessionGame: gamer.sessionGame, gamers: getgamersInRoom(gamer.sessionGame)});

        callback();
    });
    
    socket.on('updateIsReady', ({id, teamName, sessionGame}, callback)=>{
        console.log("dans le serveur");
        const isReady=true;
        //gam = getgamersInRoom(sessionGame);
        //const h =updateGamer({id,isReady:true});
        //console.log(h);
        const gamer = {id, teamName, sessionGame,isReady}
        io.to(sessionGame).emit('update', {gamer: gamer});
        callback();
    })

    socket.on('askQuestions',  ({sessionGame}, callback)=>{
        console.log("chargement des question!");
        const sessionEncour =  Sessions.findOne({where : {
            sessionEncours : 1
        }});
        let questionsBank=[];
        sessionEncour.then((reponse)=>{
            //console.log(reponse);
            const listeQuestionNiveau =  QuestionChoixMultiples.findAll({where : {
                niveauQuestion : reponse.niveauSession
            }});
            listeQuestionNiveau.then((questions)=>{
                console.log(questions);
                // console.log(questionsBank);
                const n = questions.length<10?questions.length:10
                const shuffled = questions.sort(()=>0.5 - Math.random());
                io.to(sessionGame).emit('questions', {questions: shuffled.slice(0, n)});
                var init = 0;
                const timer = setInterval(()=>{
                    io.to(sessionGame).emit('progress',{progress : init>=110?0:init+10});
                    init=init+10;
                    if(init===110){
                        clearInterval(timer);
                    }
                },1000);
                
            });
        });
        
        //const shuffled = listeQuestionNiveau.sort(() => 0.5 - Math.random());
        //let questions = shuffled.slice(0, 9);
        
    });

    socket.on('disconnect', () => {
        console.log("User had left!");
        const gamer = removeGamer(socket.id);
        if(gamer){
          io.to(gamer.sessionGame).emit('message',{user : "admin", text : `${gamer.teamName} has left!`});
          io.to(gamer.sessionGame).emit('sessionGammeData', {sessionGame: gamer.sessionGame, gamers: getgamersInRoom(gamer.sessionGame)});
        }
        
      });
});



//ROUTES
const QuestionChoixMultiplesRouter = require("./routes/QuestionChoixMultiples");
app.use("/qcm", QuestionChoixMultiplesRouter);
const SessionRouter = require("./routes/Session");
const { setInterval } = require("timers");
app.use("/session", SessionRouter);

db.sequelize.sync().then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Cette application tourne sur le port ${PORT}`);
    });
});
