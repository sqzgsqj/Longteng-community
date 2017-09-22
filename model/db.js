/**
 * Created by hama on 2017/9/18.
 */
//数据库连接操作
const mongoose = require('mongoose');
//引入数据库配置参数文件
const setting = require('../setting');
const url = require('url');
//引入加密模块
const crypto = require('crypto');
//调用模块下面的connect方法去连接数据库
mongoose.connect(`mongodb://${setting.host}/${setting.db}`,{
    useMongoClient: true,
});
const DBSet = {
    //通用的新增方法
    addOne:(obj,req,res,logMsg)=>{
        let newObj = new obj(req.body);
        newObj.save().then(result=>{
            res.end(logMsg);
        }).catch(err=>{
            res.end(err);
        })
    },
    //删除的通用方法
    delOne:(obj,req,res,logMsg)=>{
        let url = url.parse(req.url,true);
        let targetId = url.params.query.id;
        obj.remove({_id:targetId}).then(result=>{
            res.end(result);
        }).catch(err=>{
            res.end(err);
        })
    },
    //通用的修改方法
    updateOne:(obj,req,res,logMsg)=>{
        let url = url.parse(req.url,true);
        let targetId = url.params.query.id;
        req.body.update_time = new Date();
        let update = {$set:req.body};
        obj.update({_id:targetId},update).then(result=>{
            res.end(result);
        }).catch(err=>{
            res.end(err);
        })
    },
    //通用的添加方法
    findOne:(obj,req,res,logMsg)=>{
        let url = url.parse(req.url,true);
        let targetId = url.params.query.id;
        obj.findOne({_id:targetId}).then(result=>{
            res.end(result);
        }).catch(err=>{
            res.end(err);
        })
    },
    //加密
    encrypt:(data,key)=>{
        //创建了一个加密的对象,第一个参数是指明算法，第二个是指明使用的密码
        let ciplher = crypto.createCipher('bf',key);
        let newPSD;
        newPSD += ciplher.update(data,'utf8','hex');
        newPSD += ciplher.final('hex');
        return newPSD;
    }
}
module.exports = DBSet