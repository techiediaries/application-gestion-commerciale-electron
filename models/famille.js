"use strict";

module.exports = function(sequelize, DataTypes) {
  var Famille = sequelize.define("Famille", {
    reference: {type: DataTypes.STRING, unique: true,primaryKey:true},
    //libelle: DataTypes.STRING,
    designation: {type:DataTypes.STRING,defaultValue:''},
    //guarantieEnMois: DataTypes.INTEGER,//0
    //unite:DataTypes.STRING,//0
    //qMin: DataTypes.INTEGER,//0
    //qMax: DataTypes.INTEGER,//0
    //taxe: DataTypes.FLOAT,//0
    //coefficient: DataTypes.INTEGER,//0
  }, {
    classMethods: {
      associate: function(models) {}
    }
  });

  return Famille;
};