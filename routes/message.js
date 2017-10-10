/**
 * Created by hama on 2017/9/18.
 */
//消息列表的处理函数
const Message = require('../model/Message');
const EJS = require('ejs');
exports.index = (req,res,next)=>{
    //未读消息和已读消息两种消息分别查询出来，放到这个页面里面去
    //读取的是当前登录用户的已读消息和未读消息
    let mission1 = new Promise((resolve,reject)=>{
        Message.getUnReadMessages(req.session.user._id,(err,undatalist)=>{
            if(err){
                reject(err);
            }else{
                resolve(undatalist);
            }
        })
    })
    let mission2 = new Promise((resolve,reject)=>{
        Message.getReadMessages(req.session.user._id,(err,datalist)=>{
            if(err){
                reject(err);
            }else{
                resolve(datalist);
            }
        })
    })
    //获取已读消息的总数量
    let mission3 = new Promise((resolve,reject)=>{
        Message.getMessagesReadCount(req.session.user._id,(err,count)=>{
            if(err){
                reject(err);
            }else{
                resolve(count);
            }
        })
    })
    Promise.all([mission1,mission2,mission3]).then((result)=>{
        let read = result[1];
        let no_read = result[0];
        let totalItem = result[2];
        let limit = 5;
        let totalPage = Math.ceil(totalItem/limit);
        let pageArr = [];
        for(let i=1;i<=totalPage;i++){
            pageArr.push(i);
        }
        res.render('message-list',{
            title:'消息列表',
            layout:'indexTemplate',
            no_read:no_read,
            read:read,
            pageArr:pageArr,
            currentPage:1
        })
    }).catch(err=>{
        console.log(err);
    })
}
//更新某个消息的处理函数
exports.updateMessage = (req,res,next)=>{
    let id = req.params.id;
    Message.updateMessage(id,(err,result)=>{
        if(err){
            return res.end(err);
        }
        res.end('success');
    })
}
//已读所有消息的处理函数
exports.updateAllMessage = (req,res,next)=>{
    let user_id = req.session.user._id;
    Message.updateAllMessage(user_id,(err,result)=>{
        if(err){
            return res.end(err);
        }
        res.end('success');
    })
}
//分页显示已读消息的处理函数
exports.showMessagesPage = (req,res,next)=>{
    let page = req.params.page;
    let user_id = req.session.user._id;
    let limit = 5;
    let startNum = (page - 1) * limit;
    Message.showMessagesPage(user_id,startNum,limit,(err,messages)=>{
        res.render('show-message',{
            messages:messages,
            layout:''
        })
    })
}