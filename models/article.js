"use strict";
// prix * coefficient >= 

module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    reference: {type: DataTypes.STRING, unique: true},
    //libelle: DataTypes.STRING,//0
    designation: {type:DataTypes.STRING,defaultValue:''},
    //codeBarre: DataTypes.STRING,//0
    //guarantieEnMois: DataTypes.INTEGER,//0
    qReel: {type:DataTypes.FLOAT,default:0},//0
    qTheorique: {type:DataTypes.FLOAT,default:0},
    qPerime:{type:DataTypes.FLOAT,default:0},
    qMin: {type:DataTypes.FLOAT,defaultValue:0},
    //qMax: DataTypes.STRING,//0
    //autoStock: DataTypes.BOOLEAN,//0
    taxe:{type:DataTypes.FLOAT,defaultValue:0.2},//0
    //tva: DataTypes.FLOAT,//
    //coefficient: DataTypes.FLOAT,//0
    prixAchat:  {type:DataTypes.FLOAT,defaultValue:0.0},//ajouter prixAchatHT = achat - tva 
    prixUnitaire: {type:DataTypes.FLOAT,defaultValue:0.0},//0
    unite:{type:   DataTypes.ENUM,values: ['unité','m','m2','m3','l','g','kg','ton']}//poids(kg),longueur(m),litre,unite(nombre)
  }, {
    classMethods: {

      associate: function(models) {
          
          Article.belongsTo(models.Famille);
          
      },
      fromMovement:function(m){
          Article.findById(m.ArticleId).then(function(a){
            var obj = {
              qReel : a.qReel + parseInt(m.quantite),
              qTheorique: a.qTheorique + parseInt(m.quantite),
              qPerime : parseInt(m.qPerime) || a.qPerime  ,
              prixAchat: parseFloat(m.prixAchat) || 0,
              prixUnitaire : parseFloat(m.prixUnitaire) || 0
            }
            return Article.update(obj,{where:{id:m.ArticleId}});
          })          
      },
      addQuantity:function(id,q){
          Article.findById(id).then(function(a){
            var obj = {
              qReel : a.qReel + parseInt(q),
              qTheorique : a.qTheorique + parseInt(q),
               
            }
            return Article.update(obj,{where:{id:id}});
          })
      },
      removeQuantity:function(id,q,p){

          Article.findById(id).then(function(a){
            p = p || 0;
            var obj = {
              qReel : a.qReel - parseInt(q),
              qTheorique : a.qTheorique  - parseInt(q),
              qPerime : a.qPerime + parseInt(p)
            }
            return Article.update(obj,{where:{id:id}});
          })
      },
      changeObsoluteQuantity:function(id,q){

      },
      setBuyingPrice:function(id,p){
          Article.findById(id).then(function(a){
            var obj = {
              prixAchat : parseFloat(p)
            }
            return Article.update(obj,{where:{id:id}});
          })
      },

      setQuantityAndBuyingPrice:function(id,q,p){
          Article.findById(id).then(function(a){
            var obj = {
              qReel: a.qReel + parseInt(q),
              prixAchat : parseFloat(p)
            }
            return Article.update(obj,{where:{id:id}});
          })
      },


    },
    instanceMethods: {
      method2: function() { return 'foo' }
    }    
    });
  
 

  return Article;
};