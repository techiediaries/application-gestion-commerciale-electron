"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var PO = sequelize.define("CommandeAchat", {
    reference: {type: DataTypes.STRING, unique: true},
    notes: DataTypes.STRING,
    date: DataTypes.DATE,
    etat: DataTypes.STRING,
    facturee : DataTypes.BOOLEAN,
    livree : DataTypes.BOOLEAN,
    payee : DataTypes.BOOLEAN,
    somme:DataTypes.FLOAT,
    paiement:DataTypes.STRING,
    chequeno : DataTypes.STRING,    
  }, {
    classMethods: {
      associate: function(models) {

        PO.belongsTo(models.Fournisseur);
        PO.hasMany(models.LigneCommande);
      }
    }
  });

  return PO;
};