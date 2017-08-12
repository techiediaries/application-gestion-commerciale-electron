"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var PO = sequelize.define("LivraisonVente", {
    reference: {type: DataTypes.STRING},
    signature: DataTypes.BOOLEAN,
    date :  DataTypes.DATE,
    sommeHT: DataTypes.FLOAT,
    tva : DataTypes.FLOAT,
    somme:DataTypes.FLOAT,
    taxe: DataTypes.FLOAT,
    avance:{type:DataTypes.FLOAT,defaultValue:0},
    acceptee: DataTypes.BOOLEAN,
    payee: DataTypes.BOOLEAN,
    datePayee :  DataTypes.DATE,
    paiement:DataTypes.STRING,
    chequeno : DataTypes.STRING,    
    notes:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

        PO.belongsTo(models.Client);
        PO.belongsTo(models.Reglement);
        //PO.hasOne(models.CommandeVente);
        
        PO.hasMany(models.LigneVente);

      }
    }
  });
//

  PO.afterCreate(function(model, options, cb) {
    

    var debit = model.somme;
    var credit = 0;
    var previousTotal = 0;
    var date = model.date;
    var total  = previousTotal + (debit - credit);
    var libelle =  "<a ui-sref=\"smgmt.delivery({id:'"+ model.id+"'})\">"  + "Bon de livraison envoyé " + model.reference +"</a>";
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

    sequelize.models.LigneJournalVente.create({debit:debit,credit:credit,libelle:libelle,date:date}).then(function(e){
      console.log('creating entree journal ' + e);
    });

    if(model.ClientId)
    {
        sequelize.models.LigneJournalClient.create({ClientId:model.ClientId,debit:debit,credit:credit,libelle:libelle,date:date}).then(function(e){
          console.log('creating entree journal ' + e);
        });      
    }
    
    return cb(null,options);

  });
  
  PO.afterDestroy(function(model, options, cb) {
    
      return cb(null,options);
  });

  return PO;
};