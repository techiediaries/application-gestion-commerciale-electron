"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var jr = sequelize.define("Exercice", {
    reference: {type: DataTypes.STRING},
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
        //jr.hasMany(models.LigneJournalClient);
        //jr.hasMany(models.LigneJournalFournisseur);

      }
    }
  });
//
  return jr;
};