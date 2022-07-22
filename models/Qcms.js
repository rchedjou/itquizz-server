module.exports = (sequelize, DataTypes)=>{
    const Qcms = sequelize.define("qcms", {
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
            allowNull : true
        },
        niveauQuestion : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    });

    return Qcms;
}

