"use strict";
//et imprimer le bon de commande
module.exports = function (sequelize, DataTypes) {
  var PO = sequelize.define("LivraisonVente", {
    reference: { type: DataTypes.STRING },
    signature: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    sommeHT: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    somme: DataTypes.FLOAT,
    taxe: DataTypes.FLOAT,
    avance: { type: DataTypes.FLOAT, defaultValue: 0 },
    acceptee: DataTypes.BOOLEAN,
    payee: DataTypes.BOOLEAN,
    datePayee: DataTypes.DATE,
    paiement: DataTypes.STRING,
    chequeno: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {

          PO.belongsTo(models.Client);
          PO.belongsTo(models.Reglement);
          //PO.hasOne(models.CommandeVente);

          PO.hasMany(models.LigneVente);
          PO.belongsTo(models.LigneJournalVente);
          PO.belongsTo(models.LigneJournalClient);

        }
      }
    });
  //
  PO.afterUpdate(function (model, options, cb) {
    console.log("after update");
    var debit = model.somme;
    var credit = 0;
    var previousTotal = 0;
    var date = model.date;
    var total = previousTotal + (debit - credit);
    var libelle = "<a ui-sref=\"smgmt.delivery({id:'" + model.id + "'})\">" + "Bon de livraison envoyé " + model.reference + "</a>";
    console.log("updating LigneJournalVente with id : " + model.LigneJournalVenteId);
    console.log("new somme" + debit);
    sequelize.models.LigneJournalVente.update({ debit: debit, credit: credit, libelle: libelle, date: date }, { where: { id: model.LigneJournalVenteId }, individualHooks: true }).then(function (e) {
      console.log('updated entree journal ' + e);
    });

    if (model.ClientId) {
      sequelize.models.LigneJournalClient.update({ ClientId: model.ClientId, debit: debit, credit: credit, libelle: libelle, date: date }, { where: { id: model.LigneJournalClientId }, individualHooks: true }).then(function (e) {
        console.log('updated entree journal ' + e);
        
      });
    }

    return cb(null, options);

  });
  PO.beforeCreate(function (model, options, cb) {



    return cb(null, options);

  });
  PO.afterCreate(function (model, options, cb) {


    var debit = model.somme;
    var credit = 0;
    var previousTotal = 0;
    var date = model.date;
    var total = previousTotal + (debit - credit);
    var libelle = "<a ui-sref=\"smgmt.delivery({id:'" + model.id + "'})\">" + "Bon de livraison envoyé " + model.reference + "</a>";

    sequelize.models.LigneJournalVente.create({ debit: debit, credit: credit, libelle: libelle, date: date }).then(function (e) {
      console.log('creating entree journal ' + e);
      model.LigneJournalVenteId = e.id;
      if (model.ClientId) {
        sequelize.models.LigneJournalClient.create({ ClientId: model.ClientId, debit: debit, credit: credit, libelle: libelle, date: date }).then(function (ee) {
          console.log('creating entree journal ' + ee);
          model.LigneJournalClientId = ee.id;
          sequelize.models.LivraisonVente.update({LigneJournalVenteId:e.id,LigneJournalClientId:ee.id},{where:{id:model.id}});

        });
      }

    });



    return cb(null, options);

  });

  PO.afterDestroy(function (model, options, cb) {

    console.log("afteeeeeeeeeeer destory");
    sequelize.models.LigneVente.findAll({where:{LivraisonVenteId:model.id}}).then(function(lignes){
      console.log("lignes : " + lignes);
      for(var i = 0 ; i < lignes.length ; i++)
      {
        sequelize.models.LigneVente.destroy({where: {id : lignes[i].id},individualHooks: true});
      }
    });

    return cb(null, options);
  });

  return PO;
};