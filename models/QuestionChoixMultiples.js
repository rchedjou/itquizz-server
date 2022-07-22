
module.exports = (sequelize, DataTypes)=>{
    const QuestionChoixMultiples = sequelize.define("QuestionChoixMultiples", {
        question : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        choix1 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choix2 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choix2 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choix3 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choix4 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        reponse : {
            type : DataTypes.STRING,
            allowNull : false
        },
        versetBiblique : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        niveauQuestion : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    })


    return QuestionChoixMultiples;
        
}