
/* eslint-disable */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jason');
// 用户
var usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin:{
    type: Boolean,
    default: false
  },
  time: {
    type: String,
    default: Date.now()
  }
});
//手机短信验证码
var phoneCodeSchema = new mongoose.Schema({
  phone: String,
  code: String,
  time: {
    type: String,
    default: Date.now()
  }
});
// 分类
var categorySchema = new mongoose.Schema({
  title: String,
  time: {
    type: String,
    default: Date.now()
  }
});
// 文章
var articleSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: {
    type: String,
    default: 'admin'
  },
  content: String,
  time: {
    type: String,
    default: Date.now()
  },
  views:{
    type: Number,
    default: 0
  },
  like:{
    type: Number,
    default: 0
  },
  comment: {
    type: Array,
    default: []
  }
});

var Model = {
  User: mongoose.model('User', usersSchema),
  PhoneCode: mongoose.model('PhoneCode', phoneCodeSchema),
  Category: mongoose.model('Category', categorySchema),
  Article: mongoose.model('Article', articleSchema)
}
module.exports = Model
