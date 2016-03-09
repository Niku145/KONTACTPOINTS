// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngStorage', 'starter.controllers'])

        .run(function ($ionicPlatform, $localStorage, $rootScope, $cordovaGeolocation, $cordovaPush) {

            var androidConfig = {
                "senderID": "1063978477551",
            };

            //           document.addEventListener("deviceready", function () {
//                $cordovaPush.register(androidConfig).then(function (result) {
//                    // Success
//                    // alert("Success Token");
//                }, function (err) {                  
//                    alert("Fail Token");
//                    alert(JSON.stringify(err));
//                })

//                $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
//                    switch (notification.event) {
//                        case 'registered':
//                            if (notification.regid.length > 0) {
//                                //  alert('registration ID = ' + notification.regid);
//                                $localStorage.AccessToken = notification.regid;
//                                // alert($localStorage.AccessToken);
//                            }
//                            break;
//
//                        case 'message':
//                            // this is the actual push notification. its format depends on the data model from the push server
//                            alert('message = ' + notification.message);
//                            console.log(JSON.stringify(notification.message));
//                            break;
//
//                        case 'error':
//                            alert('GCM error = ' + notification.msg);
//                            break;
//
//                        default:
//                            alert('An unknown GCM event has occurred');
//                            break;
//                    }
//                });


//                $cordovaPush.unregister(options).then(function (result) {
//                    // Success!
//                }, function (err) {
//                    // Error
//                })

            //           }, false);

            $ionicPlatform.ready(function () {


                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }



                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            $localStorage.lat = position.coords.latitude;
                            $localStorage.long = position.coords.longitude;
                        }, function (err) {
                            // error
                        });
            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $stateProvider
                    //.state('Intro', {
                    //    url: '/intro',
                    //    templateUrl: 'templates/intro.html',
                    //    controller: 'IntroCtrl'
                    //})

                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl',
                        cache:false
                    })

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                        ,
                        cache:false
                    })

                    .state('app.dashbord', {
                        url: '/dashbord',
                
                        cache:false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/dashbord.html',
                                controller: 'DashbordCtrl'

                            }
                        }
                    })
                    .state('app.points', {
                        url: '/points'
                ,
                        cache:false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/points.html',
                                controller: 'pointsCtrl'

                            }
                        }
                    })
                    .state('app.addconsumer', {
                        url: '/addconsumer',
                cache:false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/addconsumer.html',
                                controller: 'addconsumerCtrl'

                            }
                        }
                    })
                    .state('app.bonus', {
                        url: '/bonus',
                cache:false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/bonus.html',
                                controller: 'bonusCtrl'

                            }
                        }
                    })
                    .state('app.promotion', {
                        url: '/promotion',
                cache:false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/promotion.html',
                                controller: 'promotionCtrl'

                            }
                        }
                    })




            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common["Accept"];
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
            $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        });
