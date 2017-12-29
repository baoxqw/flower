var express = require('express');
var goodslistdb = require("../model/db/goodslistdb");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var goodsId = req.query.goodsId;
    console.log(typeof goodsId);
    console.log(goodsId)
    //1、连接数据库
    goodslistdb.findbygoodsid(goodsId,function(data){
        //2、显示数据到模板              
        console.log("-----------------"+data)
        res.render('goodsdetail',data[0]);
    });
});

module.exports = router;
