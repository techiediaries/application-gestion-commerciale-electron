"use strict";

module.exports = function(sequelize, DataTypes) {
  var SO = sequelize.define("CommandeVente", {

    reference: {type: DataTypes.STRING},
    referenceExt:DataTypes.STRING,
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
    notes:DataTypes.STRING,
    livree: DataTypes.BOOLEAN,
    facturee: DataTypes.BOOLEAN,
    dateLivree: DataTypes.DATE,
    dateFacturee : DataTypes.DATE,
   
  }, {
    classMethods: {
      associate: function(models) {

      	//SO.belongsTo(models.Devis);
        SO.belongsTo(models.Client);
        SO.belongsTo(models.Facture);
        SO.belongsTo(models.LivraisonVente);
         
        SO.hasMany(models.LigneVente);
       
      }
    }
  });

  return SO;
};