var gamers = [];

const addGamer = ({id, teamName, sessionGame, isReady=false, score=0})=>{
    teamName = teamName.trim().toLowerCase();
    sessionGame = sessionGame.trim().toLowerCase();

    const existingGamer = gamers.find((gamer)=> gamer.sessionGame===sessionGame && gamer.teamName===teamName);
    if(existingGamer){
        return {error : `${teamName} is taken!`};
    }

    const gamer = {id, teamName, sessionGame,isReady}
    gamers.push(gamer);
    return {gamer}
}


const updateGamer =(newgamer)=>{
    return gamers.map(g =>{
        if(g.id===newgamer.id){
            return {...g,...newgamer}
        }
        return g;
    });
}

const removeGamer = (id)=>{
    const index = gamers.findIndex((gamer)=>gamer.id===id);

    if(index !==-1) {
        return gamers.splice(index,1)[0];
    }
}

const getGamer = (id)=>gamers.find((gamer)=>gamer.id===id);

const getgamersInRoom =(sessionGame)=>gamers.filter((gamer)=>gamer.sessionGame===sessionGame);

module.exports = {addGamer, removeGamer, getGamer, getgamersInRoom, updateGamer};