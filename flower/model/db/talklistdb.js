/**
 * Created by Administrator on 2017/11/10.
 */

//只做数据库的操作，不做前端的响应。
//针对users表的增删改查
var mongoose = require("mongoose");
var dbconn = require("./config/dbconn");

//1、模板（建立和表结构一样的一个类（模板））
let talkSchema = new mongoose.Schema({
    "goodsId":String,
    "username":String,
    "talkcontent":String,
    "talktime":String,
    "callcount":Number
});

//2、模型(把模板和数据库中的集合（表）建立对应关系)
let talkModel = dbconn.model("talklists",talkSchema);

//针对talklists表的增删改查;
module.exports = {
    //添加
    "add":function(paramObj,func){
        console.log("添加数据");
        //添加
        let talkEntity = new talkModel(paramObj);
        talkEntity.save(function(err,data){
            if(!err){
                console.log("注册成功！");
                func();
            }
        });
    },
    //根据商品编号获取评论列表
    findbygoodsid:function(goodsId,callback){
        talkModel.find({"goodsId":goodsId},function(err,data){
            if(err){
                console.log("查询评论列表出错："+err);
            }else{
                callback(data);
            }
        }).sort({'talktime':-1});
    },
    //根据商品编号和页码获取评论列表
    //goodsid:商品编号
    //pageIndex：页码   3
    //pageCount:每页的条数  10
    findbygoodsidandpageindex:function(goodsId,pageIndex,pageCount,callback){
        talkModel.find({"goodsId":goodsId},function(err,data){
            if(err){
                console.log("查询评论列表出错："+err);
            }else{
                callback(data);
            }
        }).sort({'talktime':-1}).skip(pageCount*(pageIndex-1)).limit(pageCount);
    },
    //获得某个商品的评论记录数
    findbygoodsicount:function(goodsId,callback){
        talkModel.find({"goodsId":goodsId},function(err,data){
            if(err){
                console.log("查询评论列表出错："+err);
            }else{
                callback(data.length);
            }
        })
    }
};
