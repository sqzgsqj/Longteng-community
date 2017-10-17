/**
 * Created by hama on 2017/10/17.
 */
const validator = require('validator');
//引入Comment表
const Comment = require('../model/Comment');
//引入Reply表
const Reply = require('../model/Reply');
exports.add = (req,res,next)=>{
    //二级回复的添加
    //1.获取请求过来的数据
    let content = req.body.content;//二级回复内容
    let reply_id = req.body.reply_id;//对应一级回复
    let comment_target_id = req.body.comment_target_id; //回复的人
    let question_id = req.params.question_id;//问题的ID
    let author = req.session.user._id; //作者
    //内容长度不能为空
    if(content.length <= 0){
        res.json({message:'长度不能为空'});
    }else{
        //2.存入Comment表
        let newComment = new Comment();
        newComment.content = content;
        newComment.reply_id = reply_id;
        newComment.comment_target_id = comment_target_id;
        newComment.question_id = question_id;
        newComment.author = author;
        newComment.save().then(comment=>{
            let result = Comment.findOne({'_id':comment._id}).populate('reply_id').populate('comment_target_id').populate('question_id').populate('author');
            return result;
        }).then(comment=>{
            //3.一级回复有个字段comment_num + 1
            comment.reply_id.comment_num += 1
            comment.reply_id.save();
            return comment;
        }).then(comment=>{
            //4.如果在二级回复中@某个人，这个人上线的时候会接收到@消息

        }).catch(err=>{
            res.json({message:'出错了'});
        })
    }





}