/*global angular*/

angular.module("starter")
    .controller("BagoazHiztegiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";

        $scope.toggleValue = true;
        $scope.euskEs="Eu_Es";
        $scope.searching=false;
        $scope.translateCard=null;
        $scope.exampleCard=null;

        $scope.toggleAction = function(){
            if ($scope.toggleValue){
                $scope.euskEs = "Eu_Es"
            }else{
                $scope.euskEs = "Es_Eu"
            }
        };

        $scope.change = function (){
          $scope.translateCard = false;
          $scope.exampleCard = false;
        };

        $scope.search = function () {
            $scope.searching = true;

            $http({
              method: 'GET',
              url: 'https://crossorigin.me/http://hiztegiak.elhuyar.eus/' + $scope.euskEs + '/' + $scope.hizta
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.searching = false;
                $scope.translateCard=undefined;
                $scope.exampleCard=undefined;

                var traduccion = $scope.getFromBetween.get(response.data,"<strong>","</strong>");
                traduccion = traduccion.slice(0, traduccion.length-2);
                traduccion = traduccion.concat($scope.getFromBetween.get(response.data,"<span class='remark_eu_es'>","</span>"));
                traduccion = traduccion.concat($scope.getFromBetween.get(response.data,"<span class='remark_es_eu'>","</span>"));

                var ejemplos = $scope.getFromBetween.get(response.data,"<em>","</p>");

                var ejemplosResultado = [];
                var traduccionResultado = [];

                traduccion.forEach(function (elem){
                    if (elem.length>2 && traduccionResultado.indexOf(elem) === -1){
                        traduccionResultado.push(elem);
                    }
                });

                ejemplos.forEach(function (elem){
                    var element = elem.split("</em>:"),
                        push = {euskera:"",gaztelania:""};
                    if(element.length===2){
                        if(!element[0].includes("<") || !element[0].includes("<")){ //Removing not Examples.
                            push.euskera = element[0];
                            push.gaztelania = element[1].trim();
                            ejemplosResultado.push(push);
                        }
                    }
                });

                traduccionResultado = traduccionResultado.slice(0, 10);
                ejemplosResultado = ejemplosResultado.slice(0, 10);

                if(traduccionResultado.length>0){
                    $scope.translateCard = traduccionResultado;
                }else{
                    $scope.translateCard = ["La palabra que has consultado no está incluida en el diccionario."];
                }
                if(ejemplosResultado.length>0){
                    $scope.exampleCard = ejemplosResultado;
                }

            }, function errorCallback(response) { //Error case not connection available
                $scope.searching = false;
                $scope.translateCard = ["Imposible conectar con el servidor de elHuyar."];
            });

        };


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