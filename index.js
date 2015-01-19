var https = require('https');
var static = require('node-static');
var url = require('url');
var file = new static.Server('./public');

//server create
require('http').createServer(function (request, response) {

	var api = url.parse(request.url.toString());
	switch(api.pathname){
		//proxy pass
		case '/api':{
			this.callback = function(data){
				if(data){
					response.writeHead(200,{'content-type':'application/json'})
					response.end(data)
				};
			}
			getApi(api.query,this.callback);
		}break;

		//generic static server
		default:{
			request.addListener('end', function () {
		        file.serve(request, response);
		    }).resume();	
		} 
	}
    
}).listen(process.env.PORT || 9999);



//call to duck duck go api
function getApi(query,callback){
	var url = "https://duckduckgo.com/?"+query+"&format=json"
	
	https.get(url,function(response){
		var data = "";
		response.on("data",function(chunk){
			data+=chunk;
		})
		//for uniterupted JSON
		response.on("end",function(){
			callback(data);
		})

	}).on('error',function(err){
		callback(false);
	})	
}