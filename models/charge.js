"use strict";

module.exports = function(sequelize, DataTypes) {
  var C = sequelize.define("Charge", {
    type:DataTypes.STRING,//impot,assurance,cnss,salaire,banque,repation meca,degat,sortie de caisse,pneau,divers,etc..
  	montant:DataTypes.FLOAT,//float
    description:DataTypes.STRING,//float
    paiement :DataTypes.STRING,
    chequeno : DataTypes.STRING,
    date : DataTypes.DATE

  }, {
    classMethods: {
      associate: function(models) {
        C.belongsTo(models.CategorieCharge)
      }
    }
  });
  
  C.afterCreate(function(model, options, cb) {
    
      
    var debit = model.montant;
    var credit = 0;
    var previousTotal = 0;
    var total  = previousTotal + (credit - debit);
    var date = model.date;

    var libelle = "Charge ,"+  model.description ;
    /*if(model.paiement === "espéces")
    {*/
            sequelize.models.Caisse.create({debit:debit,credit:credit,date:date,libelle:libelle}).then(function(e){
                console.log('creating entree journal ' + e);
            });
    /*}*/
    return cb(null,options);
  });


  return C;
};