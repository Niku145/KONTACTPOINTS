// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-datepicker', 'ngCordova', 'ngStorage', 'starter.controllers', 'monospaced.elastic', 'angularMoment', 'Kp.Factory', 'ngSanitize'])

       // .run(function ($ionicPlatform, $localStorage, $rootScope, $cordovaGeolocation, $cordovaPush, $state, KpFactory, $ionicLoading, $ionicModal, $timeout, $ionicHistory) {
 .run(function ($ionicPlatform, $localStorage,$cordovaGeolocation, $state, KpFactory, $ionicLoading, $ionicModal, $timeout, $ionicHistory) {

            var androidConfig = {
                "senderID": "1063978477551",
            };
            $localStorage.ConsumerId = "";
            $localStorage.MerchantId = "";
              $localStorage.AccessToken ="";
//            document.addEventListener("deviceready", function () {
//                $cordovaPush.register(androidConfig).then(function (result) {                    
//                }, function (err) {
//                    alert("Fail Token");
//                    alert(JSON.stringify(err));
//                })
//
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
//                            
//                            alert("Kontact Points Merchant Send One New Transaction Request");
//                          
//                            if (notification.payload.data.AdditionaData.type.toString() == "Transaction")
//                            {
//                                $localStorage.ConsumerId = notification.payload.data.AdditionaData.ConsumerId;
//                                $localStorage.MerchantId = notification.payload.data.AdditionaData.MerchantId;
//                                $localStorage.UserName = notification.payload.data.AdditionaData.UserName;
//                                $localStorage.Password = notification.payload.data.AdditionaData.Password;
//
//                                $ionicLoading.show({
//                                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
//                                });
//                                debugger;
//                                var LoginArray = {
//                                    "UserName": notification.payload.data.AdditionaData.UserName,
//                                    "password": notification.payload.data.AdditionaData.Password,
//                                    "DeviceToken": $localStorage.AccessToken
//                                };
//
//                                $rootScope.LoginData = {};
//
//                                KpFactory.getLogin(LoginArray).then(function (response) {
//                                    console.log("OK");
//                                    debugger;
//
//                                    if (response.Data != null) {
//
//                                        $rootScope.LoginData = response.Data;
//                                        $localStorage.ProfileData = "";
//                                        $localStorage.ProfileData = response.Data;
//                                        $localStorage.UserId = response.Data[0].UserId;
//                                        $localStorage.Email = response.Data[0].Email;
//                                        $localStorage.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
//                                        $localStorage.Photo = "http://kontactpoints.com/" + response.Data[0].Photo.replace('~', '').trim();
//
//                                        $rootScope.Photo = $localStorage.Photo;
//                                        $rootScope.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
//                                        $timeout(function () {
//                                            $scope.closeLogin();
//                                        }, 100);
//                                        $ionicLoading.hide();
//
//                                        var TokenArray = {
//                                            "AccessToken": $localStorage.AccessToken
//                                        };
//                                        KpFactory.AddToken(TokenArray).then(function (response) {
//                                            //  alert(JSON.stringify(response)); 
//                                        });
//
//                                        $state.go("app.merchantTransactionRequest");
//                                    } else {
//
//                                        $ionicLoading.hide();
//                                        alert("Wrong Login Cradentials");
//
//                                    }
//                                   
//                                });
//
//
//                            }
//
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
//
//
//                $cordovaPush.unregister(options).then(function (result) {
//                    // Success!
//                }, function (err) {
//                    // Error
//                })
//
//            }, false);




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

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider,ionicDatePickerProvider) {
            var datePickerObj = {
                inputDate: new Date(),
                setLabel: 'Set',
                todayLabel: 'Today',
                closeLabel: 'Close',
                mondayFirst: false,
                weeksList: ["S", "M", "T", "W", "T", "F", "S"],
                monthsList: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                templateType: 'popup',
                from: new Date(2012, 8, 1),
                to: new Date(2018, 8, 1),
                showTodayButton: true,
                dateFormat: 'yyyy MM dd',
                closeOnSelect: false,
                disableWeekdays: [7]
            };
            ionicDatePickerProvider.configDatePicker(datePickerObj);
            $stateProvider
                    //.state('Intro', {
                    //    url: '/intro',
                    //    templateUrl: 'templates/intro.html',
                    //    controller: 'IntroCtrl'
                    //})

                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })
                    .state('app.mystatement', {
                        url: '/mystatement',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mystatement.html',
                                controller: 'MyStatementCtrl'
                            }
                        }
                    })
                    .state('app.myprofile', {
                        url: '/myprofile',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/myprofile.html',
                                controller: 'MyProfileCtrl'

                            }
                        }
                    })
                    .state('app.dashbord', {
                        url: '/dashbord',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/dashbord.html',
                                controller: 'DashbordCtrl'

                            }
                        }
                    })
                    .state('app.mycard', {
                        url: '/mycard',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mycard.html',
                                controller: 'MyCardCtrl'

                            }
                        }
                    })
                    .state('app.mycontact', {
                        url: '/mycontact',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mycontact.html',
                                controller: 'MyContactCtrl'

                            }
                        }
                    })
                    .state('app.mymessage', {
                        url: '/mymessage',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mymessage.html',
                                controller: 'MyMessageCtrl'

                            }
                        }
                    })
                    .state('app.composemessage', {
                        url: '/composemessage',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/composemessage.html',
                                controller: 'ComposeMessageCtrl'

                            }
                        }
                    })
                    .state('app.creategroup', {
                        url: '/creategroup',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/creategroup.html',
                                controller: 'CreateGroupCtrl'

                            }
                        }
                    })
                    .state('app.messagedetail', {
                        url: '/messagedetail',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/messagedetail.html',
                                controller: 'MessageDetailCtrl'

                            }
                        }
                    })
                    .state('app.mycircle', {
                        url: '/mycircle',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mycircle.html',
                                controller: 'MyCircleCtrl'

                            }
                        }
                    })
                    .state('app.myinvite', {
                        url: '/myinvite',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/myinvite.html',
                                controller: 'MyInviteCtrl'

                            }
                        }
                    })
                    .state('app.inshop', {
                        url: '/inshop',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/inshop.html',
                                controller: 'inshopCtrl'

                            }
                        }
                    })
                    .state('app.subcat', {
                        url: '/inshop/:catName',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/subcat.html',
                                controller: 'subcatCtrl'

                            }
                        }
                    })
                    .state('app.grid', {
                        url: '/grid',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/grid.html',
                                controller: 'gridCtrl'

                            }
                        }
                    })
                    .state('app.promotion', {
                        url: '/grid/:pid',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/promotion.html',
                                controller: 'promotionCtrl'

                            }
                        }
                    })
                    .state('app.gmap', {
                        url: '/gmap',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/gmap.html',
                                controller: 'gmapCtrl'

                            }
                        }
                    })
                    .state('app.changeup', {
                        url: '/changeup',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/changeup.html',
                                controller: 'changeupCtrl'

                            }
                        }
                    })
                    .state('app.chat', {
                        url: '/chat',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/chat.html',
                                controller: 'UserMessagesCtrl'

                            }
                        }
                    })
                    .state('app.mybonus', {
                        url: '/mybonus',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mybonus.html',
                                controller: 'mybonusCtrl'

                            }
                        }
                    })
                    .state('app.gift', {
                        url: '/gift',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/gift.html',
                                controller: 'giftCtrl'

                            }
                        }
                    })
                    .state('app.acceptreject', {
                        url: '/acceptreject',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/acceptreject.html',
                                controller: 'acceptrejectCtrl'

                            }
                        }
                    })
                    .state('app.merchantTransactionRequest', {
                        url: '/merchantTransactionRequest',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/merchantTransactionRequest.html',
                                controller: 'notificationCtrl'

                            }
                        }
                    })
                    .state('app.iwantthis', {
                        url: '/iwantthis',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/iwantthis.html',
                                controller: 'iwantthisCtrl'

                            }
                        }
                    })
                    .state('app.iwtlist', {
                        url: '/iwtlist',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/iwtlist.html',
                                controller: 'iwtlistCtrl'

                            }
                        }
                    })
                    .state('app.iwtofferlist', {
                        url: '/iwtofferlist',
                        cache: false,
                        params: {
                            'IwtID': '',
                            'Lat': '',
                            'Long': '',
                            'Keyword':''
                        },
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/iwtofferlist.html',
                                controller: 'iwtofferlistCtrl'

                            }
                        }
                    })
                    .state('app.offerdetail', {
                        url: '/offerdetail',
                        cache: false,
                        params: {
                            'IwtID': '',
                            'IwtOfferId': '',
                            'IsSeen': '',
                            'Lat': '',
                            'Long': '',
                            'mid': ''
                        },
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/offerdetail.html',
                                controller: 'offerdetailCtrl'

                            }
                        }
                    })
                    .state('app.offerdescript', {
                        url: '/offerdescript',
                        cache: false,
                        params: {
                            'IwtID': '',
                            'MerchantID': ''
                        },
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/offerdescript.html',
                                controller: 'offerdescriptCtrl'

                            }
                        }
                    })
                     .state('app.paymentlist', {
                        url: '/paymentlist',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/paymentlist.html',
                                controller: 'paymentlistCtrl'

                            }
                        }
                    })
                     .state('app.livestatus', {
                        url: '/livestatus',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/livestatus.html',
                                controller: 'livestatusCtrl'

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
