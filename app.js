var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var favicon=require('serve-favicon');

//数据库连接
require('./db/connect')

//引入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter=require('./routes/article');
var uploadRouter=require('./routes/upload');

var app = express();

// view engine setup ejs模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//静态资源服务
app.use(express.static(path.join(__dirname,'public')));

//favicon配置
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

//session中间件的注册
app.use(session({
	secret:'hello 1916',
	resave:false,
	saveUninitialized:true,
	cookie:{maxAge:1000*24*3600} //时效一天
}))

//登录拦截
app.get('*',function(req,res,next){
	var url=req.url;
	if(url==='/login' || url==='/regist'){
		next()
	}
	//用户未登录 跳转至登录页
	if(req.session.username){
		next()
	}else{
		res.redirect('/login')
	}
})

//路由注册
app.use('/', indexRouter); //配置在index.js中的路由都通过'/'访问
app.use('/users', usersRouter);
app.use('/article',articleRouter);
app.use('/upload',uploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
