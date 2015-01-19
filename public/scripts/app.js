//BBGO module declaration
//requires ngResource
var module = angular.module("BBGO",["ngResource"]);


//BBGOService service
//Used to fetch data from the duck duck go api via node proxy set
module.service("BBGOService",["$resource",function($resource){
	return $resource('api',{},{
		query : {
			method : 'GET'
		}
	});
}]);


//scrollTo Directive
//Used to navigate with jquery animate written to handle only top and down.
module.directive("scrollTo",[function(){
	var definition={
		restrict 	: 'A',
		scope 		: {
			'scrollDirection' 	: "=",
			'unit'				: "="
		},
		link 		: function(scope,element,attrs){
			//can handle left right aswell as of now notneeded
			element.on('click',function(){
				var curScrollTop = element.parent().parent().find('.related-articles-list').scrollTop();
				
				if(attrs.scrollDirection==='top'){
					scope.unit=curScrollTop-120;
					element.parent().parent().find('.related-articles-list').animate({scrollTop:scope.unit+"px"},'1000');	
				}else{
					scope.unit=curScrollTop+120;
					element.parent().parent().find('.related-articles-list').animate({scrollTop:scope.unit+"px"},'1000');	
				}
				
			})
		}
	}
	return definition;
	
}]);

//HeadingFilter 
//used to extract the heading from the result set could have used a decorator but serves the purppose 
module.filter("headingFilter",[function(){
	return function(text){
		if(text){
			return text.match(/<a href=\"[\w\W]*\">(<b>)*([\w\W]*)(<\/b>)*<\/a>/)[2]	
		}
		
	}
}]);

//BBGOCtrl
//Does his job 
//TODO: Query in address bar 

module.controller("BBGOCtrl",["$scope","$location","$filter","BBGOService",function($scope,$location,$filter,BBGOService){

	$scope.response = null;
	$scope.loading	= true;
	
	$scope.search = function(query,check){
		if(check){
			query = $filter("headingFilter")(query);
			console.log(query)
			$scope.query = query
		}

		var request = {
			q : query,
			format : "json",
			pretty:1
		}		
		
		BBGOService.query(request,function(data){
			$scope.response = data;
			$scope.loading=false;
		},function(error){
			$scope.loading=false;
			$scope.error=false;
		});
	}
	
}]);


