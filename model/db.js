/**
 * Created by hama on 2017/9/18.
 */
//数据库连接操作
var mongoose = require('mongoose');
//引入数据库配置参数文件
var setting = require('../setting');
//调用模块下面的connect方法去连接数据库
mongoose.connect(`mongod://${setting.host}/${setting.db}`);//应用了一下模块字符串
