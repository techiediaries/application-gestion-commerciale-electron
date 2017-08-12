"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var jr = sequelize.define("Account", {
    reference: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING,unique:true},
    libelle: {type: DataTypes.STRING},
    description: DataTypes.STRING,
    debutPeriod: DataTypes.DATE,
    finPeriod: DataTypes.DATE,
    anneeFiscale : DataTypes.INTEGER,
    balance : DataTypes.FLOAT

  }, {
    classMethods: {
      associate: function(models) {
      
        jr.belongsTo(models.Societe);
        //jr.hasMany(models.LigneJournal);
      }
    }
  });
//
  return jr;
};