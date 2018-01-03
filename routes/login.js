/**
 * Created by Administrator on 2017/11/14.
 */
var express = require('express');
var userdb = require("../model/db/userdb");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("login",{show:"none",errMsg:""});
});

router.post('/', function(req, res, next) {
    //1、接收用户的数据
    let username = req.body.username;
    let userpass = req.body.userpass;
    //2、连接数据库，先判断用户名是否存在。不存在提示用户名或密码出错，存在就跳转到首页
    userdb.find({"username":username,"userpass":userpass},function(data){
        if(data.length>0){
            //1、记录session（后端记录session）。(前端：记录cookie）
            req.session.username = username;
            let d = new Date();
            d.setDate(d.getDate()+7);
            console.log(d);
            res.cookie("username",username,{expires:d});
            res.cookie("userpass",userpass,{expires:d});
            //2、跳转到首页
            console.log("登录成功-------------")
           res.redirect("index");
        }else{
            console.log("用户名或者密码错误-----------")
            res.render("login",{show:"block",errMsg:"用户名或者密码错误！"});
        }
    });
});

module.exports = router;
