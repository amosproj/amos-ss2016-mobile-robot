'use strict';
/**
 * Joystick component to control the rover movement.
 *
 * Changeable attributes are:
 * test: enable for unit tests to prevent using nippleJS
 *
 * For communication with the rover 'roverService' is used.
 */
angular.module('myApp.joystick', [])
  .controller('JoystickCtrl', ['$scope', 'roverService','$attrs', function($scope, roverService, $attrs) {
    var manager = {on:function () {}};

    $scope.joystickSize = 150;
    
    $scope.up = function () {
      roverService.driveForward();
    };

    $scope.down = function () {
      roverService.driveBackward();
    };

    $scope.left = function () {
      roverService.turnLeft();
    };

    $scope.right = function () {
      roverService.turnRight();
    };

    $scope.stop = function () {
      roverService.stop();
    };

    this.$onInit = function() {
      if(!$attrs.test){
        initNippleJS();
      }
    };


    var options = {
      zone: document.getElementById('zone_joystick'),
      color: '#4CAF50',
      size: $scope.joystickSize,
      position: {left: '50%', top: '50%'},
      mode: 'static',
      restOpacity: 0.7
    };

    function initNippleJS() {
      console.log('use nipple js');
      manager = nipplejs.create(options);
      manager.on('move', function (evt, data) {
        //console.log('radian'+data.angle.radian +'   distance: '+data.distance);
      });

      manager.on('dir:up',function (evt,data) {
        console.log('joystick:up');
        $scope.up();
      });

      manager.on('dir:down',function (evt,data) {
        console.log('joystick:down');
        $scope.down();
      });

      manager.on('dir:left',function (evt,data) {
        console.log('joystick:left');
        $scope.left();
      });

      manager.on('dir:right',function (evt,data) {
        console.log('joystick:right');
        $scope.right();

      });

      manager.on('end',function (evt,data) {
        console.log('joystick:stop');
        $scope.stop();
      });
    }


  }])
  .component('joystick', {
    restrict: 'EA',
    templateUrl: 'components/joystick/joystick.html',
    css: 'components/joystick/joystick.css',
    controller: 'JoystickCtrl',
    bindings: {
      test: '<'
    }
  });