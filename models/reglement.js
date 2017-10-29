"use strict";
//et imprimer le bon de commande
module.exports = function(sequelize, DataTypes) {
  var PO = sequelize.define("Reglement", {
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
    type : DataTypes.STRING,//vente achat
    notes:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        PO.belongsTo(models.Client);
        PO.hasMany(models.Facture);

        PO.belongsTo(models.Fournisseur);
        PO.hasMany(models.FactureAchat);

        PO.hasMany(models.LivraisonVente);
        //PO.hasMany(models.LigneCommande);
        PO.hasOne(models.LigneJournalVente);
        PO.hasOne(models.LigneJournalClient);
        PO.hasOne(models.LigneJournalAchat);
        PO.hasOne(models.LigneJournalFournisseur);
        //PO.hasOne(models.Caisse);
        
        
      }
    }
  });
  PO.beforeCreate(function(model, options, cb) {

    return cb(null,options);
  });
  PO.afterCreate(function(model, options, cb) {
      

    var credit = model.somme;
    //var debit = model.avance;
    var debit = 0;
    var previousTotal = 0;
    var total  = previousTotal + (debit - credit);
    var date = model.date;
    /*var frref = model.FournisseurId ;
    var frname = model.Fournisseur.nom;*/
    var libelle = "<a ui-sref=\"smgmt.reglement({id:'"+ model.id+"'})\">" + "Réglement effectué avec référence " + model.reference + ' ['+ model.paiement +']' +"</a>";
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
    if(model.type === "achat")
    {
      var libelle = "<a style='color:white;' ui-sref=\"pmgmt.reglement({id:'"+ model.id+"'})\">" + "Réglement effectué avec référence " + model.reference + ' ['+ model.paiement +']' +"</a>";
      
        sequelize.models.LigneJournalAchat.create({debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
          console.log('creating entree journal ' + e);
        });
        /*
        if(model.paiement === "espéces")
        {*/
            sequelize.models.Caisse.create({debit:credit,credit:debit,date:date,libelle:libelle}).then(function(e){
                console.log('creating entree journal ' + e);
            });
        /*}*/

    }

    if(model.type === "vente")
    {
        var libelle = "<a ui-sref=\"smgmt.reglement({id:'"+ model.id+"'})\">" + "Réglement effectué avec référence " + model.reference + ' ['+ model.paiement +']' +"</a>";

        sequelize.models.LigneJournalVente.create({debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
          console.log('creating entree journal ' + e);
        });
        /*if(model.paiement === "espéces")
        {*/
          sequelize.models.Caisse.create({debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
            console.log('creating entree journal ' + e);
          });
       /* }*/

    }


    if(model.ClientId)
    {
      sequelize.models.LigneJournalClient.create({ClientId:model.ClientId,debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
        console.log('creating entree journal ' + e);
      });
    }
    if(model.FournisseurId)
    {
        sequelize.models.LigneJournalFournisseur.create({FournisseurId:model.FournisseurId,debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
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