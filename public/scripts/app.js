var module = angular.module("BBGO",["ngResource"]);

module.service("BBGOService",["$resource",function($resource){
	return $resource('api',{},{
		query : {
			method : 'GET'
		}
	});
}]);

module.directive("scrollTo",[function(){
	var definition={
		restrict 	: 'A',
		scope 		: {
			'scrollDirection' : "=",
			'unit'		: "="
		},
		link 		: function(scope,element,attrs){
			//can handle left right aswell as of now notneeded
			element.on('click',function(){
				console.log(attrs.scrollDirection)
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
	
}])
module.filter("headingFilter",[function(){
	return function(text){
		if(text){
			return text.match(/<a href=\"[\w\W]*\">(<b>)*([\w\W]*)(<\/b>)*<\/a>/)[2]	
		}
		
	}
}])


module.controller("BBGOCtrl",["$scope","$location","$filter","BBGOService",function($scope,$location,$filter,BBGOService){

	$scope.response = null;
	//console.log($location.search());
	//using window.location to avoid ng-route bad!!
	//var globalQuery = window.location.search.replace('?q=','') ;
	//window.location.search = "q=hello"
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
		$scope.loading=true;
		BBGOService.query(request,function(data){
			$scope.response = data;
			$scope.loading=false;
		},function(error){
			$scope.loading=false;
			$scope.error=false;
		});
	}

	/*if( globalQuery){
		$scope.search( globalQuery);
	}*/
	
	
}])


