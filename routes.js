/**
 * Created by hama on 2017/9/18.
 */
//路由文件
const express = require('express');
const router = express.Router();
//引入首页的处理函数
const home = require('./routes/home');
//引入问题的处理函数
const question = require('./routes/question');
//引入用户的处理函数
const user = require('./routes/user');
//引入消息的处理函数
const message = require('./routes/message');
//引入一级回复的处理函数
const reply = require('./routes/reply');
//引入权限文件
const auth = require('./common/auth');
//引入二级回复的处理函数
const comment = require('./routes/comment');
//************************************首页***************************************
//首页的路由
router.get('/',home.index);
//注册页面的路由
router.get('/register',auth.userNotRequired,home.register);
//登录页面的路由
router.get('/login',auth.userNotRequired,home.login);
//注册行为
router.post('/register',auth.userNotRequired,home.postRegister);
//登录行为
router.post('/login',auth.userNotRequired,home.postLogin);
//退出行为
router.get('/logout',home.logout);

//**************************************问题***********************************
//发布问题的页面
router.get('/question/create',auth.userRequired,question.create);
//发布问题的行为
router.post('/question/create',auth.userRequired,question.postCreate);
//编辑问题的页面
router.get('/question/:id/edit',auth.userRequired,question.edit);
//编辑问题的行为
router.post('/question/:id/edit',auth.userRequired,question.postEdit);
//删除问题的行为
router.get('/question/:id/delete',auth.userRequired,question.delete);
//问题页面
router.get('/question/:id',question.index);


//****************************************用户**********************************
//个人设置页面
router.get('/setting',auth.userRequired,user.setting);
//更新头像
router.post('/updateImage',auth.userRequired,user.updateImage);
//更新个人资料
router.post('/updateUser/:id',auth.userRequired,user.updateUser);
//用户列表页面
router.get('/users',user.all);
//个人中心页面
router.get('/user/:name',auth.userRequired,user.index);
//用户发问列表
router.get('/user/:name/questions',auth.userRequired,user.questions);
//用户回复列表
router.get('/user/:name/replys',auth.userRequired,user.replys);

//**************************************消息*************************************
//消息列表页面
router.get('/my/messages',auth.userRequired,message.index);
//确认已读行为
router.get('/updateMessage/:id',auth.userRequired,message.updateMessage);
//确认全部已读行为
router.get('/updateAllMessage',auth.userRequired,message.updateAllMessage);
//显示已读消息的分页
router.post('/showMessagesPage/:page',auth.userRequired,message.showMessagesPage);

//**************************************回复*************************************
router.post('/:question_id/reply',auth.userRequired,reply.add);//一级回复
router.post('/:question_id/comment',auth.userRequired,comment.add)//二级回复
router.get('/:reply_id/showComments',auth.userRequired,comment.show)//显示二级回复
module.exports = router;

