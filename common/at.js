/**
 * Created by hama on 2017/9/30.
 */
const _ = require('lodash');
//引入User 表
const User = require('../model/User');
//引入message方法
const message = require('./message');
const at = {
    fetchUser:(text)=>{
        if(!text){
            return [];
        }
        let ignoreRegexs = [
            /```.+?```/g, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
        ]
        //循环过滤所有的正则规则，将过滤后的文章内容重新赋值给TEXT
        ignoreRegexs.forEach(function(ignore_regex){
            text = text.replace(ignore_regex,'');
        })
        let results = text.match(/@[a-z0-9\-_]+\b/igm);
        let names = [];
        if(results){
            for(let i=0,l=results.length;i<l;i++){
                let s = results[i];
                s = s.slice(1);
                names.push(s);
            }
        }
        names = _.uniq(names);
        return names
    },
    sendMessageToMentionUsers:(text,questionId,authorId,replyId,callback)=>{
        if(typeof replyId == 'function'){
            callback = replyId;
            replyId = null;
        }
        callback = callback || _.noop();
        User.getUserByNames(at.fetchUser(text),(err,users)=>{
            if(err || !users){
                return callback(err);
            }
            //不能@自己，也就是文章的作者
            users = users.filter(function(user){
                return user._id != authorId
            })
            //循环所有的目标用户，将消息存入消息表中
            //如果users为空，那么证明：你要@的人是不存在的，所以，也就没有必要
            //再创建对应的消息
            if(users.length != 0){
                users.forEach((user)=>{
                    message.sendAtMessage(user._id,questionId,authorId,replyId,(err,msg)=>{
                        //成功的回调函数
                        if(err){
                            callback(err);
                        }else{
                            callback(null,msg);
                        }
                    })
                })
            }
        })
    }
}
module.exports = at