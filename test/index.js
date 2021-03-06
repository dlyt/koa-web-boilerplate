/**
 * Created by huangxiaogang on 17/1/10.
 * 测试入口
 * mocha issue reference
 * https://github.com/mochajs/mocha/issues/2407
 */
var config = global._appConfig = require('../config/index.js')(process.env['NODE_ENV'] || 'test');
var app = require('../bin/app');
var server = require('http').createServer(app.callback());


console.log(process.env['NODE_ENV'] );
// 错误日志处理
global.throw = function(msg, status) {
    var err = new Error(msg);
    err.status = status;
    throw err;
};
server.listen(3004);

app.on('error',function(err,ctx){
    console.error("server error",err,ctx);
});

//require('./common/CityList.js');
//require('./common/RoomList.js');
//require('./common/BuildingList.js');
//require('./common/EstateDetail.js');
//require('./static/resourceUtil');
//require('./house/Util');
//require('./common/UploadImage.js');
require('./house/HouseInfo.js');
//require('./house/HouseAction.js');
//require('./room/RoomAction');


