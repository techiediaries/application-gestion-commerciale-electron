"use strict";

module.exports = function(sequelize, DataTypes) {
  var dv = sequelize.define("Devis", {
    reference: {type: DataTypes.STRING},
    signature: DataTypes.BOOLEAN,
    date :  DataTypes.DATE,
    sommeHT: DataTypes.FLOAT,
    tva : DataTypes.FLOAT,
    somme:DataTypes.FLOAT,
    taxe: DataTypes.FLOAT,
    avance:{type:DataTypes.FLOAT,defaultValue:0},
    acceptee: DataTypes.BOOLEAN,
    paiement:DataTypes.STRING,
    chequeno : DataTypes.STRING,    
    notes:DataTypes.STRING
    
  }, {
    classMethods: {
      associate: function(models) {
    		dv.hasMany(models.LigneVente);
    		dv.belongsTo(models.Client);
        dv.belongsTo(models.CommandeVente);
             
      }
    }
  });

  return dv;
};