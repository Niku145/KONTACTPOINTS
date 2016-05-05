angular.module('starter.controllers', ['Kp.Factory'])
        .controller('HomeCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            // Form data for the login modal
            $scope.loginData = {};
            $localStorage.pointsdata = {};
            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                debugger;
                var LoginArray = {
                    "UserName": $scope.loginData.username,
                    "password": $scope.loginData.password,
                    "DeviceToken": $localStorage.AccessToken

                };
                $scope.LoginData = {};
                KpFactory.getLogin(LoginArray).then(function (response) {

                    debugger;
                    if (response.Data != null) {
                        $scope.LoginData = response.Data;
                        $localStorage.ProfileData = "";
                        $localStorage.ProfileData = response.Data;
                        //$localStorage.Username = $scope.loginData.username;
                        //$localStorage.Password = $scope.loginData.password;
                        $localStorage.UserId = response.Data[0].UserId;
                        $localStorage.Email = response.Data[0].Email;
                        //$localStorage.City = response.Data[0].City;
                        //$localStorage.Website = response.Data[0].Website;
                        //$localStorage.Phone = response.Data[0].Phone;
                        $localStorage.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
                        //$localStorage.Gender = response.Data[0].Gender;
                        $localStorage.Photo = "http://kontactpoints.com/" + response.Data[0].Photo.replace('~', '').trim();
                        //  http://kontactpoints.com/{{ProfileData.Logo.replace('~','').trim()}}
                        $scope.Photo = $localStorage.Photo;
                        $scope.Name = response.Data[0].FirstName + " " + response.Data[0].LastName;
                        $timeout(function () {
                            $scope.closeLogin();
                        }, 100);
                        $ionicLoading.hide();
                        var TokenArray = {
                            "AccessToken": $localStorage.AccessToken
                        };
                        KpFactory.AddToken(TokenArray).then(function (response) {
                            //  alert(JSON.stringify(response)); 
                        });
                        $state.go("iwtlist");
                    } else {

                        $ionicLoading.hide();
                        alert("Wrong Login Cradentials");
                    }
                    // console.log(response);
                });
            };
            $scope.getpassword = function () {
                $state.go("forgotpassword");
            }
            $scope.signup = function () {
                $state.go("signup");
            }
        })
        .controller('forgotpasswordCtrl', function ($scope, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.getmail = {};
            $scope.getpassword = function () {
                var passwordArray = {
                    UserName: $scope.getmail.mailid
                }
                KpFactory.forgotpassword(passwordArray).then(function (response) {

                    debugger;
                    if (response.data.status = "Ok") {
                        alert(response.data.msg);
                        $state.go("home");
                    } else {

                        alert(response.data.msg);
                    }

                });
            }
        })
        .controller('signupCtrl', function ($scope,  KpFactory, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.loginData = {};
      $scope.Gender = {
                gender: 'M'
            };
            $scope.range = function (step) {
                var min = new Date().getFullYear() - 25;
                var max=new Date().getFullYear() +25;

                step = step || 1;
                $scope.input = [];
                for (var i = min; i <= max; i += step) {
                    $scope.input.push(i);
                }
                return $scope.input;
            };
               $scope.doSignup = function () {
                $ionicLoading.show({
                   template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
               });
                debugger;
                var SignupArray = {
                    "UserName": $scope.loginData.username,
                    "Password": $scope.loginData.password,
                    "email": $scope.loginData.username,
                    "parentId": "1",
                    "FirstName": $scope.loginData.fname,
                    "LastName": $scope.loginData.lname,
                    "gender": $scope.Gender.gender,
                    "Pin": $scope.loginData.pin,
                    "birth": $scope.loginData.yob,
                    "Zipcode": $scope.loginData.postcode,
                    "mobile": "",
                    "altemail": $scope.loginData.username,
                    "question": $scope.loginData.sq,
                    "answer": $scope.loginData.ans,
                    "photo": ""
                };
                KpFactory.getSignup(SignupArray).then(function (response) {

                    debugger;
                    $ionicLoading.hide();

                    if (response.data.status = "Success") {
                        alert(response.data.msg);                    
                        $state.go("home");
                    } else {
                        alert(response.data.msg);
                    }

                });
            };

        })
        .controller('iwtlistCtrl', function ($scope, $rootScope, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {

            $scope.iwtlists = {};
            var iwtlistArray = {
                ConsumerId: $localStorage.UserId,
                Filter: "ALL"
            }
            KpFactory.iwtlist(iwtlistArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {
                    alert(response.data.msg);
                    $scope.iwtlists = response.data.Data
                } else {

                    alert(response.data.msg);
                }

            });
            $scope.date = function (date) {
                var dt = date.split("-")[1] + "/" + (date.split("-")[2]).split("T")[0] + "/" + date.split("-")[0];
                return dt;
            }
            $scope.offerlist = function (iwtid, lat, long) {
                debugger;
                $rootScope.iwtid = iwtid;
                $state.go('iwtofferlist', {'IwtID': iwtid, 'Lat': lat, 'Long': long})

            }
        })
        .controller('iwtofferlistCtrl', function ($scope, $rootScope, $ionicHistory, $ionicSlideBoxDelegate, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $stateParams) {
            debugger;

            $scope.filter = {};
            $scope.filter.cb1 = false;
            $scope.filter.cb2 = false;
            $scope.filter.cb3 = false;
            $scope.iwtofferlists = {};
            var offerArray = {
                IwtId: $rootScope.iwtid,
                Filter: "ALL"
            }
            KpFactory.iwtofferlist(offerArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {
                    alert(response.data.msg);
                    $scope.iwtofferlists = response.data.Data;
                } else {

                    alert(response.data.msg);
                }

            });

            toRad = function (value) {
                return value * Math.PI / 180;
            }
            $scope.cal = function (merlat, merlong) {
                debugger;
                var R = 6371;
                var dLat = toRad(merlat - $stateParams.Lat);
                var dLon = toRad(merlong - $stateParams.Long);
                var lat1 = toRad($stateParams.Lat);
                var lat2 = toRad($stateParams.Long);

                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
                        Math.cos(lat1) * Math.cos(lat2);

                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return ((R * c) * (0.63)).toFixed(2);
            }
            $scope.open = function () {

                $ionicModal.fromTemplateUrl('iwt-modal.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            $scope.close = function () {
                $scope.modal.hide();
            }
            $scope.apply = function () {
                debugger;
                $scope.iwtofferlists = {};
                var offerArray = {
                    IwtId: $stateParams.IwtID,
                    Filter: ($scope.filter.cb1 == true ? "ACCEPTED" : "") + ($scope.filter.cb2 == true ? "REJECTED," : "") + ($scope.filter.cb3 == true ? "OFFER" : "")
                }
                KpFactory.iwtofferlist(offerArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                        $scope.iwtofferlists = response.data.Data;
                    } else {

                        alert(response.data.msg);
                    }

                });
                $scope.modal.hide();
            }
            $scope.offerdetail = function (iwtid, mid, iwtofferid, IsSeen) {
                debugger;
                $state.go("offerdetail", {'IwtID': iwtid, 'IwtOfferId': iwtofferid, 'IsSeen': IsSeen, 'Lat': $stateParams.Lat, 'Long': $stateParams.Long, 'mid': mid});
            }
            $scope.date = function (date) {
                var dt = date.split("-")[1] + "/" + (date.split("-")[2]).split("T")[0] + "/" + date.split("-")[0];
                return dt;
            }
            $scope.offerclass = function (status) {
                if (status == 'REJECTED') {
                    return 'buto4';
                } else if (status == 'ACCEPTED') {
                    return 'buto';
                } else {
                    return 'buto3'
                }
            }
        })
        .controller('offerdetailCtrl', function ($scope, $ionicPopover, $cordovaSocialSharing, $cordovaInAppBrowser, $rootScope, $interval, $ionicSlideBoxDelegate, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $stateParams) {
            debugger;
            $scope.imgpath = 'img/flipper1.png';
            $scope.iwtofferlists = {};
            $scope.iwtofferlists = KpFactory.getmrechantoffer($stateParams.mid, $stateParams.IwtOfferId);
            if ($stateParams.IsSeen == false) {
                var seenArray = {
                    IwtOfferId: $stateParams.IwtOfferId
                }
                KpFactory.offerseen(seenArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);
                    }

                });
            }
            $scope.future = new Date($scope.iwtofferlists[0].OfferEndDate);
            $interval(function () {

                var diff;
                diff = Math.floor(($scope.future.getTime() - new Date().getTime()) / 1000);
                // scope.imgpath = 'img/flipper2.png';
//                            return element.text("img/flipper"+Util.dhms(diff).split(' ')[3].charAt(1)+".png");
                var currentdt = $scope.dhms(diff).toString().split(' ');

                var days = (currentdt[0] < 100 ? (currentdt[0] < 10 ? "00" : "0") : "") + currentdt[0].toString();
                var hour = (currentdt[1] < 10 ? "0" : "") + currentdt[1].toString();
                var minut = (currentdt[2] < 10 ? "0" : "") + currentdt[2].toString();
                var sec = (currentdt[3] < 10 ? "0" : "") + currentdt[3].toString();
                $scope.img1 = days.charAt(0);
                $scope.img2 = days.charAt(1);
                $scope.img3 = days.charAt(2);
                $scope.img4 = hour.charAt(0);
                $scope.img5 = hour.charAt(1);
                $scope.img6 = minut.charAt(0);
                $scope.img7 = minut.charAt(1);
                $scope.img8 = sec.charAt(0);
                $scope.img9 = sec.charAt(1);

            }, 1000);
            $scope.chat = function (iwtid, merchantid, mlat, mlong) {
                debugger;
                $state.go('offerdescript', {'IwtID': iwtid, 'MerchantID': merchantid, 'Lat': $stateParams.Lat, 'Long': $stateParams.Long, 'mlat': mlat, 'mlong': mlong});
            }
            $scope.next = function (offerid, end, IsSeen) {
                debugger;
                $scope.future = new Date(end);
                if (IsSeen == false) {
                    var seenArray = {
                        IwtOfferId: offerid
                    }
                    KpFactory.offerseen(seenArray).then(function (response) {
                        debugger;
                        if (response.data.status == "Success") {
                            alert(response.data.msg);

                        } else {

                            alert(response.data.msg);
                        }

                    });
                }
                $ionicSlideBoxDelegate.next();
                $ionicSlideBoxDelegate.update();
            }
            $scope.previous = function (offerid, end, IsSeen, index) {

                $scope.future = new Date(end);
                if (IsSeen == false) {
                    var seenArray = {
                        IwtOfferId: offerid
                    }
                    KpFactory.offerseen(seenArray).then(function (response) {
                        debugger;
                        if (response.data.status == "Success") {
                            alert(response.data.msg);

                        } else {

                            alert(response.data.msg);
                        }

                    });
                }
                $ionicSlideBoxDelegate.previous();
                $ionicSlideBoxDelegate.update();
            }
            $scope.accept = function (oid) {
                debugger;
                var acceptArray = {
                    IwtOfferId: oid
                }
                KpFactory.acceptoffer(acceptArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);
                    }

                });
            };
            $scope.reject = function (oid) {
                debugger;
                var rejectArray = {
                    IwtOfferId: oid
                }
                KpFactory.rejectoffer(rejectArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);
                    }

                });
            }
            toRad = function (value) {
                return value * Math.PI / 180;
            }
            $scope.cal = function (merlat, merlong) {
                debugger;
                var R = 6371;
                var dLat = toRad(merlat - $stateParams.Lat);
                var dLon = toRad(merlong - $stateParams.Long);
                var lat1 = toRad($stateParams.Lat);
                var lat2 = toRad($stateParams.Long);

                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
                        Math.cos(lat1) * Math.cos(lat2);

                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return ((R * c) * (0.63)).toFixed(2);
            }
            $scope.open = function () {

                $ionicModal.fromTemplateUrl('iwt-modal.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            $scope.close = function () {
                $scope.modal.hide();
            }
            $scope.apply = function () {
                debugger;
                var offerArray = {
                    IwtId: $stateParams.IwtID,
                    Filter: ($scope.filter.cb1 == true ? "ACCEPTED" : "") + ($scope.filter.cb2 == true ? "REJECTED," : "") + ($scope.filter.cb3 == true ? "OFFER" : "")
                }
                KpFactory.iwtofferlist(offerArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                        $scope.iwtofferlists = response.data.Data;
                    } else {

                        alert(response.data.msg);
                    }

                });
                $scope.modal.hide();
            }
            $scope.shortform = function (str) {
                var sname = '';
                for (var i = 0; i < str.split(" ").length; i++) {
                    sname += (str.split(" ")[i]).charAt(0);
                }
                return sname;
            }
            $scope.dhms = function (t) {
                var days, hours, minutes, seconds;
                days = Math.floor(t / 86400);
                t -= days * 86400;
                hours = Math.floor(t / 3600) % 24;
                t -= hours * 3600;
                minutes = Math.floor(t / 60) % 60;
                t -= minutes * 60;
                seconds = t % 60;
                return [
                    days,
                    hours,
                    minutes,
                    seconds
                ].join(' ');
            };
            $scope.remain = function (end) {
                var future;
                future = new Date(end);
                $interval(function () {
                    debugger;
                    var diff;
                    diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                    // scope.imgpath = 'img/flipper2.png';
//                            return element.text("img/flipper"+Util.dhms(diff).split(' ')[3].charAt(1)+".png");
                    var currentdt = $scope.dhms(diff).toString().split(' ');

                    var days = (currentdt[0] < 100 ? (currentdt[0] < 10 ? "00" : "0") : "") + currentdt[0].toString();
                    var hour = (currentdt[1] < 10 ? "0" : "") + currentdt[1].toString();
                    var minut = (currentdt[2] < 10 ? "0" : "") + currentdt[2].toString();
                    var sec = (currentdt[3] < 10 ? "0" : "") + currentdt[3].toString();
                    $scope.img1 = days.charAt(0);
                    $scope.img2 = days.charAt(1);
                    $scope.img3 = days.charAt(2);
                    $scope.img4 = hour.charAt(0);
                    $scope.img5 = hour.charAt(1);
                    $scope.img6 = minut.charAt(0);
                    $scope.img7 = minut.charAt(1);
                    $scope.img8 = sec.charAt(0);
                    $scope.img9 = sec.charAt(1);

                }, 1000);
            };
            $ionicPopover.fromTemplateUrl('my-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });
            $scope.share = function ($event) {
                $scope.popover.show($event);
            };
            $scope.whatsapp = function () {
                debugger;
                var message = "Must see this offer";
                image = 'www/img/kp.png';

                var link = "www.kontactpoints.com";
                $cordovaSocialSharing
                        .shareViaWhatsApp(message, image, link)
                        .then(function (result) {
                            alert("sucess");
                            // Success!
                        }, function (err) {
                            alert("failed");
                            // An error occurred. Show a message to the user
                        });
            };
            $scope.facebook = function () {
                var message = "Must see this offer";
                image = 'www/img/kp.png';
                var link = "www.kontactpoints.com";
                $cordovaSocialSharing
                        .shareViaFacebook(message, image, link)
                        .then(function (result) {
                            alert("sucess");
                        }, function (err) {
                            alert("failed");
                        });
            }
        })
        .controller('offerdescriptCtrl', function ($scope, KpFactory, $ionicSlideBoxDelegate, $stateParams, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;


            $scope.input = {};
            $scope.UserId = $localStorage.UserId;
            $scope.html = '<p>hi</p>';
            $scope.messages = {};
            var descriptArray = {
                MerchantId: $stateParams.MerchantID,
                ConsumerId: $localStorage.UserId,
                IwtId: $stateParams.IwtID
            }
            KpFactory.descriptlist(descriptArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {
                    alert(response.data.msg);
                    $scope.messages = response.data.Data;
                } else {

                    alert(response.data.msg);
                }

            });
            var txtInput; // ^^^
            $scope.sendMessage = function () {
                debugger;
                var messageArray = {
                    ConsumerId: $localStorage.UserId,
                    MerchantId: $stateParams.MerchantID,
                    IwtId: $stateParams.IwtID,
                    Description: $scope.input.message

                }
                KpFactory.IwtInsertMessage(messageArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Ok") {
                        alert(response.data.msg);
                    } else {
                        alert(response.data.msg);
                    }

                });
                $scope.input.message = "";
            }
            $scope.htmlToPlaintext = function (text) {
                debugger;
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            }
            $scope.unescap = function (str_esc) {
                debugger
                return  unescape(str_esc);

            }
            toRad = function (value) {
                return value * Math.PI / 180;
            }
            $scope.cal = function () {
                debugger;
                var R = 6371;
                var dLat = toRad($stateParams.mlat - $stateParams.Lat);
                var dLon = toRad($stateParams.mlong - $stateParams.Long);
                var lat1 = toRad($stateParams.Lat);
                var lat2 = toRad($stateParams.Long);

                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
                        Math.cos(lat1) * Math.cos(lat2);

                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return ((R * c) * (0.63)).toFixed(2);
            }
        })

        .filter("sanitize", ['$sce', function ($sce) {
                return function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                }
            }])



