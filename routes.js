/**
 * Created by hama on 2017/9/18.
 */
//路由文件
const express = require('express');
const router = express.Router();
//引入首页的处理函数
const home = require('./routes/home');
//首页的路由
router.get('/',home.index);



module.exports = router;

