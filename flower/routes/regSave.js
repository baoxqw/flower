/**
 * Created by Administrator on 2017/11/14.
 */

var express = require('express');
var userdb = require("../model/db/userdb");

var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    //1、接收用户的数据
    let username = req.body.username;
    let userpass = req.body.userpass;
    //console.log("username="+username);
    //console.log("userpass="+userpass);
    //2、连接数据库，先判断用户名是否存在。不存在就保存
    userdb.find({"username":username},function(data){
        if(data.length>0){
            res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
            res.write("<script>alert('用户名已经存在');location.href='reg.html'</script>");
            res.end();
        }else{
            userdb.add({
                "username":username,
                "userpass":userpass
            },function(){
                //3、跳转到“注册成功提示页面”
                res.redirect("login");
            });
        }
    });
});

module.exports = router;
