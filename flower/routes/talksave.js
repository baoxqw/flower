var express = require('express');
var talklistdb = require('../model/db/talklistdb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //判断是否登录
    if(!req.session.username){
        //跳转到登录页面
        res.redirect("login");
    }else{
        //1、获取前端传来是数据(用户名，goodsid,评论内容，评论时间)
        console.log("添加评论是的req.session.username="+req.session.username);
        let username =  req.session.username ;
        let goodsId = req.query.goodsid;
        let talkContent = req.query.talkContent;
        let d = new Date();
        d = showDate(d,'-');
        console.log(d)
        function showDate(date,key){
            let year = date.getFullYear()
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let minute = ('0' + date.getMinutes()).slice(-2);
            let second = ('0' + date.getSeconds()).slice(-2);
            let str = year + key + month + key + day + ' ' + hour + ':' + minute + ':' + second;
            return str;
        }

        //1、连接数据库,保存数据
        talklistdb.add(
            {
                "goodsId":goodsId,
                "username":username,
                "talkcontent":talkContent,
                "talktime":d,
                "callcount":0
            }
            ,
            function(){
                //跳转到商品列表页面
                res.redirect("goodsDetail?goodsId="+goodsId);
            }
        );
    }
});

module.exports = router;