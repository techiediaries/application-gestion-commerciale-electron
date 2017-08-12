"use strict";

module.exports = function(sequelize, DataTypes) {
  var INV = sequelize.define("Facture", {
    reference: {type: DataTypes.STRING},
    payee : DataTypes.BOOLEAN,
    signature:DataTypes.BOOLEAN,
    date :  DataTypes.DATE,
    //datePayee :  DataTypes.DATE,
    sommeHT: DataTypes.FLOAT,
    tva : DataTypes.FLOAT,
    somme:DataTypes.FLOAT,
    avance:{type:DataTypes.FLOAT,defaultValue:0},
    taxe: DataTypes.FLOAT,
    acceptee: DataTypes.BOOLEAN,
    paiement:DataTypes.STRING,    
    chequeno : DataTypes.STRING,
    notes:DataTypes.STRING

  }, { 
    classMethods: {
      associate: function(models) {
       	//INV.belongsTo(models.CommandeVente);
        //INV.hasOne(models.CommandeVente);
        
        INV.belongsTo(models.Client);
        INV.hasMany(models.LigneVente);
      }
    }
  });

  /*INV.afterCreate(function(model, options, cb) {
    

    var debit = model.somme;
    var credit = 0;
    var previousTotal = 0;
    var total  = previousTotal + (debit - credit);
    var libelle = model.reference;
    sequelize.models.LigneJournal.count({}).then(function(c){

      if(c === 0)
      {
        previousTotal = 0;
      }
      else
      {
        previousTotal = 0:
      }
    });
    sequelize.models.LigneJournalVente.create({debit:debit,credit:credit,libelle:libelle}).then(function(e){
      console.log('creating entree journal ' + e);
    });
    if(model.ClientId)
    {
      sequelize.models.LigneJournalClient.create({ClientId:model.ClientId,debit:debit,credit:credit,libelle:libelle}).then(function(e){
        console.log('creating entree journal ' + e);
      });
    }

    return cb(null,options);

  });
  INV.afterDestroy(function(model, options, cb) {
    
      return cb(null,options);
  }); */ 

  return INV;
};