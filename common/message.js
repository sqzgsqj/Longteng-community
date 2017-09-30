/**
 * Created by hama on 2017/9/30.
 */
const Message = require('../model/Message');
const _ = require('lodash');
const message = {
    sendAtMessage:(targetId,questionId,authorId,replyId,callback)=>{
        callback = callback || _.noop;
        let newMessage = new Message();
        newMessage.type = 'at';
        newMessage.target_id = targetId;
        newMessage.question_id = questionId;
        newMessage.author_id = authorId;
        newMessage.reply_id = replyId;
        newMessage.save((err,msg)=>{
            return callback(null,msg);
        })
    }
}
module.exports = message