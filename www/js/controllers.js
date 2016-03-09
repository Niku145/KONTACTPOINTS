angular.module('starter.controllers', ['Kp.Factory'])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            // alert($localStorage.Name);
            $scope.Photo = ($localStorage.Photo == null || $localStorage.Photo == "" || $localStorage.Photo == "undefined") ? "img/blank-profile.png" : $localStorage.Photo;
            $scope.Name = $localStorage.Name;
        })
        .controller('HomeCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            // Form data for the login modal
            $scope.loginData = {};
            $localStorage.pointsdata = {}

            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            $scope.closeSignup = function () {
                $scope.modal.hide();
            };

            // Open the login modal

            $scope.login = function () {
                $scope.loginData = {};
                $ionicModal.fromTemplateUrl('templates/login.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                // $scope.modal.show();
            };

            $scope.signup = function () {
                $scope.loginData = {};
                $ionicModal.fromTemplateUrl('templates/signup.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                debugger;
                var LoginArray = {
                    "UserName": $scope.loginData.username,
                    "password": $scope.loginData.password

                };

                $scope.LoginData = {};

                KpFactory.getLogin(LoginArray).then(function (response) {

                    debugger;

                    if (response.Data != null) {
                        $localStorage.pointsdata.CurrentPointsBalance = response.CurrentPointsBalance;
                        $localStorage.pointsdata.CurrentPromotionViews = response.CurrentPromotionViews;
                        $localStorage.pointsdata.TotalPromotionViews = response.TotalPromotionViews;
                        $localStorage.pointsdata.CurrentRevenue = response.CurrentRevenue;
                        $localStorage.counrty = response.Data[0].Country;
                        $localStorage.merchantinfoId = response.Data[0].UserInfoID;
                        $localStorage.useid = response.Data[0].UserID;

 $localStorage.Name = response.Data[0].StoreName;

                        $timeout(function () {
                            $scope.closeLogin();
                        }, 100);
                        $ionicLoading.hide();




                       
//                        KpFactory.AddToken(TokenArray).then(function (response) {
//                            //  alert(JSON.stringify(response)); 
//                        });


                        $state.go("app.dashbord");
                    } else {

                        $ionicLoading.hide();
                        alert("Wrong Login Cradentials");

                    }
                    // console.log(response);
                });


            };


            $scope.doSignup = function () {
                debugger;

                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });

                var SignupArray = {
                    "UserName": $scope.loginData.username,
                    "Password": $scope.loginData.password,
                    "email": $scope.loginData.username,
                    "parentId": "1",
                    "FirstName": "",
                    "LastName": "",
                    "gender": "M",
                    "Pin": "1234",
                    "birth": "01/01/1990",
                    "Zipcode": "",
                    "mobile": $scope.loginData.mobile,
                    "altemail": $scope.loginData.email,
                    "question": "Nothing",
                    "answer": "s",
                    "photo": ""
                };


                KpFactory.getSignup(SignupArray).then(function (response) {

                    debugger;
                    $ionicLoading.hide();

                    if (response.data.status = "Success") {
                        alert(response.data.msg);

                        $timeout(function () {
                            $scope.closeLogin();
                        }, 100);

                        $state.go("home")
                    } else {

                        alert(response.data.msg);

                    }

                });



            };


        })
        .controller('DashbordCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.points = {};
            $scope.imageurl = {};
            $scope.Name = $localStorage.Name;
//            $ionicLoading.show({
//                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
//            });
            debugger;
            var StatementArray = {
                "Emailid": $localStorage.Email
            };
            $scope.CurrentPromotionview = $localStorage.pointsdata.CurrentPromotionViews;
            $scope.PointBalance = $localStorage.pointsdata.CurrentPointsBalance;
            $scope.TotalPromotionview = $localStorage.pointsdata.TotalPromotionViews;
            $scope.CurrentRevenue = $localStorage.pointsdata.CurrentRevenue;
            if ($localStorage.counrty.toUpperCase() == "UK")
            {
                $scope.imageurl = "img/pound.png";
            } else if ($localStorage.counrty.toUpperCase() == "INDIA") {

                $scope.imageurl = "img/Indian_Rupee.png";
            } else {
                $scope.imageurl = "img/dollar.png";
            }
            $scope.LoginData = {};
//            KpFactory.getStatement(StatementArray).then(function (response) {
//
//                $ionicLoading.hide();
//                debugger;
//
//                if (response.Data != null) {
//
//                    $scope.PointBalance = response.Data[0].Consumeramountbalance;
//
//
//                } else {
//
//                    //   alert("Wrong Login Cradentials");
//                    $scope.PointBalance = "0000";
//                }
//                // console.log(response);
//            });
            //   alert("Your Location Near :"+ $localStorage.lat+","+$localStorage.long);


        })
        .controller('pointsCtrl', function ($scope, KpFactory, $ionicModal, $window, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $ionicPlatform, $cordovaBarcodeScanner) {
         
           //alert("a");
           $scope.points = {};
            $scope.item = {};
            $scope.partpayclass = "npp";
            $scope.partpayclass1 = "npp";
            $scope.show = 0;
            $scope.show1 = 0;
            $scope.imageurl = {};
            $scope.offer = {};
            $scope.Manoffer = {};
            $scope.points.bonus = 0;
            $scope.points.netamt = 0;
            $scope.bonusamt = 0;
            $scope.focus2 = 0;
            $scope.pin2 = {};           
          
            
            $scope.paymentoption = [
                {text: "Other", value: "op"},
                {text: "Part", value: "pp"},
                {text: "Full", value: "fpp"}

            ];
            $scope.data = {
                clientSide: 'op'
            };
            if ($localStorage.counrty.toUpperCase() == "UK")
            {
                $scope.imageurl = "img/pound.png";
            } else if ($localStorage.counrty.toUpperCase() == "INDIA") {

                $scope.imageurl = "img/Indian_Rupee.png";
            } else {
                $scope.imageurl = "img/dollar.png";
            }
            $scope.clear = function () {
                debugger;
                $scope.points.userid = "";
                $scope.points.payamt = "";
                $scope.points.bonus = 0;
                $scope.points.netamt = 0;
                $scope.points.pointamt = "";
                $scope.points.amount = "";
                $scope.points.pin1 = "";
                $scope.points.pin2 = "";
                $scope.points.pin3 = "";
                $scope.points.pin4 = "";

            }
            $scope.consumerdata = function () {
                
                var consumerArray = {
                    "Email": $scope.points.userid,
                    "MerchantInfoId": $localStorage.merchantinfoId
                }
                 $ionicLoading.show({
                            template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                        });
                KpFactory.consumerdata(consumerArray).then(function (response) {
                    debugger;
                        $ionicLoading.hide();
                    if (response.data.status = "Success") {                                 
                        
                            alert(response.data.msg);
                            $scope.points.pointsbalance = response.data.Data[0].Consumeramountbalance;
                            $scope.points.amtbalance1 = response.data.Data[0].Consumeramountbalance / 100;
                            $scope.points.consumerId = response.data.Data[0].UserId;
                            $scope.bonusamt = response.data.BonusAmmount;
                            $localStorage.pointsdata.bonusamount = response.data.BonusAmmount;
                            $scope.points.bonus = response.data.BonusAmmount;

                      

                    } else {

                        alert(response.data.msg);
                    }

                });
            }
            $scope.netamount = function (paidamt) {
                debugger;

                if (paidamt < $scope.points.bonus) {
                    $scope.points.bonus = Math.floor($scope.points.bonus);
                } else {
                    $scope.points.bonus = $localStorage.pointsdata.bonusamount;
                }
                $scope.points.netamt = (paidamt - $scope.points.bonus).toFixed(2);
                if ($scope.data.clientSide == "pp" && $scope.points.pointamt != undefined && $scope.points.pointamt != "" && $scope.points.pointamt != null)
                {
                    $scope.points.amount = ($scope.points.netamt - $scope.points.pointamt).toFixed(2);
                } else {
                    $scope.points.amount = "";
                }

                if ($scope.points.amount < 0) {
                    $scope.points.amount = "";
                    $scope.points.pointamt = "";
                }
                if ($scope.points.netamt > $scope.points.amtbalance1) {
                    $scope.points.amtbalance = $scope.points.amtbalance1;
                } else {
                    $scope.points.amtbalance = "";
                }

            }
            $scope.amount = function (pointamt) {
                debugger;
                if (parseInt($scope.points.netamt) <= parseInt(pointamt))
                {
                    $scope.points.amount = "";
                    $scope.points.pointamt = "";
                    alert("Payment should be less than Net Payment");
                } else if ($scope.points.pointamt == "") {
                    $scope.points.amount = "";
                } else {
                    $scope.points.amount = ($scope.points.netamt - pointamt).toFixed(2);
                }
            }
            $scope.transaction = function () {
              $ionicLoading.show({
                        template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                    });
                if ($scope.data.clientSide == "op") {
                    $scope.points.paymentype = "0";
                } else
                if ($scope.data.clientSide == "pp") {
                    $scope.points.paymentype = "1";
                } else {
                    $scope.points.paymentype = "2";
                }
                debugger;
                var transactionArray = {
                    "MerchantInfoId": $localStorage.merchantinfoId.toString(),
                    "Pin": $scope.data.clientSide == "pp" || $scope.data.clientSide == "fpp" ? ($scope.points.pin1 + $scope.points.pin2 + $scope.points.pin3 + $scope.points.pin4) : "0",
                    "Paymenttype": $scope.points.paymentype,
                    "ConsumerId": $scope.points.consumerId,
                    "CurrentConsumerPointsBalance": $scope.points.pointsbalance.toString(),
                    "OfferId": "0",
                    "WithChange": "false",
                    "ChangeAmmount": "0",
                    "PaymentAmmount": $scope.points.payamt.toString(),
                    "BonusAmmount": $scope.points.bonus.toString(),
                    "NetAmmount": $scope.points.netamt.toString(),
                    "PointPayment": $scope.data.clientSide == "pp" && $scope.points.pointamt !== "" && $scope.points.pointamt !== undefined ? $scope.points.pointamt.toString() : "0",
                    "RemainingAmmount": $scope.data.clientSide == "pp" && $scope.points.pointamt !== "" && $scope.points.pointamt !== undefined ? $scope.points.amount.toString() : "0"
                }
                KpFactory.transaction(transactionArray).then(function (response) {
                    debugger;                   
                   
                        $ionicLoading.hide();
                        alert(response.data);
                        if (response.data == "Transaction Successfull" || response.data == "TransactionSuccessFull")
                        {
                            $window.location.reload();
                        } else
                        {

                        }                  


                });
                
                

//                $timeout(function () {
//                    //$scope.clear();
//                    $window.location.reload();
//                }, 500);


            };

            $scope.visbility = function (paymode) {
                debugger;
                if (paymode == "pp") {
                    $scope.show = 1;
                    $scope.show1 = 1;
                    $scope.partpayclass = "pp";
                    $scope.partpayclass1 = "pp";
                } else if (paymode == "fpp") {
                    $scope.show = 1;
                    $scope.show1 = 0;
                    $scope.partpayclass = "pp";
                    $scope.partpayclass1 = "npp";
                } else {
                    $scope.show = 0;
                    $scope.show1 = 0;
                    $scope.partpayclass = "npp";
                    $scope.partpayclass1 = "npp";
                    $scope.points.pointamt = "";
                    $scope.points.amount = "";
                    $scope.points.pin1 = "";
                    $scope.points.pin2 = "";
                    $scope.points.pin3 = "";
                    $scope.points.pin4 = "";
                }
            }

            $scope.changefocus1 = function (pinname) {

                document.getElementById(pinname).focus();


            };

//            var merchantofferArray = {
//                "UserId": $localStorage.useid
//            }
//            KpFactory.merchantofferdata(merchantofferArray).then(function (response) {
//                debugger;
//                if (response.data.status = "Success") {
//                    alert(response.data.msg);
//                    $scope.offers = response.data.Data;
//
//                } else {
//
//                    alert(response.data.msg);
//
//                }
//
//            });
//            KpFactory.manufactuerofferdata(merchantofferArray).then(function (response) {
//                debugger;
//                if (response.data.status = "Success") {
//                    alert(response.data.msg);
//                    $scope.Manoffers = response.data.Data;
//
//                } else {
//
//                    alert(response.data.msg);
//
//                }
//
//            });

            $scope.scan = function () {
                // alert("hi");

                $ionicPlatform.ready(function () {
                    $cordovaBarcodeScanner.scan().then(function (barcodeData) {
                        // alert(JSON.stringify(barcodeData));
                        // var data=JSON.stringify(barcodeData);
                        // alert(barcodeData.text);
                        if (barcodeData != null && barcodeData.text != "")
                        {
                            // alert(barcodeData.text.replace("*", "").trim());  
                            $scope.points.userid = barcodeData.text.replace("*", "").trim();
                            $scope.consumerdata();
                        }

                    }, function (error) {
                        alert(JSON.stringify(error));
                    });
                });
            };

        })
        .controller('addconsumerCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, KpFactory) {
            $scope.consumer = {};
            $scope.consumer.usertype = "Free";
            $scope.form = 1;

            $scope.change = function () {
                debugger;
                if ($scope.consumer.fname == "" || $scope.consumer.lname == "" || $scope.consumer.email == "" || $scope.consumer.lname == undefined || $scope.consumer.email == undefined) {

                    $scope.form = 1;
                } else {
                    $scope.form = 0;
                }
            }
            $scope.addconsumer = function () {
                debugger;
                var consumerArray = {
                    "MerchantInfoId": parseInt($localStorage.merchantinfoId),
                    "Email": $scope.consumer.email,
                    "FirstName": $scope.consumer.fname,
                    "LastName": $scope.consumer.lname,
                    "Usertype": $scope.consumer.usertype
                };
                KpFactory.addconsumer(consumerArray).then(function (response) {

                    debugger;


                    if (response.data.status = "Success") {

                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);

                    }

                });
            }

        })
        .controller('bonusCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, KpFactory) {
            $scope.bonus = {}
            $scope.setbonus = function () {
                debugger;
                var bonusArray = {
                    "MerchantInfoId": $localStorage.merchantinfoId,
                    "BonusPoint": parseInt($scope.bonus.point)
                }
                KpFactory.setbonuspoint(bonusArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);

                    }

                });

            }
        })
        .controller('promotionCtrl', function ($scope, $window, $ionicModal, $timeout, $ionicSlideBoxDelegate, $localStorage, $state, $ionicHistory, $ionicLoading, KpFactory) {
            $scope.upromotion = {};
            $scope.promotion = {};
            $scope.promotions = [];
            $scope.path = {};
            $scope.upromotion.type = "dr";
            $scope.path = "http://merchant.kontactpoints.com";
            $scope.paymentoption = [
                {text: "Number of Offers", value: "no"},
                {text: "Date Range", value: "dr"},
                {text: "Both", value: "both"}

            ];
            $scope.data = {
                clientSide: 'dr'
            };

            var promotionArray = {
                "UserID": $localStorage.useid
            };

            KpFactory.viewpromotion(promotionArray).then(function (response) {
                debugger;
                $ionicLoading.show({
                   template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                   $timeout(function () {
                    $ionicLoading.hide();
                     if (response.data.status == "Success") {
                    //alert(response.data.msg);
                    for (var i = 0; i < response.data.Data.length; i++) {
                        $scope.promotions.push(response.data.Data[i])
                    }
                } else {

                    alert(response.data.msg);

                }
                $ionicSlideBoxDelegate.update();

                }, 3000);
               
            });
            $scope.openupdate = function (cid, cname, isoffer, numoffer, sdate, edate, uoffer) {
                $scope.upromotion.cid = cid;
                $scope.upromotion.isoffer = isoffer;
                $scope.upromotion.uoffer = uoffer;
                $scope.upromotion.proname = cname;
                $scope.upromotion.sdate = sdate;
                $scope.upromotion.edate = edate;
                $scope.upromotion.noof = numoffer;

                $ionicModal.fromTemplateUrl('templates/promotionmodel.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });

            }
            $scope.closeupdate = function () {
                $scope.modal.hide();
            }
            $scope.dopromotion = function () {

                debugger;
                var upromotionArray = {
                    "CampaignID": $scope.upromotion.cid,
                    "CampaignName": $scope.upromotion.proname,
                    "StartDate": ($scope.data.clientSide == 'dr' || $scope.data.clientSide == 'both') ? $scope.upromotion.sdate : new Date(),
                    "EndDate": ($scope.data.clientSide == 'dr' || $scope.data.clientSide == 'both') ? $scope.upromotion.edate : new Date(),
                    "NoOfOffer": ($scope.data.clientSide == 'no' || $scope.data.clientSide == 'both') ? $scope.upromotion.noof : 0,
                    "UsedOffer": $scope.upromotion.uoffer,
                    "IsNoOfOffer": ($scope.data.clientSide == 'no' || $scope.data.clientSide == 'both') ? false : true
                }
                KpFactory.updatepromotion(upromotionArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);

                    } else {

                        alert(response.data.msg);

                    }

                });
                $scope.modal.hide();
//                $timeout(function () {
//                    KpFactory.viewpromotion(promotionArray).then(function (response) {
//                        debugger;
//                        if (response.data.status == "Success") {
//                            //alert(response.data.msg);
//                            for (var i = 0; i < response.data.Data.length; i++) {
//                                $scope.promotions.push(response.data.Data[i])
//                            }
//                        } else {
//
//                            alert(response.data.msg);
//
//                        }
//                        $ionicSlideBoxDelegate.update();
//                    });
//
//                }, 500);
                $timeout(function () {

                    $window.location.reload();
                }, 1000)


            }


        });
        