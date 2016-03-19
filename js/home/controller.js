(function (angular) {

    'use strict';


    angular
        .module('arnold')
        .directive('pattern', function() {
            return {
                restrict: 'A',
                link: function (scope, element) {

                    //Width and height
                    var dataset = [1];

                    //Width and height
                    var w = "1024";
                    var h = "1024";

                    //Create SVG Element
                    var svg = d3.select("#container")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h)
                        .attr("class", "mysvg");

                    //Import the plane
                    d3.xml("assets/pattern.svg", "image/svg+xml", function(xml) {
                        var importedNode = document.importNode(xml.documentElement, true);
                        svg.selectAll("g")
                            .data(dataset)
                            .enter()
                            .append("g")
                            .each(function(d, i){
                                var plane = this.appendChild(importedNode.cloneNode(true));
                                var imp = d3.select(plane);

                            });
                    });

                }
            };
        })
        .controller('HomeController', ['$scope', '$state', '$document','$timeout',
            function HomeController($scope, $state, $document, $timeout) {

                var vm = this; // view model
                vm.hasChangedColor = false;

                vm.EventColors = [
                    {name: "Green",      value: '#7bd148'},
                    {name: "BoldBlue",   value: '#5484ed'},
                    {name: "Blue",       value: '#a4bdfc'},
                    {name: "Turquoise",  value: '#46d6db'},
                    {name: "LightGreen", value: '#7ae7bf'},
                    {name: "BoldGreen",  value: '#51b749'},
                    {name: "Yellow",     value: '#fbd75b'},
                    {name: "Orange",     value: '#ffb878'},
                    {name: "Red",        value: '#ff887c'},
                    {name: "BoldRed",    value: '#dc2127'},
                    {name: "Purple",     value: '#dbadff'},
                    {name: "Gray",       value: '#e1e1e1'}
                ];
                vm.selectedColor = null;
                vm.selectedColor2 = null;
                vm.picker = false;

                vm.renderColor = function(){

                    vm.hasChangedColor = true;

                    vm.changeColor();
                    $timeout(function() {
                        vm.changeColor();
                    }, 100);
                };

                vm.changeColor = function(){

                    var mysvg = document.getElementsByClassName("mysvg")[0];
                    //var mysvg = document.getElementById('mysvg');

                    var aile= null;

                    for(var j = 24; j<=114; j=j+4) {

                        aile = d3.select(mysvg).select("#path" + j)
                        aile.attr("style", "fill:"+vm.selectedColor.value);
                    }

                    for(var j = 22; j<=116; j=j+4) {

                        aile = d3.select(mysvg).select("#path" + j)
                        aile.attr("style", "fill:"+vm.selectedColor2.value);
                    }

                    var mysvg2 = document.getElementsByClassName("mysvg")[0];

                    svgAsPngUri(mysvg2, {}, function(uri) {

                        vm.bgSrcModel = uri;
                    });
                };

            }
        ]);
})(angular);
