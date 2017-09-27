/**
 * Created by hama on 2017/9/18.
 */
//引入动态的CSS设置
const mapping = require('../static');
const formidable = require('formidable');
const moment = require('moment');
const fs = require('fs');
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
    //初始化
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload/images/';
    let updatePath = 'public/upload/images/';
    let files = [];
    let fields = [];
    form.on('field',function(field,value){
        fields.push([field,value]);
    }).on('file',function(field,file){
        //文件的name值
        //console.log(field);
        //文件的具体信息
        //console.log(file);
        files.push([field,file]);
        let type = file.name.split('.')[1];
        let date = new Date();
        let ms = moment(date).format('YYYYMMDDHHmmss').toString();
        let newFileName = 'img' + ms + '.' + type;
        fs.rename(file.path,updatePath + newFileName,function(err){
            return res.json({
                error:'',
                initialPreview:['<img src="' + '/upload/images/' + newFileName + '">']
            })
        })
    })
    form.parse(req);
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


