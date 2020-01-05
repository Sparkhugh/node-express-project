var express = require('express');
var router = express.Router();
var userModel=require('../db/userModel');

/* GET users listing. */
/*
router.get('/',function(req,res,next){
	userModel.find().then(docs=>{
		console.log('用户列表',docs)
		res.json({
			msg:'success',
			list:docs
		})
	})
})
router.get('/getUser',function(req,res,next){
	let name=req.query.name||''
	userModel.find({name:name}).then(doc=>{
		res.json({
			msg:'success',
			user:doc
		})
	})
})
*/


//注册 接口
router.post('/regist', function(req, res, next) {
  var {username,password,password2}=req.body
	//如果两次密码不等,不能注册
	if(password2 != password){
		//res.json({err:1,msg:'两次密码不相等'})
		//res.send("<script>alert('两次密码不相等')</script>")
		res.redirect('/regist')
		return;
	}
	//数据不能为空
	if(!username || !password || !password2){
		//res.json({err:1,msg:'表单不能为空'})
		res.redirect('/regist')
		return;
	}
	//step1,判断用户名是否被占用
	userModel.find({username}).then(arr=>{
		if(arr.length>0){
			//res.json({err:1,msg:'该用户名已被占用'})
			res.redirect('/regist')
		}else{
			//step2 注册 入库
			var createTime=Date.now();
			userModel.insertMany([{username,password,createTime}]).then(()=>{
				//res.json({err:0,msg:'注册成功'})
				//step3 注册成功 跳转登录页
				res.redirect('/login')
			}).catch(err=>{
				//res.json({err:1,msg:'注册失败'})
				res.redirect('/regist')
			})
		}
	})
});

//登录 接口
router.post('/login',function(req,res,next){
	var {username,password}=req.body
	userModel.find({username,password}).then(arr=>{
		if(arr.length>0){
			//登录成功
			//向客户端写入cookie 记录用户登录状态
			req.session.isLogin=true;
			req.session.username=username;
			res.redirect('/')
		}else{
			//登录失败
			res.redirect('/login')
		}
	})
})

//退出登录
router.get('/logout',function(req,res,next){
	req.session.destroy()
	res.redirect('/login')
})


module.exports = router;
