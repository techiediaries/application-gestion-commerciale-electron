"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var PO = sequelize.define("FactureAchat", {
    reference: {type: DataTypes.STRING, unique: true},
    notes: DataTypes.STRING,
    date: DataTypes.DATE,
    payee : DataTypes.BOOLEAN,
    signature:DataTypes.BOOLEAN,
    sommeHT: DataTypes.FLOAT,
    tva : DataTypes.FLOAT,
    somme:DataTypes.FLOAT,
    avance:{type:DataTypes.FLOAT,defaultValue:0},
    taxe: DataTypes.FLOAT,
    paiement:DataTypes.STRING,   
    chequeno : DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {

        PO.belongsTo(models.Fournisseur);
        PO.belongsTo(models.CommandeAchat);
        PO.hasMany(models.LigneCommande);
      
      }
    }
  });
//
  PO.afterCreate(function(model, options, cb) {
    

    /*var credit = model.somme;
    var debit = 0;
    var previousTotal = 0;
    var total  = previousTotal + (credit - debit);
    var libelle = model.reference;*/
    /*sequelize.models.LigneJournal.count({}).then(function(c){

      if(c === 0)
      {
        previousTotal = 0;
      }
      else
      {
        previousTotal = 0:
      }
    });*/
    /*sequelize.models.LigneJournalAchat.create({debit:debit,credit:credit,libelle:libelle}).then(function(e){
      console.log('creating entree journal ' + e);
    });

    if(model.FournisseurId)
    {
        sequelize.models.LigneJournalFournisseur.create({FournisseurId:model.FournisseurId,debit:debit,credit:credit,libelle:libelle}).then(function(e){
          console.log('creating entree journal ' + e);
        });      
    }*/
    return cb(null,options);

  });
  PO.afterDestroy(function(model, options, cb) {
    
      return cb(null,options);
  });  
  return PO;
};

