/**
 * Created by hama on 2017/9/18.
 */
const setting = require('../setting');
//新建问题的处理函数
exports.create = (req,res,next)=>{
    res.render('create-question',{
        title:'新建问题',
        layout:'indexTemplate',
        categorys:setting.categorys
    })
}
//新建行为的处理函数
exports.postCreate = (req,res,next)=>{

}
//编辑问题的处理函数
exports.edit = (req,res,next)=>{

}
//编辑行为的处理函数
exports.postEdit = (req,res,next)=>{

}
//删除行为的处理函数
exports.delete = (req,res,next)=>{

}
//查询问题的处理函数
exports.index = (req,res,next)=>{

}
