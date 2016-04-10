import angular from 'angular';
import angularMeteor from 'angular-meteor';

angular.module("isolatedScope",[angularMeteor])
  .directive("isolatedScope", function () {
    
    //define controller here and use $inject so that strict can work.
    var controller1=function($scope){

        this.changeFunctionFromInside=()=>{
            $scope.functionBind=(text)=>{
             alert("this function belongs to the isolated scope only. text parameter is:"+text);
           
         };
        
        };
        //attach all properties of $scope to this.this won't work for primitive types like string , number
         Object.keys($scope).forEach((key, idx)=> {
          this[key]=$scope[key];           
         }); 

     };
    controller1.$inject = ["$scope"];  
    return {
      restrict: "EA",
      scope: {
        textBind: "@attrTextBind",
        twoWayBind: "=attrTwoWayBind",
        functionBind: "&attrFunctionBind",
        objectBind: "&attrObjectBind",
        twoWayBindObject:"=attrTwoWayBindObject"
      },
      templateUrl:'client/isolatedScope.html',
     controller:controller1,
     controllerAs:"iso"
    };
})
.controller("isolatedScopeCtrl",function(){
  
this.text = "initial text";
this.alertTextFunction =(text)=>{
                 alert("this function belongs to the wrapper scope. text parameter is:"+text);
             }
 this.obj={
        "text":"obj.text"
    };
});



function onReady() {
  angular.bootstrap(document, ['isolatedScope'], {
    strictDi: true
  });
}
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

