/**
 * Created by hama on 2017/9/18.
 */
//引入动态的CSS设置
const mapping = require('../static');
const formidable = require('formidable');
const moment = require('moment');
const fs = require('fs');
const gm = require('gm');
//引入User
const User = require('../model/User');
const validator = require('validator');
const Question = require('../model/Question');
const Reply = require('../model/Reply')
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
    let smallImgPath = "public/upload/smallimgs/";
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
            var input = updatePath + newFileName;
            var out = smallImgPath + newFileName;
            gm(input).resize(100,100,'!').autoOrient().write(out, function (err) {
                if(err){
                    console.log(err);
                }else{
                    console.log('done');
                    //压缩后再返回，否则的话，压缩会放在后边，导致链接失效
                    return res.json({
                        error:'',
                        initialPreview:['<img src="' + '/upload/smallimgs/' + newFileName + '">'],
                        url:out
                    })
                }
            });
        })
    })
    form.parse(req);
}
//更新个人资料的处理函数
exports.updateUser = (req,res,next)=>{
    let id = req.params.id;
    let motto = req.body.motto;
    let avatar = req.body.avatar;
    let error;
    if(!validator.isLength('motto',0)){
        error = '个性签名不能为空';
    }
    if(!validator.isLength('avatar',0)){
        error = '头像的地址不能为空';
    }
    if(error){
        res.end(error);
    }else{
        //查询数据库对应用户信息
        User.getUserById(id,(err,user)=>{
            if(err){
                return res.end(err);
            }
            if(!user){
                return res.end('用户不存在');
            }
            user.update_time = new Date();
            user.motto = motto;
            user.avatar = avatar;
            user.save().then((user)=>{
                req.session.user = user;
                return res.end('success');
            }).catch((err)=>{
                return res.end(err);
            })
        })
    }
}
//用户排名
exports.all = (req,res,next)=>{

}
//个人信息
exports.index = (req,res,next)=>{

    let username = req.params.name;
    // console.log(username);
    //1.通过username查询出user的信息
    //2.通过username查询出question问题表的信息
    //3.通过username查询出回复表的信息
    //第一步
    User.getUserByName(username,(err,user)=>{
        // console.log(user);
        if(err){
            res.end(err);
        }
        //第二步
        Question.getQuestionById(user._id,(err,articles)=>{
            if(err){
                res.end(err);
            }
            Reply.getRepliesByAuthor(user._id,(err,replies)=>{
                if(err){
                    res.end(err);
                }
                let  attention = false;
                let  sessionusername = req.session.user.name;
                if(user.eachother.follow_id.indexOf(sessionusername) == -1){
                      attention = true;
                }

                return res.render('user-center',{
                    title:'个人中心--社区问答系统',
                    layout:'indexTemplate',
                    resource:mapping.userCenter,
                    user:user,
                    articles:articles,
                    replies:replies,
                    attention:attention
                })
            })
        })
    })
}
//发布问题列表
exports.questions = (req,res,next)=>{

}
//回复问题列表
exports.replys = (req,res,next)=>{

}

//人与人之间的关注
exports.userAttention = (req,res,next)=>{
    let number = req.query.number;
    let username = req.query.user_id;
    // console.log(username);
    // console.log(number);
    User.getUserByNameEacheother(username,(err,user)=>{
        if(err){
            res.end(err);
        }
        // console.log(user);
        // console.log(user.eachother);
        // console.log(user);
        if(req.session.user.name == username){
            res.end('自己不能关注自己或取消关注')
        }else {
            user.eachother.follow_id.push(req.session.user.name);
            user.eachother.save();
            // console.log(user.eachother.follow_id);
            let  sessionusername = req.session.user.name;
            User.getUserByNameEacheother(sessionusername,(err,sessionuser)=>{
                    sessionuser.eachother.following_id.push(user.name);
                    sessionuser.eachother.save().then(result=>{
                        // console.log(result.following_id)
                        res.json({num:user.eachother.follow_id.length});
                    })
            })
        }
    })
}
exports.userRemoveAttention = (req,res,next)=>{
    let number = req.query.number;
    let username = req.query.user_id;
    // console.log(username);
    // console.log(number);
    User.getUserByNameEacheother(username,(err,user)=>{
        if(err){
            res.end(err);
        }
        // console.log(user);
        // console.log(user.eachother);
        // console.log(user);
        if(req.session.user.name == username){
            res.end('自己不能关注自己或取消关注')
        }else {
            user.eachother.follow_id.pop(req.session.user.name);
            user.eachother.save();
            // console.log(user.eachother.follow_id);
            let  sessionusername = req.session.user.name;
            User.getUserByNameEacheother(sessionusername,(err,sessionuser)=>{
                Array.prototype.removeByValue = function(val) {
                    for(var i=0; i<this.length; i++) {
                        if(this[i] == val) {
                            this.splice(i, 1);
                            break;
                        }
                    }
                }
                sessionuser.eachother.following_id.removeByValue(user.name);
                sessionuser.eachother.save().then(result=>{
                    res.json({num:user.eachother.follow_id.length});
                })
            })
        }
    })
}


