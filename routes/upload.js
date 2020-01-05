var express = require('express');
var router = express.Router();
var userModel=require('../db/userModel');
var multiparty=require('multiparty');
var fs=require('fs');
var path=require('path');

/* GET home page. */
router.post('/img',function(req,res,next){
	var form=new multiparty.Form();
	form.parse(req,function(err,fields,files){
		if(err){
			console.log('文件上传失败')
		}else{
			var img=files.filedata[0];
			console.log('a photo',img);
			//读取文件流
			var read=fs.createReadStream(img.path);
			//将文件流写入的路径
			var write=fs.createWriteStream(path.join(__dirname,'../public/upload/'+img.originalFilename))
			//从读取流 流向 写入流
			read.pipe(write)
			write.on('close',function(){
				res.send({err:0,msg:'/upload/'+img.originalFilename})
			})
		}
	})
})

module.exports = router;