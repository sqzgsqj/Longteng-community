/**
 * Created by hama on 2017/9/18.
 */
//引入动态的CSS设置
const mapping = require('../static');
//个人设置的处理函数
exports.setting = (req,res,next)=>{
    res.render('setting',{
        title:'用户设置页面',
        layout:'indexTemplate',
        resource:mapping.userSetting
    })
}
//更新头像的处理函数
exports.updateImage = (req,res,next)=>{

}
//更新个人资料的处理函数
exports.updateUser = (req,res,next)=>{

}
//用户排名
exports.all = (req,res,next)=>{

}
//个人信息
exports.index = (req,res,next)=>{

}
//发布问题列表
exports.questions = (req,res,next)=>{

}
//回复问题列表
exports.replys = (req,res,next)=>{

}


