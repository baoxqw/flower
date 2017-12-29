/**
 * Created by Administrator on 2017/11/10.
 */


//针对goodslists表的增删改查
var mongoose = require("mongoose");
var dbconn = require("./config/dbconn");

//1、模板（建立和表结构一样的一个类（模板））
let goodslistSchema = new mongoose.Schema({
    "goodsId":Number,
    "goodsName":String,
    "goodsImg":String,
    "goodsPrice":String
});
//2、模型(把模板和数据库中的集合（表）建立对应关系)
let goodslistModel = dbconn.model("goodslists",goodslistSchema);
console.log("--------------------");
//针对goodslist表的增删改查;
module.exports = {
    //添加
    "add":function(paramObj,func){
        //添加
        let goodslistEntity = new goodslistModel({
            "goodsId":paramObj.goodsId,
            "goodsName":paramObj.goodsName,
            "goodsImg":paramObj.goodsImg,
            "goodsPrice":paramObj.goodsPrice
        });
        goodslistEntity.save(function(err,data){
            if(!err){
                console.log("添加成功！");
                func();
            }
        });
    },
    //得到一个商品
    "findbygoodsid":function(goodsId,func){
        goodslistModel.find({"goodsId":Number(goodsId)},function(err,data){
            console.log("data="+data);
            if(err){
               
                console.log("根据商品id查询商品出错："+err);
            }else{
                func(data);
            }
        });
    },

    //得到所有商品
    "findall":function(func){
        goodslistModel.find({},function(err,data){
            if(err){
               
                console.log("查询所有商品出错："+err);
            }else{
                func(data);
            }
        });
    }

};
