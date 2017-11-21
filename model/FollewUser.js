/**
 * Created by root on 2017/10/20.
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const shortid = require('shortid');
 const FollowUserSchema = new Schema({
     _id:{
         type:String,
         default:shortid.generate,
         unique:true
     },
     //关注的人
     follow_id:{
         type:[],
         default:[]
     },
     //被关注的人
     following_id:{
         type:[],
         default:[]
     }
 })
const FollowUser = mongoose.model('FollowUser',FollowUserSchema);
module.exports = FollowUser