/**
 * Created by hama on 2017/9/25.
 */
const nodemailler = require('nodemailer');
const setting = require('../setting');
const mail = {
    sendEmail:(type,regMsg,callback)=>{
        let name = regMsg.name;//要发送邮箱的用户名
        let email = regMsg.email;//要发送邮箱的地址
        //1.创建SMTP服务
        let transporter = nodemailler.createTransport({
            service:'163',
            auth:{
                user:'anyanglizhiyuan@163.com',
                pass:'lizhi123123'
            }
        })
        //2.设置邮箱的默认格式
        let mailOptions = {
            from:setting.mail_opts.auth.user,
            to:email,
            subject:`恭喜${setting.mail_opts.auth.user}注册社区系统成功`,
            text:`${name}你好`,
            html:'<b>您已经注册成功，请及时进行登录</b>'
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                callback(error);
            }
            callback(info);
        })
    }
}
module.exports = mail