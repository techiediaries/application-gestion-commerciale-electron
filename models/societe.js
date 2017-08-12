"use strict";
// prix * coefficient >= 

module.exports = function(sequelize, DataTypes) {
  var S = sequelize.define("Societe", {
    reference: DataTypes.STRING,
    raisonSociale: DataTypes.STRING,
    description: DataTypes.STRING,
    monnaie: DataTypes.STRING,
    addresse: DataTypes.STRING,
    codePostal: DataTypes.STRING,
    //tel:DataTypes.STRING,
    ville: DataTypes.STRING,
    pays: DataTypes.STRING,
    capital: DataTypes.FLOAT,
    siret: DataTypes.STRING,
    taxe : DataTypes.FLOAT,
    logo: DataTypes.TEXT,
    rc: DataTypes.STRING,
    patente : DataTypes.STRING,
    codeBanque:DataTypes.STRING,
    identiteFiscale : DataTypes.STRING,
    cnss : DataTypes.STRING,
    ice : DataTypes.STRING,
    tel1 : DataTypes.STRING,
    tel2 : DataTypes.STRING,
    tel3 : DataTypes.STRING,
    email1 : DataTypes.STRING,
    email2 : DataTypes.STRING,
    footer : DataTypes.TEXT
    



  }, {
    classMethods: {

      associate: function(models) {

          
      }
    },
    instanceMethods:{
            
    }
  });

  return S;
};