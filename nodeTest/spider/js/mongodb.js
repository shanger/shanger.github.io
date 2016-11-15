//连接
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondbl';
var insertData = function(db,callback){
	//连接表
	var collection = db.collection('tb2');
	//插入数据
	var data = [
		{
			name:'shan',age:21
		},{
			name:'zhang',age:23
		}
	];
	collection.inster(data,function(err.result){
		if(err){
			console.log('Error'+err);
			return;
		}
		callback(result);
	})
}

MongoClient.connect(DB_CONN_STR,function(err,db){
	console.log('连接成功');
	insertData(db.function(result){
		console.log(result);
	});
	selectData(db.function(result){
		console.log(result);
	});
	updataDate(db.function(result){
		console.log(result);
	});
	delDate(db.function(result){
		console.log(result);
		db.colse();
	})
});

//查询
var selectData = function(db,callback){
	var collection = db.collection('tb2');
	var whereStr = {name:'shan'};
	collection.find(whereStr).toArray(function(err,result){
		if(err){
			console.log('Error'+err);
			return;
		}
		callback(result);
	})
};

//修改

var updataDate = function(db,callback){
	var collection = db.collection('tb2');
	var whereStr = {name:'shan'};
	var updateStr = {$set:{age:22}};
	collection.update(whereStr,updateStr ,function(err,result){
		if(err){
			console.log('Error'+err);
			return;
		}
		callback(result);
	})
}

//删除
var delDate = function(db,callback){
	var collection = db.collection('tb2');
	var whereStr = {name:'shan'};
	collection.remove(whereStr,function(err,result){
		if(err){
			console.log('Error'+err);
			return;
		}
		callback(result);
	})
}

