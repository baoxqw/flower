var express = require('express');
var goodslistdb = require('../model/db/goodslistdb');
var talklistdb=  require('../model/db/talklistdb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //1、获取前端传来是数据
    let goodsId;
    for(let key in req.query){
        goodsId = req.query[key];
    }
    console.log(goodsId)
    //console.log(req.query,goodsid);

    let pageIndex = req.query.pageIndex||1;

    //1、连接数据库,获取数据
    let pageCount = 6;//每页10条数据
    goodslistdb.findbygoodsid(goodsId,function(goodslist){//获取商品的详情
        talklistdb.findbygoodsidandpageindex(goodsId,pageIndex,pageCount,function(talklist){
            talklistdb.findbygoodsicount(goodsId,function(count){
                //计算总页码
                maxPageIndex = Math.ceil(count/pageCount);//
                //2、显示
                console.log("1111111"+goodslist[0]);
                res.render("goodsdetail",{
                    title:"商品详情",
                    maxPageIndex:maxPageIndex,
                    pageIndex:pageIndex,
                    goodsdetail:goodslist[0],
                    talklist:talklist,
                    goodsId:goodslist[0].goodsId
                }
                );
            });
        });
    });
});

module.exports = router;
