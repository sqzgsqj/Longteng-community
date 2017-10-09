/**
 * Created by hama on 2017/9/18.
 */
//消息列表的处理函数
exports.index = (req,res,next)=>{
    res.render('message-list',{
        title:'消息列表',
        layout:'indexTemplate'
    })
}
//更新某个消息的处理函数
exports.updateMessage = (req,res,next)=>{

}
//已读所有消息的处理函数
exports.updateAllMessage = (req,res,next)=>{

}