"use strict";

module.exports = function(sequelize, DataTypes) {
  var LJ = sequelize.define("Caisse", {
    /*operation:DataTypes.STRING,
    type:DataTypes.STRING,
    description:DataTypes.STRING,
    montant:DataTypes.FLOAT*/

    libelle : DataTypes.STRING, 
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date : DataTypes.DATE

  }, {
    classMethods: {
      associate: function(models) {

          //LJ.belongsTo(models.Exercice);
          //LJ.belongsTo(models.Client);
          LJ.hasOne(models.Reglement);       
       
      }
    }
  });

   LJ.afterCreate(function(model, options, cb) {

    console.log('after create ' + model.id);
    var previous = model.id - 1;
    var total ;
    if(model.id > 1)
    {
        sequelize.models.Caisse.findById(model.id - 1 ).then(function(lj){
            var bal = 0;
            if(lj)
            {
              bal =lj.balance; 
            }
            var balance = bal + (model.credit - model.debit);
            sequelize.models.Caisse.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
            });
        });
    }
    else
    {
        var balance = model.credit - model.debit;
        sequelize.models.Caisse.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
        });   
    }

    return cb(null,options);

   });

  return LJ;
};