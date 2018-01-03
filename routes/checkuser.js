/**
 * Created by Administrator on 2017/11/14.
 */

var express = require('express');
var userdb = require("../model/db/userdb");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {   

    var username=req.query.username;
    console.log("==========="+username)
    res.send("1"); 
    /*
    //1、连接数据库，先判断用户名是否存在。
    userdb.find({"username":username},function(data){
        console.log(typeof data);
        console.log("之前转换"+data);
        data=JSON.stringify(data);
        data=data.split(",");
        console.log("之后转换"+data);
        console.log("之后长度"+data.length);
        if(data.length>0){
           return "1";
           console.log("发送给ajax1")
        }else{
            console.log("发送给ajax0")
            return "0";
        }
    });
    */
});

module.exports = router;
