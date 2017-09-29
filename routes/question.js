/**
 * Created by hama on 2017/9/18.
 */
const setting = require('../setting');
const validator = require('validator');
//引入问题表
const Question = require('../model/Question');
//引入用户表
const User = require('../model/User');
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
    let title = validator.trim(req.body.title);
    let category = validator.trim(req.body.category);
    let content = validator.trim(req.body.content);
    let error;
    if(!validator.isLength(title,{min:8,max:20})){
        error = '标题长度不合法,请重新输入';
    }
    if(!validator.isLength(content,{min:10})){
        error = '问题内容长度不合法,请重新输入';
    }
    if(error){
        return res.end(error);
    }else{
        //验证成功后
        req.body.author = req.session.user._id;
        let newQuestion = new Question(req.body);
        console.log(newQuestion);
        newQuestion.save().then(question=>{
            //某个人发布一篇文章，积分+5,发布数量+1
            User.getUserById(req.session.user._id,(err,user)=>{
                if(err){
                    return res.end(err);
                }
                user.score += 1;
                user.article_count += 1;
                user.save();
                req.session.user = user;
                //返回的是一个添加问题的页面地址。
                res.json({url:`/question/${question._id}`})
            })
            //发送at消息
            /*at.sendMessageToMentionUsers(content,article._id,req.session.user._id);*/
        }).catch(err=>{
            return res.end(err);
        })
    }



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
    res.render('question',{
        title:'问题详情',
        layout:'indexTemplate'
    })
}
