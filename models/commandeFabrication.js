"use strict";

module.exports = function(sequelize, DataTypes) {
  var MO = sequelize.define("CommandeFabrication", {
    reference: {type: DataTypes.STRING, unique: true},
    notes: DataTypes.STRING,
    date: DataTypes.DATE,
    quantite: DataTypes.INTEGER,
    etat: DataTypes.STRING

    
    
  }, {
    classMethods: {
      associate: function(models) {
        MO.belongsTo(models.Article);
        MO.hasMany(models.LigneFabrication);       
      }
    }
  });

  return MO;
};