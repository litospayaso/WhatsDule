/*global angular*/

angular.module("starter")
    .controller("BagoazHiztegiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";

        $scope.toggleValue = true;
        $scope.euskEs="Eu_Es";
        $scope.searching=false;

        $scope.toggleAction = function(){
            if ($scope.toggleValue){
                $scope.euskEs = "Eu_Es"
            }else{
                $scope.euskEs = "Es_Eu"
            }
        };

        $scope.search = function () {

        };
        // Simple GET request example:
        // $http({
        //   method: 'GET',
        //   url: 'https://crossorigin.me/http://hiztegiak.elhuyar.eus/eu_es/dsa'
        // }).then(function successCallback(response) {
        //   // var str = 'this is the haystack {{{0}}} {{{1}}} {{{2}}} {{{3}}} {{{4}}} some text {{{5}}} end of haystack';
        //   // var result = $scope.getFromBetween.get(str,"{{{","}}}");
        //   console.log("resultado: ", $scope.getFromBetween.get(response.data,"<span class='remark_es_eu'>","</span>"));
        //   console.log("resultado: ", $scope.getFromBetween.get(response.data,"<strong>","</strong>"));
        //   console.log("resultado: ", $scope.getFromBetween.get(response.data,"<em>","</p>"));
        //   // console.log("BIEEEN",response.data);
        //   // this callback will be called asynchronously
        //   // when the response is available
        // }, function errorCallback(response) {
        //   console.log("MAAAAL!!");
        //   // called asynchronously if an error occurs
        //   // or server returns response with an error status.
        // });

        $scope.getFromBetween = {
            results:[],
            string:"",
            getFromBetween:function (sub1,sub2) {
                if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
                var SP = this.string.indexOf(sub1)+sub1.length;
                var string1 = this.string.substr(0,SP);
                var string2 = this.string.substr(SP);
                var TP = string1.length + string2.indexOf(sub2);
                return this.string.substring(SP,TP);
            },
            removeFromBetween:function (sub1,sub2) {
                if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
                var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
                this.string = this.string.replace(removal,"");
            },
            getAllResults:function (sub1,sub2) {
                // first check to see if we do have both substrings
                if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

                // find one result
                var result = this.getFromBetween(sub1,sub2);
                // push it to the results array
                this.results.push(result);
                // remove the most recently found one from the string
                this.removeFromBetween(sub1,sub2);

                // if there's more substrings
                if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
                    this.getAllResults(sub1,sub2);
                }
                else return;
            },
            get:function (string,sub1,sub2) {
                this.results = [];
                this.string = string;
                this.getAllResults(sub1,sub2);
                return this.results;
            }
        };


    }]);