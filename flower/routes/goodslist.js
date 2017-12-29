var express = require('express');
var goodslistdb = require("../model/db/goodslistdb");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //1、连接数据库
    goodslistdb.findall(function(data){
        //2、显示数据到模板
        /*
        data = [{  goodsname:"火龙果",goodsid:"01009","goodstype" : "fruit", "goodsprice" : 5  },
        {  goodsname:"火龙果",goodsid:"01009","goodstype" : "fruit", "goodsprice" : 5  }];*/

        data[0].title="商品列表";
        console.log("所有数据"+data);
        // console.log(data[1].goodsPrice);
        res.render('goodslist',{
            title:"商品列表",
            data:data
        });
    });
});

module.exports = router;
