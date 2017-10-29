"use strict";

module.exports = function(sequelize, DataTypes) {
  var LJ = sequelize.define("LigneJournalVente", {
    
    libelle : DataTypes.STRING, 
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date : DataTypes.DATE

    
    
  
  }, {
    classMethods: {
      associate: function(models) {

       		LJ.belongsTo(models.Exercice);
          //LJ.hasOne(models.Reglement);
      
      }
    }
  });
   LJ.beforeCreate(function(model, options, cb) {

    console.log('before create ' + model.id);
    return cb(null,options);

   });

   LJ.afterCreate(function(model, options, cb) {

    console.log('after create ' + model.id);
    var previous = model.id - 1;
    var total ;
    if(model.id > 1)
    {
        sequelize.models.LigneJournalVente.findById(model.id - 1 ).then(function(lj){
            var bal = 0;
            if(lj)
            {
              bal =lj.balance; 
            }
            var balance = bal + (model.credit - model.debit);
            sequelize.models.LigneJournalVente.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
            });
        });
    }
    else
    {
        var balance = model.credit - model.debit;
        sequelize.models.LigneJournalVente.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
        });   
    }

    return cb(null,options);

   });


  return LJ;
};