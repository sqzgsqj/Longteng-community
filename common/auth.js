/**
 * Created by hama on 2017/9/26.
 */
const setting = require('../setting');
const User = require('../model/User');
const auth = {
    gen_session:(user,res)=>{
        let auth_user = `${user._id}$$$$`;
        res.cookie(setting.auth_name,auth_user,{
            path:'/',
            signed:true,//对cookie密码进行加密的话，需要使用到cookieParser
            httpOnly:true,
            maxAge:30*24*60*60*1000
        })
    }
}
module.exports = auth