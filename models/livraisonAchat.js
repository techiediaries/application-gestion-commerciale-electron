"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var PO = sequelize.define("LivraisonAchat", {
    reference: {type: DataTypes.STRING, unique: true},
    notes: DataTypes.STRING,
    date: DataTypes.DATE,
    signature: DataTypes.BOOLEAN,
    sommeHT: DataTypes.FLOAT,
    tva : DataTypes.FLOAT,
    somme:DataTypes.FLOAT,
    taxe: DataTypes.FLOAT,
    avance:{type:DataTypes.FLOAT,defaultValue:0},
    payee: DataTypes.BOOLEAN,
    datePayee :  DataTypes.DATE,
    paiement:DataTypes.STRING,
    chequeno : DataTypes.STRING,    
  }, {
    classMethods: {
      associate: function(models) {

        PO.belongsTo(models.Fournisseur);
        PO.belongsTo(models.CommandeAchat);
        PO.hasMany(models.LigneLivraisonAchat);
        PO.belongsTo(models.LigneJournalAchat);
        PO.belongsTo(models.LigneJournalFournisseur);        
      }
    }
  });
//
PO.afterUpdate(function(model, options, cb) {
  var debit = model.somme;
  var credit = 0;
  var previousTotal = 0;
  var date = model.date;
  var total  = previousTotal + (debit - credit);
  var libelle = "<a style='color:white;' ui-sref=\"pmgmt.delivery({id:'"+ model.id+"'})\">" + "Bon Achat avec référence " + model.reference +"</a>";
  
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

  sequelize.models.LigneJournalAchat.create({debit:debit,date : date,credit:credit,libelle:libelle},{where:{id:LigneJournalAchatId}}).then(function(e){
    console.log('creating entree journal ' + e);
  });

  if(model.FournisseurId)
  {
      sequelize.models.LigneJournalFournisseur.create({FournisseurId:model.FournisseurId,debit:debit,credit:credit,libelle:libelle,date:date},{where:{id:LigneJournalFournisseurId}}).then(function(e){
        console.log('creating entree journal ' + e);
      });      
  }

  return cb(null,options);

});  
  PO.afterCreate(function(model, options, cb) {
    var debit = model.somme;
    var credit = 0;
    var previousTotal = 0;
    var date = model.date;
    var total  = previousTotal + (debit - credit);
    var libelle = "<a style='color:white;' ui-sref=\"pmgmt.delivery({id:'"+ model.id+"'})\">" + "Bon Achat avec référence " + model.reference +"</a>";
    
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

    sequelize.models.LigneJournalAchat.create({debit:debit,date : date,credit:credit,libelle:libelle}).then(function(e){
      console.log('creating entree journal ' + e);
    });

    if(model.FournisseurId)
    {
        sequelize.models.LigneJournalFournisseur.create({FournisseurId:model.FournisseurId,debit:debit,credit:credit,libelle:libelle,date:date}).then(function(e){
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