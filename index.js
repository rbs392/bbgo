

var https = require('https');
var static = require('node-static');
var url = require('url');

var file = new static.Server('./public');

require('http').createServer(function (request, response) {

	var api = url.parse(request.url.toString());
	if(api.pathname=='/api'){
		this.callback = function(data){
			if(data){
				
				response.writeHead(200,{'content-type':'application/json'})
				response.end(data)
				
			};
		
		}
		getApi(api.query,this.callback);
		
	}else{
		request.addListener('end', function () {
	        file.serve(request, response);
	    }).resume();	
	}
    
}).listen(3000);


function getApi(query,callback){
	var url = "https://duckduckgo.com/?"+query+"&format=json"
	console.log(url)
	https.get(url,function(response){
		response.on("data",function(data){
			callback(data);
		})
	}).on('error',function(err){
		console.log("error bala");
		console.log(err);
		callback(false);
	})	
}
