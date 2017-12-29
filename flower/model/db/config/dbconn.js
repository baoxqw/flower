/**
 * Created by Administrator on 2017/11/10.
 */
var mongoose = require("mongoose");
//创建数据库连接(locahost是数据库服务器的地址，test是数据库名)
var db = mongoose.createConnection("localhost","db1707");

db.on("error",function(){
    console.error.bind(console,"连接错误");
});
db.once("open",function(){
    console.log("完成了一次数据库的操作");
});

module.exports = db;
