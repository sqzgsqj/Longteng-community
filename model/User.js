/**
 * Created by hama on 2017/9/18.
 */
//用户信息表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //定义字段
    name:String
})
const User = mongoose.model('User',UserSchema);
module.exports = User
