"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var jr = sequelize.define("Banque", {
    reference: {type: DataTypes.STRING},
    nom: {type: DataTypes.STRING},
    swift: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    addresse: {type: DataTypes.STRING},
    fax: {type: DataTypes.STRING},
    representant: {type: DataTypes.STRING},
    
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