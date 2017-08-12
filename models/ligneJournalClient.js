"use strict";

module.exports = function(sequelize, DataTypes) {
  var LJ = sequelize.define("LigneJournalClient", {
    
    libelle : DataTypes.STRING, 
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date : DataTypes.DATE

    
    
  
  }, {
    classMethods: {
      associate: function(models) {

       		LJ.belongsTo(models.Exercice);
          LJ.belongsTo(models.Client);
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
          sequelize.models.LigneJournalClient.findAll({where: {id : { $lt: model.id },ClientId : model.ClientId},
            attributes:[[sequelize.fn('MAX', sequelize.col('id')), 'greatestId']]
          }).then(function(t){
            //console.log(t);
            
            var greatestId = t[0].dataValues.greatestId;
            console.log("greatest id " + greatestId);
            sequelize.models.LigneJournalClient.findById(greatestId).then(function(lj){
                var bal = 0;
                if(lj)
                {
                  bal =lj.balance; 
                }
                var balance = bal + (model.credit - model.debit);
                sequelize.models.LigneJournalClient.update({balance:balance},{where:{id:model.id}}).then(function(){
                  console.log('updateed');
                });
            });           
          });      
        //sequelize.models.LigneJournalClient.findAll({ where: {ClientId : model.ClientId}})

    }
    else
    {
        var balance = model.credit - model.debit;
        sequelize.models.LigneJournalClient.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
        });   
    }

    return cb(null,options);

   });


  return LJ;
};