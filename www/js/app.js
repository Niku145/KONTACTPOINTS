// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCordova', 'Kp.Factory','starter.controllers'])

        .run(function ($ionicPlatform, $localStorage, KpFactory,$state,$ionicLoading) {
            var androidConfig = {
                "senderID": "1063978477551",
            };
//            document.addEventListener("deviceready", function () {
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
//                                //   alert($localStorage.AccessToken);
//                            }
//                            break;
////
//                        case 'message':
//                            // this is the actual push notification. its format depends on the data model from the push server
//                            alert("Kontact Points Merchant Send One New Transaction Request");
//                            //console.log(JSON.stringify(notification));
//                            //  console.log(JSON.stringify(notification.payload.data));
//                            // console.log(JSON.stringify(notification.payload.data.AdditionaData));
//                            // console.log(JSON.stringify(notification.message));
//                            //alert('ConsumerId = ' + notification.payload.data.AdditionaData.ConsumerId);
//                            // alert('MerchantId = ' + notification.payload.data.AdditionaData.MerchantId);
//                            //  alert('type = ' + notification.payload.data.AdditionaData.type);
//                            // alert('status = ' + notification.payload.data.AdditionaData.status);

//                            //  alert('UserName = ' + notification.payload.data.AdditionaData.UserName);
//                            // alert('Password = ' + notification.payload.data.AdditionaData.Password);

//                            if (notification.payload.data.AdditionaData.type.toString() == "Transaction")
//                            {
//                                $localStorage.ConsumerId = notification.payload.data.AdditionaData.ConsumerId;
//                                $localStorage.MerchantId = notification.payload.data.AdditionaData.MerchantId;
//                                $localStorage.UserName = notification.payload.data.AdditionaData.UserName;
//                                $localStorage.Password = notification.payload.data.AdditionaData.Password;

//                                $ionicLoading.show({
//                                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
//                                });
//                                debugger;
//                                var LoginArray = {
//                                    "UserName": notification.payload.data.AdditionaData.UserName,
//                                    "password": notification.payload.data.AdditionaData.Password,
//                                    "DeviceToken": $localStorage.AccessToken
//                                };

//                                $rootScope.LoginData = {};

//                                KpFactory.getLogin(LoginArray).then(function (response) {
//                                    console.log("OK");
//                                    debugger;
//                                    if (response.Data != null) {
//                                        $rootScope.LoginData = response.Data;
//                                        $localStorage.ProfileData = "";
//                                        $localStorage.ProfileData = response.Data;
//                                        $localStorage.UserId = response.Data[0].UserId;
//                                        $localStorage.Email = response.Data[0].Email;
//                                        $localStorage.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
//                                        $localStorage.Photo = "http://kontactpoints.com/" + response.Data[0].Photo.replace('~', '').trim();

//                                        $rootScope.Photo = $localStorage.Photo;
//                                        $rootScope.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
//                                        $timeout(function () {
//                                            $scope.closeLogin();
//                                        }, 100);
//                                        $ionicLoading.hide();

//                                        var TokenArray = {
//                                            "AccessToken": $localStorage.AccessToken
//                                        };
//                                        KpFactory.AddToken(TokenArray).then(function (response) {
//                                            //  alert(JSON.stringify(response)); 
//                                        });

//                                        $state.go("app.merchantTransactionRequest");
//                                    } else {

//                                        $ionicLoading.hide();
//                                        alert("Wrong Login Cradentials");

//                                    }
//                                    // console.log(response);
//                                });


//                            }

//                            break;
////
//                        case 'error':
//                            alert('GCM error = ' + notification.msg);
//                            break;

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

//            }, false);
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })
                    .state('forgotpassword', {
                        url: '/forgotpassword',
                        templateUrl: 'templates/forgotpassword.html',
                        controller: 'forgotpasswordCtrl'
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'templates/signup.html',
                        controller: 'signupCtrl'
                    })
                    .state('iwtlist', {
                        url: '/iwtlist',
                        templateUrl: 'templates/iwtlist.html',
                        controller: 'iwtlistCtrl'
                    })
                    .state('iwtofferlist', {
                        url: '/iwtofferlist',
                        cache: false,
                        params: {
                            'IwtID': '',
                            'Lat': '',
                            'Long': ''
                        },
                        templateUrl: 'templates/iwtofferlist.html',
                        controller: 'iwtofferlistCtrl'
                    })
                    .state('offerdetail', {
                        url: '/offerdetail',
                        cache: false,
                        params: {
                            'IwtID': '',
                            'IwtOfferId':'', 
                            'IsSeen':'',
                            'Lat': '',
                            'Long': '',
                            'mid': ''
                        },
                        templateUrl: 'templates/offerdetail.html',
                        controller: 'offerdetailCtrl'
                    })
                    .state('offerdescript', {
                        url: '/offerdescript',
                        cache: false,
                       params: {
                            'IwtID': '',
                            'MerchantID': '',
                            'Lat':'',
                            'Long':'',
                            'mlat':'',
                            'mlong':''
                        },
                        templateUrl: 'templates/offerdescript.html',
                        controller: 'offerdescriptCtrl'
                    })


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');
        });
