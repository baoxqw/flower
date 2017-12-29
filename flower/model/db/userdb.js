/**
 * Created by Administrator on 2017/11/10.
 */

//只做数据库的操作，不做前端的响应。
//针对users表的增删改查
var mongoose = require("mongoose");
var dbconn = require("./config/dbconn");

//1、模板（建立和表结构一样的一个类（模板））
let userSchema = new mongoose.Schema({
    "username":String,
    "userpass":String
});
//2、模型(把模板和数据库中的集合（表）建立对应关系)
let userModel = dbconn.model("users",userSchema);

//针对user表的增删改查;
module.exports = {
    //添加
    "add":function(paramObj,func){
        console.log("添加数据");
        //添加
        let userEntity = new userModel({
            "username":paramObj.username,
            "userpass":paramObj.userpass
        });
        userEntity.save(function(err,data){
            if(!err){
                console.log("注册成功！");
                func();
            }
        });
    },
    //查询
    "find":function(paramObj,func){
        userModel.find(paramObj,function(err,data){
            if(!err){
                func(data);
            }
        });
    }
};
