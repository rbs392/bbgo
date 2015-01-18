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
			'scrollDir' : "=scrollDir",
			'unit'		: "=unit"
		},
		link 		: function(scope,element,attrs){
			//can handle left right aswell as of now notneeded
			console.log(element.parent().parent().find('ul'))
			element.on('click',function(){
				alert(scope.direction)
				if(scope.direction="top"){
					scope.unit="-"+scope.unit;
				}
				alert(scope.unit);
				element.parent().parent().find('ul').animate({scrollTop:scope.unit},100);
			})
		}
	}
	return definition;
	
}])
module.filter("headingFilter",[function(){
	return function(text){
		if(text){

			console.log(text.match(/<a href=\"[\w\W]*\">(<b>)*([\w\W]*)(<\/b>)*<\/a>/))
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


