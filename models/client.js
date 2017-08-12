"use strict";

module.exports = function(sequelize, DataTypes) {
  var C = sequelize.define("Client", {
    reference: {type: DataTypes.STRING, unique: true},    
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    fax: DataTypes.STRING,
    representant: DataTypes.STRING,
    solde:DataTypes.FLOAT
    //address:DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        /*Contact.hasMany(models.Phone);
        Contact.hasMany(models.Email);
        Contact.hasMany(models.Url);
        Contact.belongsTo(models.Company,{allowNull: false});
        Contact.hasMany(models.Tag);*/
      }
    }
  });

  return C;
};