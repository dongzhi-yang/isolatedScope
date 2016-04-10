import angular from 'angular';
import angularMeteor from 'angular-meteor';

angular.module("isolatedScope",[angularMeteor])
  .directive("isolatedScope", function () {
    
    //define controller here and use $inject so that strict can work.
    var controller1=function($scope){
        $scope.changeFunctionFromInside=()=>{
            $scope.functionBind=(text)=>{
             alert("this function belongs to the isolated scope only. text parameter is:"+text);
         };
        };

     };
    controller1.$inject = ["$scope", "$http", "$filter"];  
    return {
      restrict: "EA",
      scope: {
        textBind: "@attrTextBind",
        twoWayBind: "=attrTwoWayBind",
        functionBind: "&attrFunctionBind",
        objectBind: "&attrObjectBind"
      },
      templateUrl:'client/isolatedScope.html',
     controller:controller1
    };
})
.controller("isolatedScopeCtrl",["$scope",function($scope){
                                                                $scope.text = "initial text";
                                                                $scope.alertTextFunction =(text)=>{
                                                                    alert("this function belongs to the wrapper scope. text parameter is:"+text);
                                                                }
                                                                $scope.obj={
                                                                    "text":"obj.text"
                                                                };
                                                            }]);



function onReady() {
  angular.bootstrap(document, ['isolatedScope'], {
    strictDi: true
  });
}
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

