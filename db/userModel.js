var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	username:String,
	password:String,
	createTime:Number //用户注册的时间
});

// 要想对users集合进行增删改查，mongoose要求必须先创建一个Model模型
// 然后使用这个Model模型提供的api方法，即可实现增删改查的操作
// 第一个参数是集合的名字
var userModel=mongoose.model('users',userSchema);

//导出
module.exports=userModel;