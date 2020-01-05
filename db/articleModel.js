var mongoose=require('mongoose');

var articleSchema=mongoose.Schema({
	title:String,
	content:String,
	createTime:Number, //文章发布的时间
	username:String //作者
});

var articleModel=mongoose.model('articles',articleSchema);

//导出
module.exports=articleModel;