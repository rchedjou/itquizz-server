
module.exports = (sequelize, DataTypes)=>{
    const Sessions = sequelize.define("Sessions", {
        codeSession : {
            type : DataTypes.STRING,
            allowNull : false
        },
        nomSession : {
            type : DataTypes.STRING,
            allowNull : false
        },
        niveauSession : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        sessionEncours : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    })


    return Sessions;
        
}