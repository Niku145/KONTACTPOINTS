angular.module('starter.controllers', ['Kp.Factory', 'angularMoment', 'monospaced.elastic'])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            // alert($localStorage.Name);
            $scope.Photo = ($localStorage.Photo == null || $localStorage.Photo == "" || $localStorage.Photo == "undefined") ? "img/blank-profile.png" : $localStorage.Photo;
            $scope.Name = $localStorage.Name;
        })
        .controller('HomeCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            $scope.getmail = {};
           
            $scope.questions = ["What is your Nickname",
                "Where is your Native",
                "Which is your Favourite Color",
                "What is your Dream job",
                "What is the name of your favorite childhood friend"]
            $scope.range = function (min, max, step) {
                step = step || 1;
                $scope.input = [];
                for (var i = min; i <= max; i += step) {
                    $scope.input.push(i);
                }
                return $scope.input;
            };
            // Form data for the login modal
            $scope.loginData = {};
            $scope.Gender = {
                gender: 'M'
            };
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
            $scope.forgot = function () {
                debugger;
                $scope.loginData = {};
                $ionicModal.fromTemplateUrl('templates/forgotpassword.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                // $scope.modal.show();
            };
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
                        if(response.Data[0].Photo!==null){
                            $localStorage.Photo = "http://kontactpoints.com/" + response.Data[0].Photo.replace('~', '').trim();
                        }
                        else{
                            $localStorage.Photo="img/kplogo.png";
                        }
                        
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
                        $state.go("app.grid");
                    } else {

                        $ionicLoading.hide();
                        alert("Wrong Login Cradentials");
                    }
                    // console.log(response);
                });
            };
          
            $scope.doSignup = function () {
              
                    debugger;
                    var SignupArray = {
                        "UserName": $scope.loginData.username,
                        "Password": $scope.loginData.password,
                        "email": $scope.loginData.username,
                        "FirstName": $scope.loginData.fname,
                        "LastName": $scope.loginData.lname,
                        "gender": $scope.Gender.gender,
                        "Pin": $scope.loginData.pin,
                        "birth": $scope.loginData.yob,
                        "Zipcode": $scope.loginData.postcode,
                        "MemorableWords": $scope.loginData.sq,
                        "HintWords": $scope.loginData.ans

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
            $scope.getpassword = function () {

                var passwordArray = {
                    UserName: $scope.getmail.mailid

                }
                KpFactory.forgotpassword(passwordArray).then(function (response) {

                    debugger;
                    if (response.data.status = "Ok") {
                        alert(response.data.msg);
                        $scope.closeLogin();
                    } else {

                        alert(response.data.msg);
                    }

                });
            }


        })
        .controller('MyProfileCtrl', function (KpFactory, $cordovaCamera, $ionicPopover, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            $scope.show = 0;
            $scope.f1 = 0;
            $scope.f2 = 0;
            $scope.f3 = 0;
            $scope.pshow = 0;
            $scope.p1 = 0;
            $scope.p2 = 0;
            $scope.p3 = 0;
            $scope.ProfileData = {};
            $scope.pin = {};
            $scope.password = {}
            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };
            $scope.openPassword = function ($event) {
                $scope.popover1.show($event);
            };
            $scope.oldchng = function () {
                debugger;
                if ($scope.pin.old == "") {
                    $scope.f1 = 0;
                } else {
                    $scope.f1 = 1;
                }
                if ($localStorage.ProfileData[0].pin == $scope.pin.old) {
                    $scope.show = 0;
                } else {
                    $scope.show = 1;
                }
            }
            $scope.newchng = function () {
                debugger;
                if ($scope.pin.new == "") {
                    $scope.f2 = 0;
                    $scope.f3 = 0;
                } else {
                    $scope.f2 = 1;
                    $scope.f3 = 1;
                }
            }
            $scope.updatepin = function () {

                debugger;
                debugger;
                if ($scope.show == 1 || $scope.f1 == 0 || $scope.f2 == 0 || $scope.f3 == 0)
                {

                } else {
                    var pinArray = {
                        "ConsumerId": $localStorage.UserId,
                        "NewPin": $scope.pin.new
                    }
                    KpFactory.changepin(pinArray).then(function (response) {
                        debugger;
                        if (response.data.status == "Ok") {
                            alert(response.data.msg);
                        } else {
                            alert(response.data.msg);
                        }

                    });
                    $scope.pin.old = "";
                    $scope.pin.new = "";
                    $scope.popover.hide();
                }
            }
            $ionicPopover.fromTemplateUrl('my-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });
            $ionicPopover.fromTemplateUrl('changepassword.html', {
                scope: $scope
            }).then(function (popover1) {
                $scope.popover1 = popover1;
            });
            $scope.ProfileData = $localStorage.ProfileData[0];
            $scope.UpdateProfile = function () {
                alert("Profile Update Successfully");
            };
            $scope.forgot = function () {
                $scope.loginData = {};
                $ionicModal.fromTemplateUrl('getpin.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                // $scope.modal.show();
            };
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            $scope.getpin = function () {
                var pinArray = {
                    UserName: $scope.pin.mailid
                }
                KpFactory.forgotpin(pinArray).then(function (response) {
                    debugger;
                    if (response.data.status = "Ok") {
                        alert(response.data.msg);
                        $scope.closeLogin();
                    } else {
                        alert(response.data.msg);
                    }

                });
            };
            $scope.oldpass = function () {
                debugger;
                if ($scope.password.old == "") {
                    $scope.p1 = 0;
                } else {
                    $scope.p1 = 1;
                }
                if ($localStorage.ProfileData[0].Password == $scope.password.old) {
                    $scope.pshow = 0;
                } else {
                    $scope.pshow = 1;
                }
            }
            $scope.newpass = function () {
                if ($scope.password.new == "") {
                    $scope.p2 = 0;
                    $scope.p3 = 0;
                } else {
                    $scope.p2 = 1;
                    $scope.p3 = 1;
                }
            }
            $scope.updatepassword = function () {

                debugger;
                debugger;
                if ($scope.pshow == 1 || $scope.p1 == 0 || $scope.p2 == 0 || $scope.p3 == 0)
                {

                } else {

                    var passArray = {
                        "ConsumerId": $localStorage.UserId,
                        "NewPassword": $scope.password.new
                    }
                    KpFactory.changepassword(passArray).then(function (response) {
                        debugger;
                        if (response.data.status == "Ok") {
                            alert(response.data.msg);
                        } else {
                            alert(response.data.msg);
                        }

                    });
                    $scope.password.old = "";
                    $scope.password.new = "";
                    $scope.popover1.hide();
                }
            };
            $scope.takePicture = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false

                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    alert($scope.imgURI);
                }, function (err) {
                    // An error occured. Show a message to the user
                });
            };
        })
        .controller('MyStatementCtrl', function (KpFactory, ionicDatePicker, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.show = 1;
            $scope.loc = {
                cl: ''
            };
            $scope.merchantlists = {};
            $scope.transaction = [
                {text: "IN", value: "In"},
                {text: "OUT", value: "Out"},
                {text: "BOTH", value: "Both"}
            ];
            $scope.pay = {
                gift: ''
            }
            $scope.paymentoption = [
                {text: "RW", value: "Rw"},
                {text: "LW", value: "Lw"}
            ];
            $scope.statement = {};
            $scope.changefocus1 = function (pinname) {

                document.getElementById(pinname).focus();


            };
            $scope.filter = function () {
                $ionicModal.fromTemplateUrl('my-modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.gift = function () {
                debugger;
                var listArray = {
                    "cid": $localStorage.UserId
                };
                KpFactory.getMerchantlist(listArray).then(function (response) {
                    debugger;
                    if (response.data.Data != null) {
                        $scope.merchantlists = response.data.Data;
                    } else {

                    }

                });
                $ionicModal.fromTemplateUrl('gift.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.change = function (type) {
                debugger;
                if (type == "Rw") {
                    $scope.show = 0;
                    var StatementArray = {
                        "Emailid": $localStorage.Email
                    };
                    KpFactory.getStatement(StatementArray).then(function (response) {

                        $ionicLoading.hide();
                        debugger;
                        if (response.Data != null) {
                            $scope.statement.bal = response.Data[0].Consumeramountbalance;
                        } else {
                            //   alert("Wrong Login Cradentials");
                            $scope.statement.bal = "0000";
                        }
                        // console.log(response);
                    });
                } else {
                    $scope.show = 1;
                    $scope.statement.bal = "";

                }
            }
            $scope.getlw = function () {
                debugger;
                var StatementArray = {
                    "Cid": $localStorage.UserId,
                    "Mid": $scope.statement.type
                };
                KpFactory.GetLWByMerchant(StatementArray).then(function (response) {
                    $ionicLoading.hide();
                    debugger;
                    if (response.Data != null) {
                        $scope.statement.bal = response.Data[0].Points;
                    } else {
                        //   alert("Wrong Login Cradentials");
                        $scope.statement.bal = "0000";
                    }
                    // console.log(response);
                });


            }
            $scope.closeflilter = function () {
                $scope.modal.hide();
            };
            $scope.balcheck = function () {
                if (parseInt($scope.statement.gpoint) >= parseInt($scope.statement.bal)) {
                    alert("Gift point must be less then balance");
                }

            }
            $scope.sendgift = function () {
                debugger;
                var StatementArray = {
                    "Emailid": $scope.statement.username
                }
                KpFactory.getStatement(StatementArray).then(function (response) {

                    debugger;
                    if (response.Data != null) {
                        $scope.rid = response.Data[0].UserId;
                        if (parseInt($scope.statement.gpoint) <= parseInt($scope.statement.bal) && ($scope.statement.pin1 + $scope.statement.pin2 + $scope.statement.pin3 + $scope.statement.pin4 == $localStorage.ProfileData[0].pin)) {
                            if ($scope.pay.gift == "Rw") {
                                var giftArray = {
                                    "ConsumerId": $scope.rid,
                                    "ConsumerGiftAdminId": $localStorage.UserId,
                                    "GiftPoints": $scope.statement.gpoint
                                }
                                KpFactory.giftRWPoints(giftArray).then(function (response) {
                                    debugger;
                                    alert(response.msg);
                                    $scope.modal.hide();
                                });

                            } else {
                                var giftArray1 = {
                                    "LoginUserId": $localStorage.UserId,
                                    "ConsumerId": $scope.rid,
                                    "MerchantId": $scope.statement.type,
                                    "Points": $scope.statement.gpoint

                                }
                                KpFactory.giftLWPoints(giftArray1).then(function (response) {

                                    debugger;
                                    alert(response.msg);
                                    $scope.modal.hide();
                                });
                            }

                        } else {
                            if ($scope.statement.pin1 + $scope.statement.pin2 + $scope.statement.pin3 + $scope.statement.pin4 == $localStorage.ProfileData[0].pin) {
                                alert("entered wrong pin");
                            }


                        }
                    }
                });
                debugger;



            }
            $scope.clear = function () {
                debugger;
                $scope.statement.bal = "";
                $scope.statement.gpoint = "";
                $scope.statement.type = '';
                $scope.statement.username = "";
                $scope.statement.pin1 = "";
                $scope.statement.pin2 = "";
                $scope.statement.pin3 = "";
                $scope.statement.pin4 = "";
                $scope.pay = {
                    gift: ''
                }

            }

            $ionicLoading.show({
                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
            });
            var StatementArray = {
                "Uid": $localStorage.UserId,
                "FormDate": '',
                "Todate": '',
                "Type": "Both"
            };
            KpFactory.getStatementDetail(StatementArray).then(function (response) {

                $ionicLoading.hide();
                debugger;
                if (response.Data != null) {

                    $scope.StatementsList = {};
                    $scope.StatementsList = response.Data;
                } else {

                }

            });
            $scope.search = function () {
                debugger;
                var StatementArray1 = {
                    "Uid": $localStorage.UserId,
                    "FormDate": $scope.statement.from == null ? '' : $scope.statement.from.getFullYear() + "/" + ($scope.statement.from.getMonth() + 1) + "/" + $scope.statement.from.getDate(),
                    "Todate": $scope.statement.to == null ? '' : $scope.statement.to.getFullYear() + "/" + ($scope.statement.to.getMonth() + 1) + "/" + $scope.statement.to.getDate(),
                    "Type": $scope.loc.cl
                };
                KpFactory.getStatementDetail(StatementArray1).then(function (response) {

                    $scope.modal.hide();
                    debugger;
                    if (response.Data != null) {

                        $scope.StatementsList = {};
                        $scope.StatementsList = response.Data;
                    } else {

                    }

                });

            }
        })
        .controller('MyCardCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            $scope.ProfileData = {};
            $scope.ProfileData = $localStorage.ProfileData[0];
        }).directive('flipContainer', function () {
    return {
        restrict: 'C',
        link: function ($scope, $elem, $attrs) {
            $scope.flip = function () {
                $elem.toggleClass('flip');
            }
        }
    };
})
        .controller('DashbordCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.Name = $localStorage.Name;
            $ionicLoading.show({
                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
            });
            var StatementArray = {
                "Emailid": $localStorage.Email
            };
            $scope.LoginData = {};
            KpFactory.getStatement(StatementArray).then(function (response) {

                $ionicLoading.hide();
                debugger;
                if (response.Data != null) {

                    $scope.PointBalance = response.Data[0].Consumeramountbalance;
                } else {

                    //   alert("Wrong Login Cradentials");
                    $scope.PointBalance = "0000";
                }
                // console.log(response);
            });
            //   alert("Your Location Near :"+ $localStorage.lat+","+$localStorage.long);
            $scope.change = function () {
                $state.go("app.changeup");
            }
            $scope.gift = function () {
                $state.go("app.gift");
            }
            $scope.id = function () {
                $state.go("app.changeup");
            }
            $scope.bonus = function () {
                $state.go("app.mybonus");
            }
            $scope.statement = function () {
                $state.go("app.mystatement");
            }



        })
        .controller('MyContactCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {


//$scope.UserId = $localStorage.UserId;
            $ionicLoading.show({
                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
            });
            var MyContactArray = {
                "Uid": $localStorage.UserId
            };
            $scope.MyContactData = {};
            KpFactory.getContact(MyContactArray).then(function (response) {
                $ionicLoading.hide();
                console.log("ok");
                if (response.data != null) {

                    $scope.MyContactData = response.data.Data;
                    console.log(JSON.stringify($scope.MyContactData));
                }
            });
            $scope.redirectMyCard = function () {
                $state.go("app.mycard");
            };
        })
        .controller('MyMessageCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {

            //for Checkbox Events
            $scope.MyContactData = {};
            $scope.choice = {};
            $scope.choice = {
                isChecked1: true,
                isChecked2: false,
            };
            $scope.uncheckTheOtherOne1 = function () {
                $scope.Message = "";
                $scope.choice = {
                    isChecked1: true,
                    isChecked2: false,
                };
                GetMessage("In");
            };
            $scope.uncheckTheOtherOne2 = function () {
                $scope.Message = "";
                $scope.choice = {
                    isChecked1: false,
                    isChecked2: true,
                };
                GetMessage("Out");
            };
            // for getMessage
            $scope.MyMessageData = {};
            $scope.Message = "";
            function GetMessage(type)
            {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                var MyMessageArray = {
                    "groupid": $localStorage.UserId,
                    "status": type
                };
                KpFactory.MyMessage(MyMessageArray).then(function (response) {
                    $ionicLoading.hide();
                    if (response.data.Data != null) {
                        $scope.MyMessageData = response.data.Data;
                    } else
                    {
                        $scope.Message = "No Message Available.";
                        $scope.MyMessageData = null;
                    }
                });
            }
            GetMessage("In");
            $scope.redirectMessageDetail = function (image, email, message) {
                $localStorage.msgimage = image;
                $localStorage.msgemail = email;
                $localStorage.msgMessage = message;
                $state.go("app.messagedetail");
            };
        })
        .controller('ComposeMessageCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.checkboxModel = {};
            $scope.GroupData = {};
            $scope.MemberData = [];
            $scope.selection = [];
            var flagstatus = "0";
            $scope.choice = {};
            $scope.uncheckTheOtherOne1 = function () {

                $scope.choice = {
                    isChecked1: true,
                    isChecked2: false,
                    isChecked3: false
                };
                flagstatus = "1";
            };
            $scope.uncheckTheOtherOne2 = function () {
                $scope.choice = {
                    isChecked1: false,
                    isChecked2: true,
                    isChecked3: false
                };
                flagstatus = "2";
            };
            $scope.uncheckTheOtherOne3 = function () {
                $scope.choice = {
                    isChecked1: false,
                    isChecked2: false,
                    isChecked3: true
                };
                flagstatus = "3";
                //Open UserPopup

                $ionicModal.fromTemplateUrl('templates/groupmemberpopup.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.MessageData = {};
            $scope.MessageData.Messagetext = $localStorage.RebroadcastmsgMessage;
            $localStorage.RebroadcastmsgMessage = "";
            //For User Select================

            $scope.toggleSelection = function toggleSelection(item) {
                debugger;
                var idx = $scope.selection.indexOf(item);
                // is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selection.push(item);
                }
            };
            function GetUser()
            {
                var MyContactArray = {
                    "Uid": $localStorage.UserId
                };
                KpFactory.getContact(MyContactArray).then(function (response) {
                    $ionicLoading.hide();
                    if (response.data != null) {
                        $scope.MyContactData = response.data.Data;
                        angular.forEach($scope.MyContactData, function (data) {
                            $scope.MemberData.push(data.email);
                        });
                    }
                });
            }

            GetUser();
            $scope.closeSubmit = function () {
                $scope.modal.hide();
            };
            $scope.doSubmit = function () {
                $scope.modal.hide();
            };
            //===============================


            //Send Message===================
            $scope.SendMessage = function () {


                if (flagstatus != "0")
                {
                    $ionicLoading.show({
                        template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                    });
                    if (flagstatus == "3")//for User
                    {
                        $scope.ttl = $scope.selection.length;
                        for (var i = 0; i < $scope.selection.length; i++) {
                            //  alert($scope.selection[i]);
                            $scope.i = i;
                            var ComposeMsgArray = {
                                "userid": $localStorage.UserId,
                                "Email": $scope.selection[i],
                                "description": $scope.MessageData.Messagetext
                            };
                            KpFactory.ComposeMessage(ComposeMsgArray).then(function (response) {

                                $scope.ttl = parseInt($scope.ttl) - 1;
                                if (parseInt($scope.ttl) == 0)
                                {
                                    $ionicLoading.hide();
                                    alert("Message Send Successfully.")
                                    flagstatus = "0";
                                    $scope.choice = {
                                        isChecked1: false,
                                        isChecked2: false,
                                        isChecked3: false
                                    };
                                    $scope.MessageData.Messagetext = "";
                                }


                            });
                        }
                    }
                    if (flagstatus == "2")//for All
                    {
                        // alert("ok");
                        $scope.ttl = $scope.MyContactData.length;
                        angular.forEach($scope.MyContactData, function (data) {
                            //$scope.MemberData.push(data.email);                         
                            // alert(data.email);
                            var ComposeMsgArray = {
                                "userid": $localStorage.UserId,
                                "Email": data.email,
                                "description": $scope.MessageData.Messagetext
                            };
                            KpFactory.ComposeMessage(ComposeMsgArray).then(function (response) {
                                $scope.ttl = parseInt($scope.ttl) - 1;
                                if (parseInt($scope.ttl) == 0)
                                {
                                    $ionicLoading.hide();
                                    alert("Message Send Successfully.")
                                    flagstatus = "0";
                                    $scope.choice = {
                                        isChecked1: false,
                                        isChecked2: false,
                                        isChecked3: false
                                    };
                                    $scope.MessageData.Messagetext = "";
                                }

                            });
                        });
                    }
                    if (flagstatus == "1")//for Group
                    {
                        alert("Message Send Successfully.")
                        $ionicLoading.hide();
                        flagstatus = "0";
                        $scope.choice = {
                            isChecked1: false,
                            isChecked2: false,
                            isChecked3: false
                        };
                        $scope.MessageData.Messagetext = "";
                    }

                } else
                {
                    alert("Pls Select Any Option..");
                }

            };
            //===============================

        })
        .controller('CreateGroupCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {

            $scope.checkboxModel = {};
            $scope.GroupData = {};
            $scope.MemberData = [];
            $scope.selection = [];
            $ionicLoading.show({
                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
            });
            var MyGroupListArray = {
                "userid": $localStorage.UserId
            };
            $scope.MyGroupData = {};
            function GetGroupData()
            {
                KpFactory.GetGroup(MyGroupListArray).then(function (response) {
                    if (response.data != null) {
                        $scope.MyGroupData = response.data.Data;
                    }
                });
            }

            GetGroupData();
            var MyContactArray = {
                "Uid": $localStorage.UserId
            };
            $scope.MyContactData = {};
            KpFactory.getContact(MyContactArray).then(function (response) {
                $ionicLoading.hide();
                if (response.data != null) {
                    $scope.MyContactData = response.data.Data;
                    angular.forEach($scope.MyContactData, function (data) {
                        $scope.MemberData.push(data.email);
                    });
                }
            });
            $scope.toggleSelection = function toggleSelection(item) {
                debugger;
                var idx = $scope.selection.indexOf(item);
                // is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selection.push(item);
                }
            };
            $scope.OpenModel = function () {

                $ionicModal.fromTemplateUrl('templates/groupmemberpopup.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.closeSubmit = function () {
                $scope.modal.hide();
            };
            $scope.doSubmit = function () {
                $scope.modal.hide();
            };
            $scope.doFinalSubmit = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                var GroupUserIds = "";
                for (var i = 0; i < $scope.selection.length; i++) {

                    if (GroupUserIds == "")
                    {
                        GroupUserIds = $scope.selection[i];
                    } else
                    {
                        GroupUserIds = GroupUserIds + ";" + $scope.selection[i];
                    }
                    //  alert(GroupUserIds);

                }

                var MyGroupArray = {
                    "userid": $localStorage.UserId,
                    "groupname": $scope.GroupData.GroupName,
                    "description": $scope.GroupData.Description,
                    "GroupUserIds": GroupUserIds
                };
                KpFactory.GroupCreation(MyGroupArray).then(function (response) {
                    alert("Group Created Successfully.");
                    $scope.GroupData.GroupName = "";
                    $scope.GroupData.Description = "";
                    $ionicLoading.hide();
                });
                GetGroupData();
            };
        })
        .controller('MessageDetailCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {

            $scope.MessageData = {};
            $localStorage.RebroadcastmsgMessage = "";
            $scope.MessageData.msgimage = $localStorage.msgimage;
            $scope.MessageData.msgemail = $localStorage.msgemail;
            $scope.MessageData.msgMessage = $localStorage.msgMessage;
            // alert($localStorage.msgimage);

            $scope.redirectMyMessage = function () {
                $localStorage.RebroadcastmsgMessage = $scope.MessageData.msgMessage;
                $state.go("app.composemessage");
            };
        })
        .controller('MyCircleCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {


        })
        .controller('MyInviteCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {


        })
        .controller('inshopCtrl', function (KpFactory, $scope, $cordovaGeolocation, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            debugger;
            $scope.show = 1;
            $scope.show1 = 0;
            $scope.cat = 0;
            $scope.loc = {
                cl: ''
            };
            $scope.paymentoption = [
                {text: "Current", value: "CURRENT"},
                {text: "Other", value: "OTHER"}
            ];
            $scope.subcategory = {};
            $scope.subcat = 1;
            $scope.inshop = {};
            var address;
            geocoder = new google.maps.Geocoder();
            $scope.showsub = function () {
                debugger;
                $scope.subcategories = [];
                $scope.cat = 1;
                var subcatArray = {
                    "CategoryName": $scope.inshop.cat
                }
                KpFactory.getSubcategory(subcatArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        for (var i = 0; i < response.data.Data.length; i++) {
                            $scope.subcategories.push(response.data.Data[i])
                        }
                    } else {

                        alert(response.data.msg);
                    }

                });
            }
            $scope.showrest = function () {
                debugger;
                $scope.subcat = 1;
            }
            $scope.latlng = function () {
                debugger;
                $scope.show = 0;
                $scope.show1 = 1;
                address = $scope.inshop.loc;
                if (geocoder) {
                    debugger;
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            debugger;
                            $scope.inshop.lat = results[0].geometry.location.lat();
                            $scope.inshop.lng = results[0].geometry.location.lng();
                            $localStorage.lat = $scope.inshop.lat;
                            $localStorage.lng = $scope.inshop.lng;
                        }
                    });
                }
            }
            $scope.location = function (location) {
                debugger;
                if (location == "CURRENT")
                {
                    $scope.iwt.loc = $scope.locatehelp;
                    document.getElementById('loctype').focus();
                } else {
                    $scope.iwt.loc = "";
                }
            }
            $scope.grid = function () {
                debugger;
                $localStorage.address = $scope.inshop.loc;
//
//                if (geocoder) {
//                    debugger;
//                    geocoder.geocode({
//                        'address': address
//                    }, function (results, status) {
//                        if (status == google.maps.GeocoderStatus.OK) {
//                            debugger;
//                            $scope.inshop.lat = results[0].geometry.location.lat();
//                            $scope.inshop.lng = results[0].geometry.location.lng();
//                            $localStorage.lat = $scope.inshop.lat;
//                            $localStorage.lng = $scope.inshop.lng;
//                        }
//                    });
//                }

                $localStorage.cat = $scope.inshop.cat;
                $localStorage.subcat = $scope.inshop.subcat;
//                $localStorage.lat = $scope.inshop.lat;
//                $localStorage.lng = $scope.inshop.lng;
                $localStorage.radius = $scope.inshop.radius;
                $state.go("app.grid");
            }


            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        debugger;
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        debugger;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//alert("Else loop" + latlng);
                        geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            //alert("Else loop1");
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    debugger;
                                    var add = results[0].formatted_address;
                                    var value = add.split(",");
                                    count = value.length;
                                    var state = value[count - 2];
                                    stcount = state.length;
                                    var stat = state.slice(stcount - 6, stcount);
                                    var city = value[count - 2];
                                    $scope.locatehelp = stat;
                                    //   alert("Full address is: " + add);
                                } else {
                                    alert("address not found");
                                }
                            } else {
                                //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                                alert("Geocoder failed due to: " + status);
                            }
                        });
                    }, function (err) {
                        // error
                    });
            $scope.getlocation = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.inshop.loc = $scope.locatehelp;
                }, 1000)

            }
            $scope.previous = function () {
                $scope.show = 1;
                $scope.show1 = 0;
            }
        })
        .controller('subcatCtrl', function (KpFactory, $cordovaGeolocation, $scope, $ionicModal, $stateParams, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            debugger;
            $scope.inquiry1 = {};
            $scope.show = 1;
            $scope.show1 = 0;
            $scope.subcat = {};
            var address;
            geocoder = new google.maps.Geocoder();
            $scope.step2 = function () {
                debugger;
                $scope.show = 0;
                $scope.show1 = 1;
                address = $scope.inquiry1.loc;
                if (geocoder) {
                    debugger;
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            debugger;
                            $scope.inquiry1.lat = results[0].geometry.location.lat();
                            $scope.inquiry1.lng = results[0].geometry.location.lng();
                            $localStorage.lat = $scope.inquiry1.lat;
                            $localStorage.lng = $scope.inquiry1.lng;
                        }
                    });
                }

            }
            $scope.grid = function () {
                $scope.modal.hide();
                debugger;
                var subcatArray = {
                    "Cat": $stateParams.catName,
                    "subcat": $scope.subcat.name,
                    "lat": $scope.inquiry1.lat,
                    "lng": $scope.inquiry1.lng,
                    "Radius": $scope.inquiry1.radius
                }
                $state.go("app.grid");
            }


            $scope.inquiry = function (i) {
                $scope.subcat.name = i;
                $ionicModal.fromTemplateUrl('templates/inquiry.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            $scope.closeLogin = function () {
                $scope.inquiry1.loc = "";
                $scope.show = 1;
                $scope.show1 = 0;
                $scope.modal.hide();
            };
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        debugger;
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        debugger;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//alert("Else loop" + latlng);
                        geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            //alert("Else loop1");
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    debugger;
                                    var add = results[0].formatted_address;
                                    var value = add.split(",");
                                    count = value.length;
                                    var state = value[count - 2];
                                    stcount = state.length;
                                    var stat = state.slice(stcount - 6, stcount);
                                    var city = value[count - 2];
                                    $scope.locatehelp = stat;
                                    //   alert("Full address is: " + add);
                                } else {
                                    alert("address not found");
                                }
                            } else {
                                //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                                alert("Geocoder failed due to: " + status);
                            }
                        });
                    }, function (err) {
                        // error
                    });
            $scope.getlocation = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.inquiry1.loc = $scope.locatehelp;
                }, 1000)

            }
            $scope.previous = function () {
                $scope.show = 1;
                $scope.show1 = 0;
            }



        })
        .controller('gridCtrl', function (KpFactory, $cordovaGeolocation, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        debugger;
                        $scope.lat = position.coords.latitude;
                        $scope.long = position.coords.longitude;
                        debugger;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//alert("Else loop" + latlng);
                        geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            //alert("Else loop1");
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    debugger;
                                    var add = results[0].formatted_address;
                                    var value = add.split(",");
                                    count = value.length;
                                    var state = value[count - 2];
                                    stcount = state.length;
                                    var stat = state.slice(stcount - 6, stcount);
                                    var city = value[count - 2];
                                    $scope.locatehelp = stat;
                                    //   alert("Full address is: " + add);
                                } else {
                                    alert("address not found");
                                }
                            } else {
                                //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                                alert("Geocoder failed due to: " + status);
                            }
                        });
                    }, function (err) {
                        // error
                    });
            $scope.promotions = {};
            $scope.inshop = {};
            $scope.loc = {
                cl: ''
            };
            $scope.paymentoption = [
                {text: "Current", value: "CURRENT"},
                {text: "Other", value: "OTHER"}
            ];
            $scope.grid = {};
            $scope.location = function (location) {
                debugger;
                if (location == "CURRENT")
                {
                    $scope.inshop.loc = $scope.locatehelp;
                    document.getElementById('loctype').focus();
                } else {
                    $scope.inshop.loc = "";
                }
            }

            var address;
            geocoder = new google.maps.Geocoder();
            address = $scope.locatehelp;
            if (geocoder) {
                debugger;
                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        debugger;
                        $scope.grid.lat = results[0].geometry.location.lat();
                        $scope.grid.lng = results[0].geometry.location.lng();
                        $localStorage.lat = $scope.grid.lat;
                        $localStorage.lng = $scope.grid.lng;
                        alert($scope.grid.lat + "," + $scope.grid.lng);
                    }
                });
            }

            debugger;
            var gridArray = {
                "CountryName": "UK",
                "Keywords": "ALL",
                "MerchantType": "Both",
                "latitude": $scope.grid.lat,
                "longitude": $scope.grid.lng,
                "StartIndex": "1",
                "StopIndex": "100",
                "ConsumerId": $localStorage.UserId
            }
            KpFactory.getpromotion(gridArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {

                    $scope.promotions = response.data.Data;

                } else {

                    alert(response.data.msg);
                }

            });
//            $scope.$on('$ionicView.beforeEnter', function () {
//                screen.lockOrientation('landscape');
//            });
            $scope.test = function () {
                $state.go("app.promotion");
            }
            $scope.filter = function () {
                $ionicModal.fromTemplateUrl('templates/inshop.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.closeflilter = function () {

                $scope.modal.hide();
            };
            $scope.grid = function () {
                $scope.modal.hide();
                debugger;
                var gridArray = {
                    "CountryName": "UK",
                    "Keywords": $scope.inshop.keyword,
                    "MerchantType": $scope.inshop.type,
                    "latitude": $scope.grid.lat,
                    "longitude": $scope.grid.lng,
                    "StartIndex": "1",
                    "StopIndex": "100",
                    "ConsumerId": $localStorage.UserId
                }
                KpFactory.getpromotion(gridArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {

                        $scope.promotions = response.data.Data;

                    } else {

                        $scope.promotions = "";
                    }

                });
            }

        })
        .controller('promotionCtrl', function (KpFactory, $ionicPopover, $cordovaSocialSharing, $interval, $scope, $cordovaInAppBrowser, $stateParams, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            debugger;
            $scope.clstar1 = "ion-android-star-outline";
            $scope.clstar2 = "ion-android-star-outline";
            $scope.clstar3 = "ion-android-star-outline";
            $scope.rate = 0;
            $scope.promtion = KpFactory.getpostjob($stateParams.pid);
            $localStorage.MerchantInfoID = $scope.promtion.UserInfoID;
            $localStorage.MerchantUserId = $scope.promtion.userid;
            $localStorage.CampaignID = $scope.promtion.CampaignID;
            $localStorage.BusinessName = $scope.promtion.BusinessName;
            $localStorage.mlat = $scope.promtion.Latitude;
            $localStorage.mlng = $scope.promtion.Longitude;
            var getloginArray = {
                PromotionId: $localStorage.CampaignID,
                MerchantId: $localStorage.MerchantUserId,
                ConsumerId: $localStorage.UserId,
                City: "amd",
                Lattitude: $localStorage.lat,
                Longitude: $localStorage.long
            }
            debugger;
//            var mercahntArray = {
//                MerchantUserId: $scope.promtion.userid,
//                MerchantInfoId: $scope.promtion.UserInfoID
//            }
//             var mercahntArray = {
//                MerchantUserId: "10",
//                MerchantInfoId: "42"
//            }
            var timeArray = {
                "Uid": "42"
//                        $scope.promtion.userid
            }
//            KpFactory.getRate(mercahntArray).then(function (response) {
//                debugger;
//                if (response.data.status == "Success") {
//                    $scope.ratedata = response.data.Data[0];
//                    if ($scope.ratedata.IsKpPoints !== 0) {
//                        if ($scope.ratedata.PromotionCount !== 0)
//                        {
//                            if ($scope.ratedata.Loyalty !== 0) {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star";
//                                $scope.clstar3 = "ion-android-star";
//                            } else {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            }
//
//                        } else {
//                            if ($scope.ratedata.Loyalty !== 0) {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            } else {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star-outline";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            }
//                        }
//                    } else {
//                        if ($scope.ratedata.PromotionCount !== 0)
//                        {
//                            if ($scope.ratedata.Loyalty !== 0) {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            } else {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star-outline";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            }
//
//                        } else {
//                            if ($scope.ratedata.Loyalty !== 0) {
//                                $scope.clstar1 = "ion-android-star";
//                                $scope.clstar2 = "ion-android-star-outline";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            } else {
//                                $scope.clstar1 = "ion-android-star-outline";
//                                $scope.clstar2 = "ion-android-star-outline";
//                                $scope.clstar3 = "ion-android-star-outline";
//                            }
//                        }
//                    }
//                } else {
//
//                    alert(response.data.msg);
//                }
//
//            });
            setInterval(function () {
                debugger;
                if ($ionicHistory.currentStateName() == 'app.promotion') {
                    debugger;
                    KpFactory.loginStatus(getloginArray).then(function (response) {
                        debugger;
                        if (response.data.status == "Ok") {
                            alert(response.data.msg);
                        } else {

                            alert(response.data.msg);
                        }

                    });
                }
            }, 500000);
            KpFactory.getStoretime(timeArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {
                    $scope.mon = response.data.Data[0].Monday;
                    $scope.tue = response.data.Data[0].Tuesday;
                    $scope.wed = response.data.Data[0].Wednesday;
                    $scope.thu = response.data.Data[0].Thursday;
                    $scope.fri = response.data.Data[0].friday;
                    $scope.sat = response.data.Data[0].Saturday;
                    $scope.sun = response.data.Data[0].Sunday;
                } else {

                    alert(response.data.msg);
                }

            });
            $scope.timetable = function () {
                $ionicModal.fromTemplateUrl('templates/timetable.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            $scope.address = function () {
                $ionicModal.fromTemplateUrl('templates/address.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            $scope.closetable = function () {
                $scope.modal.hide();
            }
            var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'no'
            };
            $scope.map = function () {
                debugger;
                var url = "https://www.google.com/maps/dir/" + $scope.promtion.Latitude + "," + $scope.promtion.Longitude + "/" + $localStorage.lat + "," + $localStorage.lng
                $cordovaInAppBrowser.open(url, '_blank', options)
                        .then(function (event) {
                            // success
                        })
                        .catch(function (event) {
                            // error
                        });


            }
            $scope.direction = function () {
                $state.go("app.gmap");
            }
            $scope.chat = function () {
                $state.go("app.chat");
            }
            $scope.shortform = function (str) {
                var sname = '';
                for (var i = 0; i < str.split(" ").length; i++) {
                    sname += ((str.split(" ")[i]).charAt(0)).toUpperCase();
                }
                return sname;
            }
            if ($scope.promtion.StartDate == $scope.promtion.EndDate) {
                $scope.offer = parseInt($scope.promtion.NoOfOffer) - parseInt($scope.promtion.UsedOffer);
                $scope.offer1 = ($scope.offer < 100 ? ($scope.offer < 10 ? "00" : "0") : "") + $scope.offer.toString();
                $scope.img1 = $scope.offer1.toString().charAt(0);
                $scope.img2 = $scope.offer1.toString().charAt(1);
                $scope.img3 = $scope.offer1.toString().charAt(2);

            }
            $scope.future = new Date($scope.promtion.EndDate);
            if ($scope.promtion.StartDate !== $scope.promtion.EndDate) {
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
        .controller('gmapCtrl', function (KpFactory, $cordovaGeolocation, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            debugger;
            var mapProp = {
                center: new google.maps.LatLng(51.52158, -0.095358),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googlemap"), mapProp);
//                var marker = new google.maps.Marker({
//                    position: new google.maps.LatLng(23.03, 72.40),
//                    map: map,
//                    title: 'source'
//                });
//                var marker1 = new google.maps.Marker({
//                    position: new google.maps.LatLng($localStorage.lat, $localStorage.lng),
//                    map: map,
//                    title: 'destination'
//                });
            var service = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            var poly = new google.maps.Polyline({map: map, strokeColor: '#FF0000'});
            service.route({
                origin: new google.maps.LatLng($localStorage.mlat, $localStorage.mlng),
                destination: new google.maps.LatLng($localStorage.lat, $localStorage.lng),
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (response, status) {
                debugger;
                if (status == google.maps.DirectionsStatus.OK) {

                    // poly.setPath(result.routes[0].overview_path)
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
            //setMarkers(map, $localStorage.cities);




        })
        .controller('changeupCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            $scope.u = 0;
            $scope.p = 0;
            debugger;
            $scope.ProfileData = $localStorage.ProfileData[0];
            $scope.imguri = "http://services.kontactpoints.com/Images/Qrcode/" + $scope.ProfileData.userName + ".jpg";
            $scope.userid = function () {
                $scope.u = 1;
                $scope.p = 0;
            }
            $scope.postcode = function () {
                $scope.u = 0;
                $scope.p = 1;
            }

        })
        .controller('UserMessagesCtrl', function ($scope, $ionicScrollDelegate, $ionicHistory, $localStorage, $rootScope, $state, $stateParams, KpFactory, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {
            debugger;
            // mock acquiring data via $stateParams
            $scope.toUser = $localStorage.BusinessName;
            $scope.UserId = $localStorage.UserId;
            // this could be on $rootScope rather than in $stateParams
            $scope.user = {
                _id: '534b8fb2aa5e7afc1b23e69c',
                pic: 'img/blank-profile.png',
                username: 'Marty'
            };
            $scope.messages = [];
            $scope.input = {};
            var messageCheckTimer;
            var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
            var footerBar; // gets set in $ionicView.enter
            var scroller;
            var txtInput; // ^^^
            $scope.sendMessage = function () {
                debugger;
                var messageArray = {
                    FromUSerid: $localStorage.UserId,
                    ToUserID: $localStorage.MerchantInfoID,
                    Message: $scope.input.message,
                    Username: $localStorage.Name

                }
                KpFactory.InsertMessage(messageArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Ok") {
                        alert(response.data.msg);
                    } else {

                        alert(response.data.msg);
                    }

                });
                $scope.input.message = "";
            }
            var getMsgArray = {
                PromotionId: $localStorage.CampaignID,
                FromUSerid: $localStorage.UserId,
                ToUserID: $localStorage.MerchantInfoID,
                City: "amd",
                Lattitude: "",
                Longitude:""
            }


            setInterval(function () {

                debugger;
                if ($ionicHistory.currentView().stateName == "app.chat")
                {
                    KpFactory.getMessage(getMsgArray).then(function (response) {
                        debugger;
                        $scope.messages = [];
                        if (response.data.status == "Ok") {
//                            alert(response.data.msg);
                            for (var i = 0; i < response.data.Data.length; i++) {
                                $scope.messages.push(response.data.Data[i]);
                            }
                            debugger;
                            $ionicScrollDelegate.scrollBottom();
                        } else {
//                            alert(response.data.msg);
                        }

                    });
                }

            }, 5000);
//            $scope.$on('$ionicView.enter', function () {
//                console.log('UserMessages $ionicView.enter');
//
//                getMessages();
//
//                $timeout(function () {
//                    footerBar = document.body.querySelector('#userMessagesView .bar-footer');
//                    scroller = document.body.querySelector('#userMessagesView .scroll-content');
//                    txtInput = angular.element(footerBar.querySelector('textarea'));
//                }, 0);
//
//                messageCheckTimer = $interval(function () {
//                    // here you could check for new messages if your app doesn't use push notifications or user disabled them
//                }, 20000);
//            });

//            $scope.$on('$ionicView.leave', function () {
//                console.log('leaving UserMessages view, destroying interval');
//                // Make sure that the interval is destroyed
//                if (angular.isDefined(messageCheckTimer)) {
//                    $interval.cancel(messageCheckTimer);
//                    messageCheckTimer = undefined;
//                }
//            });
//
//            $scope.$on('$ionicView.beforeLeave', function () {
//                if (!$scope.input.message || $scope.input.message === '') {
//                    $localStorage.removeItem('userMessage-' + $scope.toUser._id);
//                }
//            });

//            function getMessages() {
//                // the service is mock but you would probably pass the toUser's GUID here
//                KpFactory.getUserMessages({
//                    toUserId: $scope.toUser._id
//                }).then(function (data) {
//                    $scope.doneLoading = true;
//                    $scope.messages = data.messages;
//
//                    $timeout(function () {
//                        viewScroll.scrollBottom();
//                    }, 0);
//                });
//            }

//            $scope.$watch('input.message', function (newValue, oldValue) {
//                console.log('input.message $watch, newValue ' + newValue);
//                if (!newValue)
//                    newValue = '';
//                localStorage['userMessage-' + $scope.toUser._id] = newValue;
//            });


//            $scope.sendMessage = function (sendMessageForm) {
//                var message = {
//                    toId: $scope.toUser._id,
//                    text: $scope.input.message
//                };
//
//                // if you do a web service call this will be needed as well as before the viewScroll calls
//                // you can't see the effect of this in the browser it needs to be used on a real device
//                // for some reason the one time blur event is not firing in the browser but does on devices
//                keepKeyboardOpen();
//
//                //MockService.sendMessage(message).then(function(data) {
//                $scope.input.message = '';
//
//                message._id = new Date().getTime(); // :~)
//                message.date = new Date();
//                message.username = $scope.user.username;
//                message.userId = $scope.user._id;
//                message.pic = $scope.user.picture;
//
//                $scope.messages.push(message);
//
//                $timeout(function () {
//                    keepKeyboardOpen();
//                    viewScroll.scrollBottom(true);
//                }, 0);
//
////                $timeout(function () {
////                    $scope.messages.push(KpFactory.getMockMessage());
////                    keepKeyboardOpen();
////                    viewScroll.scrollBottom(true);
////                }, 2000);
//
//                //});
//            };

            // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
            function keepKeyboardOpen() {
                console.log('keepKeyboardOpen');
                txtInput.one('blur', function () {
                    console.log('textarea blur, focus back on it');
                    txtInput[0].focus();
                });
            }

            $scope.onMessageHold = function (e, itemIndex, message) {
                console.log('onMessageHold');
                console.log('message: ' + JSON.stringify(message, null, 2));
                $ionicActionSheet.show({
                    buttons: [{
                            text: 'Copy Text'
                        }, {
                            text: 'Delete Message'
                        }],
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0: // Copy Text
                                //cordova.plugins.clipboard.copy(message.text);

                                break;
                            case 1: // Delete
                                // no server side secrets here :~)
                                $scope.messages.splice(itemIndex, 1);
                                $timeout(function () {
                                    viewScroll.resize();
                                }, 0);
                                break;
                        }

                        return true;
                    }
                });
            };
            // this prob seems weird here but I have reasons for this in my app, secret!
            $scope.viewProfile = function (msg) {
                if (msg.userId === $scope.user._id) {
                    // go to your profile
                } else {
                    // go to other users profile
                }
            };
            // I emit this event from the monospaced.elastic directive, read line 480
            $scope.$on('taResize', function (e, ta) {
                console.log('taResize');
                if (!ta)
                    return;
                var taHeight = ta[0].offsetHeight;
                console.log('taHeight: ' + taHeight);
                if (!footerBar)
                    return;
                var newFooterHeight = taHeight + 10;
                newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
                footerBar.style.height = newFooterHeight + 'px';
                scroller.style.bottom = newFooterHeight + 'px';
            });
        })
        .controller('mybonusCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            debugger;
            $ionicLoading.show({
                template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
            });
            $scope.loc = {
                cl: ''
            };
            $scope.paymentoption = [
                {text: "INSHOP", value: "Inshop"},
                {text: "ONLINE", value: "Online"},
                {text: "BOTH", value: "Both"}
            ];
            $scope.bonusstmts = {};
            $scope.filter = function () {
                $ionicModal.fromTemplateUrl('my-modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };

            $scope.closeflilter = function () {

                $scope.modal.hide();
            };
            var bonusArray = {
                "Uid": $localStorage.UserId,
                "Type": "Both"
            }
            KpFactory.getconsumerbonus(bonusArray).then(function (response) {
                $ionicLoading.hide();
                debugger;
                if (response.data.status == "Success") {
                    $scope.bonusstmts = response.data.Data;
                } else {

                    alert(response.data.msg);
                }

            });
            $scope.search = function () {
                debugger;
                var bonusArray = {
                    "Uid": $localStorage.UserId,
                    "Type": $scope.loc.cl
                }
                KpFactory.getconsumerbonus(bonusArray).then(function (response) {
                    $ionicLoading.hide();
                    debugger;
                    if (response.data.status == "Success") {

                        $scope.bonusstmts = response.data.Data;

                    } else {

                        alert(response.data.msg);
                    }

                });
                $scope.modal.hide();

            }

        })
        .controller('giftCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
            $scope.v = 0;
            $scope.i = 0;
            $scope.gift = {};
            $scope.verify = function () {
                var receiverArray = {
                    "Emailid": $scope.gift.id
                }
                KpFactory.verifyconsumer(receiverArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                        $scope.statement = response.data.Data[0];
                        $scope.v = 1;
                        $scope.i = 0;
                    } else {

                        alert(response.data.msg);
                        $scope.i = 1;
                        $scope.v = 0;
                    }

                });
            }
            $scope.sendgift = function () {
                debugger;
                var giftArray = {
                    "ConsumerId": $scope.statement.UserId,
                    "ConsumerGiftAdminId": $localStorage.UserId,
                    "GiftPoints": $scope.gift.point
                }
                KpFactory.sendgift(giftArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                    } else {

                        alert(response.data.msg);
                    }

                });
            }

        })
        .controller('acceptrejectCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.accept = function () {
                $localStorage.flag = 1;
                $ionicHistory.goBack();
            }
            $scope.reject = function () {
                $localStorage.flag = 0;
                $ionicHistory.goBack();
            }
        })
        .controller('notificationCtrl', function (KpFactory, $scope, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {


            var trasactionArray = {
                Id: $localStorage.UserId,
                Status: "GetConsumerId"
            };
            // console.log($localStorage.UserId);
            $scope.notifications = {};
            KpFactory.transactionRequest(trasactionArray).then(function (response) {
                debugger;
                $scope.notifications = {};
                $scope.notifications = response.data.Data;
                $ionicLoading.hide();
            });
            $scope.refresh = function () {
                $ionicLoading.show({
                    template: 'Loading.. Please Wait <br/><ion-spinner></ion-spinner>'
                });
                $scope.notifications = {};
                KpFactory.transactionRequest(trasactionArray).then(function (response) {
                    debugger;
                    $scope.notifications = response.data.Data;
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
            $scope.acceptReject = function (id, flag) {
                debugger;
                var approvalArray = {
                    Id: id,
                    Flag: flag
                }
                KpFactory.acceptReject(approvalArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                    } else {
                        alert(response.data.msg);
                    }
                });
            }
        })
        .controller('iwantthisCtrl', function ($scope, KpFactory, $cordovaGeolocation, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            var address;
            geocoder = new google.maps.Geocoder();
            $scope.loc = {
                cl: ''
            };
            $scope.paymentoption = [
                {text: "Current", value: "CURRENT"},
                {text: "Other", value: "OTHER"}
            ];
            $scope.iwt = {};
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        debugger;
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        debugger;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//alert("Else loop" + latlng);
                        geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            //alert("Else loop1");
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    debugger;
                                    var add = results[0].formatted_address;
                                    var value = add.split(",");
                                    count = value.length;
                                    var state = value[count - 2];
                                    stcount = state.length;
                                    var stat = state.slice(stcount - 6, stcount);
                                    var city = value[count - 2];
                                    $scope.locatehelp = stat;
                                    //   alert("Full address is: " + add);
                                } else {
                                    alert("address not found");
                                }
                            } else {
                                //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                                alert("Geocoder failed due to: " + status);
                            }
                        });
                    }, function (err) {
                        // error
                    });
            KpFactory.keywords();
            $scope.movies = KpFactory.getmovies("...");
            $scope.movies.then(function (data) {
                $scope.movies = data;
            });
            $scope.getmovies = function () {
                return $scope.movies;
            }
            $scope.doSomething = function (typedthings) {
                console.log("Do something like reload data with this: " + typedthings);
                $scope.newmovies = KpFactory.getmovies(typedthings);
                $scope.newmovies.then(function (data) {
                    $scope.movies = data;
                });
            }
            $scope.doSomethingElse = function (suggestion) {
                console.log("Suggestion selected: " + suggestion);
            }
            $scope.location = function (location) {
                debugger;
                if (location == "CURRENT")
                {
                    $scope.iwt.loc = $scope.locatehelp;
                    document.getElementById('loctype').focus();
                } else {
                    $scope.iwt.loc = "";
                }
            }
            $scope.latlng = function () {
                address = $scope.iwt.loc;
                if (geocoder) {
                    debugger;
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            debugger;
                            $scope.iwt.lat = results[0].geometry.location.lat();
                            $scope.iwt.lng = results[0].geometry.location.lng();
                        }
                    });
                }
            }
            $scope.iwtlist = function () {
                $state.go("app.iwtlist");

            }
            $scope.list = function () {

                debugger;
                var iwtArray = {
                    ConsumerId: $localStorage.UserId,
                    Radious: $scope.iwt.radius,
                    Description: $scope.iwt.desc,
                    BudgetMax: $scope.iwt.price,
                    EndDate: $scope.iwt.date.getFullYear() + "/" + ($scope.iwt.date.getMonth() + 1) + "/" + $scope.iwt.date.getDate(),
                    Keywords: $scope.iwt.findtext,
                    MerchantType: $scope.iwt.type,
                    PostCode: $scope.iwt.loc,
                    Location: $scope.loc.cl,
                    Lattitude: $scope.iwt.lat,
                    Longitude: $scope.iwt.lng
                }
                KpFactory.addiwt(iwtArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                    } else {

                        alert(response.data.msg);
                    }

                });

            }
        })
        .controller('iwtlistCtrl', function ($scope, $rootScope, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.iwtlists = {};
            $scope.iwt = {};
            $scope.filter = {};
            $scope.filter.cb1 = false;
            $scope.filter.cb2 = false;
            $scope.filter.cb3 = false;
            var iwtlistArray = {
                ConsumerId: $localStorage.UserId,
                Filter: "ALL"
            }
            KpFactory.iwtlist(iwtlistArray).then(function (response) {
                debugger;
                if (response.data.status == "Success") {
                    alert(response.data.msg);
                    $scope.iwtlists = response.data.Data;
                } else {

                    alert(response.data.msg);
                }

            });
            $scope.closeupdate = function () {
                $scope.modal.hide();
            }
            $scope.iwtupdate = function (id, desc, keyword, date, budget) {
                debugger;
                $scope.iwtId = id;
                $scope.iwt.findtxt = keyword;
                $scope.iwt.desc = desc;
                $scope.iwt.price = budget;
                $scope.iwt.date = new Date(date.split("-")[1], (date.split("-")[2]).split("T")[0], date.split("-")[0]);
                $ionicModal.fromTemplateUrl('iwt-modal.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                // $scope.modal.show();
            };
            $scope.apply = function () {
                debugger;
                var updtArray = {
                    IwtId: $scope.iwtId,
                    Description: $scope.iwt.desc,
                    BudgetMax: $scope.iwt.price,
                    EndDate: $scope.iwt.date.getFullYear() + "/" + ($scope.iwt.date.getMonth() + 1) + "/" + $scope.iwt.date.getDate(),
                    Keywords: $scope.iwt.findtext

                }
                KpFactory.iwtlistupdate(updtArray).then(function (response) {
                    debugger;
                    if (response.data.status == "Success") {
                        alert(response.data.msg);
                    } else {

                        alert(response.data.msg);
                    }

                });
                $scope.modal.hide();
            }
            $scope.offerlist = function (iwtid, lat, long,keyword) {
                debugger;
                $rootScope.iwtid = iwtid;
                $state.go('app.iwtofferlist', {'IwtID': iwtid, 'Lat': lat, 'Long': long,'Keyword':keyword})

            }
            $scope.open = function () {

                $ionicModal.fromTemplateUrl('iwt-modal1.html', {
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
                var iwtlistArray = {
                    ConsumerId: $localStorage.UserId,
                    Filter: ($scope.filter.cb1 == true ? "POSTED" : "") + ($scope.filter.cb2 == true ? "REPLY," : "") + ($scope.filter.cb3 == true ? "SEEN" : "")
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
                $scope.modal.hide();
            }

        })
        .controller('iwtofferlistCtrl', function ($scope, $ionicSlideBoxDelegate, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $stateParams) {
            debugger;
            $scope.filter = {};
            $scope.filter.cb1 = false;
            $scope.filter.cb2 = false;
            $scope.filter.cb3 = false;
            $scope.keyword=$stateParams.Keyword;
            $scope.iwtofferlists = {};
            var offerArray = {
                IwtId: $stateParams.IwtID,
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
                    Filter: ($scope.filter.cb1 == true ? "ACCEPTED" : "") + ($scope.filter.cb2 == true ? "REJECTED" : "") + ($scope.filter.cb3 == true ? "OFFER" : "")
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
                $state.go("app.offerdetail", {'IwtID': iwtid, 'IwtOfferId': iwtofferid, 'IsSeen': IsSeen, 'Lat': $stateParams.Lat, 'Long': $stateParams.Long, 'mid': mid})
            }

        })
        .controller('offerdetailCtrl', function ($scope, $ionicSlideBoxDelegate, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading, $stateParams) {
            debugger;
            $scope.iwtofferlists = {};
            $scope.iwtofferlists = KpFactory.getmrechantoffer($stateParams.mid, $stateParams.IwtOfferId);
            $scope.chat = function (iwtid, merchantid) {
                debugger;
                $state.go('app.offerdescript', {'IwtID': iwtid, 'MerchantID': merchantid});
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

        })
        .controller('offerdescriptCtrl', function ($scope, KpFactory, $ionicSlideBoxDelegate, $stateParams, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            debugger;
            $scope.UserId = $localStorage.UserId;
            $scope.html = '&quot;12.10 On-Going Submission of &quot;&quot;Made Up&quot;&quot; Samples.&quot;'
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

        })
        .controller('paymentlistCtrl', function ($scope, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.loc = {
                cl: ''
            };
            $scope.paymentoption = [
                {text: "INSHOP", value: "Inshop"},
                {text: "ONLINE", value: "Online"},
                {text: "BOTH", value: "Both"}
            ];
            $scope.paymentlitsts = {};
            var statusArray = {
                "Uid": $localStorage.UserId,
                "FormDate": "",
                "Todate": "",
                "Type": "Both"
            }
            KpFactory.paymentlist(statusArray).then(function (response) {

                debugger;
                if (response.Data != null) {
                    $scope.paymentlitsts = response.Data;
                } else {

                }

            });
            $scope.filter = function () {
                $ionicModal.fromTemplateUrl('my-modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };

            $scope.closeflilter = function () {

                $scope.modal.hide();
            };
            $scope.search = function () {
                $scope.modal.hide();
                debugger;
                var statusArray = {
                    "Uid": $localStorage.UserId,
                    "FormDate": "",
                    "Todate": "",
                    "Type": $scope.loc.cl
                }
                KpFactory.paymentlist(statusArray).then(function (response) {

                    debugger;
                    if (response.Data != null) {
                        $scope.paymentlitsts = response.Data;
                    } else {

                    }

                });

            }
        })
        .controller('livestatusCtrl', function ($scope, KpFactory, $ionicModal, $timeout, $localStorage, $state, $ionicHistory, $ionicLoading) {
            $scope.livestatusData = {};
            var statusArray = {
                "Cid": $localStorage.UserId
            }
            KpFactory.livestatus(statusArray).then(function (response) {

                debugger;
                if (response.Data != null) {
                    $scope.livestatusData = response.Data[0];
                } else {

                }

            });
        })
        .directive('autocomplete', function () {
            var index = -1;
            return {
                restrict: 'E',
                scope: {
                    searchParam: '=ngModel',
                    suggestions: '=data',
                    onType: '=onType',
                    onSelect: '=onSelect',
                    autocompleteRequired: '='
                },
                controller: ['$scope', function ($scope) {
                        // the index of the suggestions that's currently selected
                        $scope.selectedIndex = -1;
                        $scope.initLock = true;
                        // set new index
                        $scope.setIndex = function (i) {
                            $scope.selectedIndex = parseInt(i);
                        };
                        this.setIndex = function (i) {
                            $scope.setIndex(i);
                            $scope.$apply();
                        };
                        $scope.getIndex = function (i) {
                            return $scope.selectedIndex;
                        };
                        // watches if the parameter filter should be changed
                        var watching = true;
                        // autocompleting drop down on/off
                        $scope.completing = false;
                        // starts autocompleting on typing in something
                        $scope.$watch('searchParam', function (newValue, oldValue) {

                            if (oldValue === newValue || (!oldValue && $scope.initLock)) {
                                return;
                            }

                            if (watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
                                $scope.completing = true;
                                $scope.searchFilter = $scope.searchParam;
                                $scope.selectedIndex = -1;
                            }

                            // function thats passed to on-type attribute gets executed
                            if ($scope.onType)
                                $scope.onType($scope.searchParam);
                        });
                        // for hovering over suggestions
                        this.preSelect = function (suggestion) {

                            watching = false;
                            // this line determines if it is shown
                            // in the input field before it's selected:
                            //$scope.searchParam = suggestion;

                            $scope.$apply();
                            watching = true;
                        };
                        $scope.preSelect = this.preSelect;
                        this.preSelectOff = function () {
                            watching = true;
                        };
                        $scope.preSelectOff = this.preSelectOff;
                        // selecting a suggestion with RIGHT ARROW or ENTER
                        $scope.select = function (suggestion) {
                            if (suggestion) {
                                $scope.searchParam = suggestion;
                                $scope.searchFilter = suggestion;
                                if ($scope.onSelect)
                                    $scope.onSelect(suggestion);
                            }
                            watching = false;
                            $scope.completing = false;
                            setTimeout(function () {
                                watching = true;
                            }, 1000);
                            $scope.setIndex(-1);
                        };
                    }],
                link: function (scope, element, attrs) {

                    setTimeout(function () {
                        scope.initLock = false;
                        scope.$apply();
                    }, 250);
                    var attr = '';
                    // Default atts
                    scope.attrs = {
                        "placeholder": "start typing...",
                        "class": "",
                        "id": "",
                        "inputclass": "",
                        "inputid": ""
                    };
                    for (var a in attrs) {
                        attr = a.replace('attr', '').toLowerCase();
                        // add attribute overriding defaults
                        // and preventing duplication
                        if (a.indexOf('attr') === 0) {
                            scope.attrs[attr] = attrs[a];
                        }
                    }

                    if (attrs.clickActivation) {
                        element[0].onclick = function (e) {
                            if (!scope.searchParam) {
                                setTimeout(function () {
                                    scope.completing = true;
                                    scope.$apply();
                                }, 200);
                            }
                        };
                    }

                    var key = {left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27, tab: 9};
                    document.addEventListener("keydown", function (e) {
                        var keycode = e.keyCode || e.which;
                        switch (keycode) {
                            case key.esc:
                                // disable suggestions on escape
                                scope.select();
                                scope.setIndex(-1);
                                scope.$apply();
                                e.preventDefault();
                        }
                    }, true);
                    document.addEventListener("blur", function (e) {
                        // disable suggestions on blur
                        // we do a timeout to prevent hiding it before a click event is registered
                        setTimeout(function () {
                            scope.select();
                            scope.setIndex(-1);
                            scope.$apply();
                        }, 150);
                    }, true);
                    element[0].addEventListener("keydown", function (e) {
                        var keycode = e.keyCode || e.which;
                        var l = angular.element(this).find('li').length;
                        // this allows submitting forms by pressing Enter in the autocompleted field
                        if (!scope.completing || l == 0)
                            return;
                        // implementation of the up and down movement in the list of suggestions
                        switch (keycode) {
                            case key.up:

                                index = scope.getIndex() - 1;
                                if (index < -1) {
                                    index = l - 1;
                                } else if (index >= l) {
                                    index = -1;
                                    scope.setIndex(index);
                                    scope.preSelectOff();
                                    break;
                                }
                                scope.setIndex(index);
                                if (index !== -1)
                                    scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());
                                scope.$apply();
                                break;
                            case key.down:
                                index = scope.getIndex() + 1;
                                if (index < -1) {
                                    index = l - 1;
                                } else if (index >= l) {
                                    index = -1;
                                    scope.setIndex(index);
                                    scope.preSelectOff();
                                    scope.$apply();
                                    break;
                                }
                                scope.setIndex(index);
                                if (index !== -1)
                                    scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());
                                break;
                            case key.left:
                                break;
                            case key.right:
                            case key.enter:
                            case key.tab:

                                index = scope.getIndex();
                                // scope.preSelectOff();
                                if (index !== -1) {
                                    scope.select(angular.element(angular.element(this).find('li')[index]).text());
                                    if (keycode == key.enter) {
                                        e.preventDefault();
                                    }
                                } else {
                                    if (keycode == key.enter) {
                                        scope.select();
                                    }
                                }
                                scope.setIndex(-1);
                                scope.$apply();
                                break;
                            case key.esc:
                                // disable suggestions on escape
                                scope.select();
                                scope.setIndex(-1);
                                scope.$apply();
                                e.preventDefault();
                                break;
                            default:
                                return;
                        }

                    });
                },
                template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
<label class="item item-input" style="border-radius:5px;width:100%;border-color: #A7A3A3;">\
                    <i class="icon ion-search placeholder-icon"></i>\
          <input\
            type="text"\
            ng-model="searchParam"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            id="{{ attrs.inputid }}"\
            ng-required="{{ autocompleteRequired }} " style="font-size:15px" /></label>\
          <ul ng-show="completing && (suggestions | filter:searchFilter).length > 0" style="overflow-y:scroll;max-height:100px;z-index:3;border:1px">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
            </label>\
        </div>'
            };
        })
        .filter('highlight', ['$sce', function ($sce) {
                return function (input, searchParam) {
                    if (typeof input === 'function')
                        return '';
                    if (searchParam) {
                        var words = '(' +
                                searchParam.split(/\ /).join(' |') + '|' +
                                searchParam.split(/\ /).join('|') +
                                ')',
                                exp = new RegExp(words, 'gi');
                        if (words.length) {
                            input = input.replace(exp, "<span class=\"highlight\">$1</span>");
                        }
                    }
                    return $sce.trustAsHtml(input);
                };
            }])
        .directive('suggestion', function () {
            return {
                restrict: 'A',
                require: '^autocomplete', // ^look for controller on parents element
                link: function (scope, element, attrs, autoCtrl) {
                    element.bind('mouseenter', function () {
                        autoCtrl.preSelect(attrs.val);
                        autoCtrl.setIndex(attrs.index);
                    });
                    element.bind('mouseleave', function () {
                        autoCtrl.preSelectOff();
                    });
                }
            };
        })
        .filter('nl2br', ['$filter',
            function ($filter) {
                return function (data) {
                    if (!data)
                        return data;
                    return data.replace(/\n\r?/g, '<br />');
                };
            }
        ])
        .directive('autolinker', ['$timeout',
            function ($timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        $timeout(function () {
                            var eleHtml = element.html();
                            if (eleHtml === '') {
                                return false;
                            }

                            var text = Autolinker.link(eleHtml, {
                                className: 'autolinker',
                                newWindow: false
                            });
                            element.html(text);
                            var autolinks = element[0].getElementsByClassName('autolinker');
                            for (var i = 0; i < autolinks.length; i++) {
                                angular.element(autolinks[i]).bind('click', function (e) {
                                    var href = e.target.href;
                                    console.log('autolinkClick, href: ' + href);
                                    if (href) {
                                        //window.open(href, '_system');
                                        window.open(href, '_blank');
                                    }

                                    e.preventDefault();
                                    return false;
                                });
                            }
                        }, 0);
                    }
                }
            }
        ])
function onProfilePicError(ele) {
    this.ele.src = ''; // set a fallback
}
!function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
        return a.returnExportsGlobal = b()
    }) : "object" == typeof exports ? module.exports = b() : a.Autolinker = b()
}(this, function () {
    var a = function (b) {
        a.Util.assign(this, b), this.matchValidator = new a.MatchValidator
    };
    return a.prototype = {constructor: a, urls: !0, email: !0, twitter: !0, newWindow: !0, stripPrefix: !0, className: "", htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;)/gi, matcherRegex: function () {
            var a = /(^|[^\w])@(\w{1,15})/, b = /(?:[\-;:&=\+\$,\w\.]+@)/, c = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/, d = /(?:www\.)/, e = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/, f = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/, g = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;
            return new RegExp(["(", a.source, ")", "|", "(", b.source, e.source, f.source, ")", "|", "(", "(?:", "(", c.source, e.source, ")", "|", "(?:", "(.?//)?", d.source, e.source, ")", "|", "(?:", "(.?//)?", e.source, f.source, ")", ")", "(?:" + g.source + ")?", ")"].join(""), "gi")
        }(), charBeforeProtocolRelMatchRegex: /^(.)?\/\//, link: function (b) {
            var c = this, d = this.getHtmlParser(), e = this.htmlCharacterEntitiesRegex, f = 0, g = [];
            return d.parse(b, {processHtmlNode: function (a, b, c) {
                    "a" === b && (c ? f = Math.max(f - 1, 0) : f++), g.push(a)
                }, processTextNode: function (b) {
                    if (0 === f)
                        for (var d = a.Util.splitAndCapture(b, e), h = 0, i = d.length; i > h; h++) {
                            var j = d[h], k = c.processTextNode(j);
                            g.push(k)
                        }
                    else
                        g.push(b)
                }}), g.join("")
        }, getHtmlParser: function () {
            var b = this.htmlParser;
            return b || (b = this.htmlParser = new a.HtmlParser), b
        }, getTagBuilder: function () {
            var b = this.tagBuilder;
            return b || (b = this.tagBuilder = new a.AnchorTagBuilder({newWindow: this.newWindow, truncate: this.truncate, className: this.className})), b
        }, processTextNode: function (a) {
            var b = this;
            return a.replace(this.matcherRegex, function (a, c, d, e, f, g, h, i, j) {
                var k = b.processCandidateMatch(a, c, d, e, f, g, h, i, j);
                if (k) {
                    var l = b.createMatchReturnVal(k.match, k.matchStr);
                    return k.prefixStr + l + k.suffixStr
                }
                return a
            })
        }, processCandidateMatch: function (b, c, d, e, f, g, h, i, j) {
            var k, l = i || j, m = "", n = "";
            if (c && !this.twitter || f && !this.email || g && !this.urls || !this.matchValidator.isValidMatch(g, h, l))
                return null;
            if (this.matchHasUnbalancedClosingParen(b) && (b = b.substr(0, b.length - 1), n = ")"), f)
                k = new a.match.Email({matchedText: b, email: f});
            else if (c)
                d && (m = d, b = b.slice(1)), k = new a.match.Twitter({matchedText: b, twitterHandle: e});
            else {
                if (l) {
                    var o = l.match(this.charBeforeProtocolRelMatchRegex)[1] || "";
                    o && (m = o, b = b.slice(1))
                }
                k = new a.match.Url({matchedText: b, url: b, protocolUrlMatch: !!h, protocolRelativeMatch: !!l, stripPrefix: this.stripPrefix})
            }
            return{prefixStr: m, suffixStr: n, matchStr: b, match: k}
        }, matchHasUnbalancedClosingParen: function (a) {
            var b = a.charAt(a.length - 1);
            if (")" === b) {
                var c = a.match(/\(/g), d = a.match(/\)/g), e = c && c.length || 0, f = d && d.length || 0;
                if (f > e)
                    return!0
            }
            return!1
        }, createMatchReturnVal: function (b, c) {
            var d;
            if (this.replaceFn && (d = this.replaceFn.call(this, this, b)), "string" == typeof d)
                return d;
            if (d === !1)
                return c;
            if (d instanceof a.HtmlTag)
                return d.toString();
            var e = this.getTagBuilder(), f = e.build(b);
            return f.toString()
        }}, a.link = function (b, c) {
        var d = new a(c);
        return d.link(b)
    }, a.match = {}, a.Util = {abstractMethod: function () {
            throw"abstract"
        }, assign: function (a, b) {
            for (var c in b)
                b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }, extend: function (b, c) {
            var d = b.prototype, e = function () {};
            e.prototype = d;
            var f;
            f = c.hasOwnProperty("constructor") ? c.constructor : function () {
                d.constructor.apply(this, arguments)
            };
            var g = f.prototype = new e;
            return g.constructor = f, g.superclass = d, delete c.constructor, a.Util.assign(g, c), f
        }, ellipsis: function (a, b, c) {
            return a.length > b && (c = null == c ? ".." : c, a = a.substring(0, b - c.length) + c), a
        }, indexOf: function (a, b) {
            if (Array.prototype.indexOf)
                return a.indexOf(b);
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }, splitAndCapture: function (a, b) {
            if (!b.global)
                throw new Error("`splitRegex` must have the 'g' flag set");
            for (var c, d = [], e = 0; c = b.exec(a); )
                d.push(a.substring(e, c.index)), d.push(c[0]), e = c.index + c[0].length;
            return d.push(a.substring(e)), d
        }}, a.HtmlParser = a.Util.extend(Object, {htmlRegex: function () {
            var a = /[0-9a-zA-Z][0-9a-zA-Z:]*/, b = /[^\s\0"'>\/=\x01-\x1F\x7F]+/, c = /(?:".*?"|'.*?'|[^'"=<>`\s]+)/, d = b.source + "(?:\\s*=\\s*" + c.source + ")?";
            return new RegExp(["(?:", "<(!DOCTYPE)", "(?:", "\\s+", "(?:", d, "|", c.source + ")", ")*", ">", ")", "|", "(?:", "<(/)?", "(" + a.source + ")", "(?:", "\\s+", d, ")*", "\\s*/?", ">", ")"].join(""), "gi")
        }(), parse: function (a, b) {
            b = b || {};
            for (var c, d = b.processHtmlNode || function () {}, e = b.processTextNode || function () {}, f = this.htmlRegex, g = 0; null !== (c = f.exec(a)); ) {
                var h = c[0], i = c[1] || c[3], j = !!c[2], k = a.substring(g, c.index);
                k && e(k), d(h, i.toLowerCase(), j), g = c.index + h.length
            }
            if (g < a.length) {
                var l = a.substring(g);
                l && e(l)
            }
        }}), a.HtmlTag = a.Util.extend(Object, {whitespaceRegex: /\s+/, constructor: function (b) {
            a.Util.assign(this, b), this.innerHtml = this.innerHtml || this.innerHTML
        }, setTagName: function (a) {
            return this.tagName = a, this
        }, getTagName: function () {
            return this.tagName || ""
        }, setAttr: function (a, b) {
            var c = this.getAttrs();
            return c[a] = b, this
        }, getAttr: function (a) {
            return this.getAttrs()[a]
        }, setAttrs: function (b) {
            var c = this.getAttrs();
            return a.Util.assign(c, b), this
        }, getAttrs: function () {
            return this.attrs || (this.attrs = {})
        }, setClass: function (a) {
            return this.setAttr("class", a)
        }, addClass: function (b) {
            for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); c = h.shift(); )
                -1 === f(g, c) && g.push(c);
            return this.getAttrs()["class"] = g.join(" "), this
        }, removeClass: function (b) {
            for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); g.length && (c = h.shift()); ) {
                var i = f(g, c);
                -1 !== i && g.splice(i, 1)
            }
            return this.getAttrs()["class"] = g.join(" "), this
        }, getClass: function () {
            return this.getAttrs()["class"] || ""
        }, hasClass: function (a) {
            return -1 !== (" " + this.getClass() + " ").indexOf(" " + a + " ")
        }, setInnerHtml: function (a) {
            return this.innerHtml = a, this
        }, getInnerHtml: function () {
            return this.innerHtml || ""
        }, toString: function () {
            var a = this.getTagName(), b = this.buildAttrsStr();
            return b = b ? " " + b : "", ["<", a, b, ">", this.getInnerHtml(), "</", a, ">"].join("")
        }, buildAttrsStr: function () {
            if (!this.attrs)
                return"";
            var a = this.getAttrs(), b = [];
            for (var c in a)
                a.hasOwnProperty(c) && b.push(c + '="' + a[c] + '"');
            return b.join(" ")
        }}), a.MatchValidator = a.Util.extend(Object, {invalidProtocolRelMatchRegex: /^[\w]\/\//, hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]+:\/\//, uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]+:/, hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z]/, isValidMatch: function (a, b, c) {
            return b && !this.isValidUriScheme(b) || this.urlMatchDoesNotHaveProtocolOrDot(a, b) || this.urlMatchDoesNotHaveAtLeastOneWordChar(a, b) || this.isInvalidProtocolRelativeMatch(c) ? !1 : !0
        }, isValidUriScheme: function (a) {
            var b = a.match(this.uriSchemeRegex)[0];
            return"javascript:" !== b && "vbscript:" !== b
        }, urlMatchDoesNotHaveProtocolOrDot: function (a, b) {
            return!(!a || b && this.hasFullProtocolRegex.test(b) || -1 !== a.indexOf("."))
        }, urlMatchDoesNotHaveAtLeastOneWordChar: function (a, b) {
            return a && b ? !this.hasWordCharAfterProtocolRegex.test(a) : !1
        }, isInvalidProtocolRelativeMatch: function (a) {
            return!!a && this.invalidProtocolRelMatchRegex.test(a)
        }}), a.AnchorTagBuilder = a.Util.extend(Object, {constructor: function (b) {
            a.Util.assign(this, b)
        }, build: function (b) {
            var c = new a.HtmlTag({tagName: "a", attrs: this.createAttrs(b.getType(), b.getAnchorHref()), innerHtml: this.processAnchorText(b.getAnchorText())});
            return c
        }, createAttrs: function (a, b) {
            var c = {href: b}, d = this.createCssClass(a);
            return d && (c["class"] = d), this.newWindow && (c.target = "_blank"), c
        }, createCssClass: function (a) {
            var b = this.className;
            return b ? b + " " + b + "-" + a : ""
        }, processAnchorText: function (a) {
            return a = this.doTruncate(a)
        }, doTruncate: function (b) {
            return a.Util.ellipsis(b, this.truncate || Number.POSITIVE_INFINITY)
        }}), a.match.Match = a.Util.extend(Object, {constructor: function (b) {
            a.Util.assign(this, b)
        }, getType: a.Util.abstractMethod, getMatchedText: function () {
            return this.matchedText
        }, getAnchorHref: a.Util.abstractMethod, getAnchorText: a.Util.abstractMethod}), a.match.Email = a.Util.extend(a.match.Match, {getType: function () {
            return"email"
        }, getEmail: function () {
            return this.email
        }, getAnchorHref: function () {
            return"mailto:" + this.email
        }, getAnchorText: function () {
            return this.email
        }}), a.match.Twitter = a.Util.extend(a.match.Match, {getType: function () {
            return"twitter"
        }, getTwitterHandle: function () {
            return this.twitterHandle
        }, getAnchorHref: function () {
            return"https://twitter.com/" + this.twitterHandle
        }, getAnchorText: function () {
            return"@" + this.twitterHandle
        }}), a.match.Url = a.Util.extend(a.match.Match, {urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i, protocolRelativeRegex: /^\/\//, protocolPrepended: !1, getType: function () {
            return"url"
        }, getUrl: function () {
            var a = this.url;
            return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (a = this.url = "http://" + a, this.protocolPrepended = !0), a
        }, getAnchorHref: function () {
            var a = this.getUrl();
            return a.replace(/&amp;/g, "&")
        }, getAnchorText: function () {
            var a = this.getUrl();
            return this.protocolRelativeMatch && (a = this.stripProtocolRelativePrefix(a)), this.stripPrefix && (a = this.stripUrlPrefix(a)), a = this.removeTrailingSlash(a)
        }, stripUrlPrefix: function (a) {
            return a.replace(this.urlPrefixRegex, "")
        }, stripProtocolRelativePrefix: function (a) {
            return a.replace(this.protocolRelativeRegex, "")
        }, removeTrailingSlash: function (a) {
            return"/" === a.charAt(a.length - 1) && (a = a.slice(0, -1)), a
        }}), a
});
//        function getMockMessages() {
//        return {"messages": [{"_id": "535d625f898df4e80e2a125e", "text": "Ionic has changed the game for hybrid app development.", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-04-27T20:02:39.082Z", "read": true, "readDate": "2014-12-01T06:27:37.944Z"}, {"_id": "535f13ffee3b2a68112b9fc0", "text": "I like Ionic better than ice cream!", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-04-29T02:52:47.706Z", "read": true, "readDate": "2014-12-01T06:27:37.944Z"}, {"_id": "546a5843fd4c5d581efa263a", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-17T20:19:15.289Z", "read": true, "readDate": "2014-12-01T06:27:38.328Z"}, {"_id": "54764399ab43d1d4113abfd1", "text": "Am I dreaming?", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-26T21:18:17.591Z", "read": true, "readDate": "2014-12-01T06:27:38.337Z"}, {"_id": "547643aeab43d1d4113abfd2", "text": "Is this magic?", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-26T21:18:38.549Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z"}, {"_id": "547815dbab43d1d4113abfef", "text": "Gee wiz, this is something special.", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-28T06:27:40.001Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z"}, {"_id": "54781c69ab43d1d4113abff0", "text": "I think I like Ionic more than I like ice cream!", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-28T06:55:37.350Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z"}, {"_id": "54781ca4ab43d1d4113abff1", "text": "Yea, it's pretty sweet", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-28T06:56:36.472Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z"}, {"_id": "5478df86ab43d1d4113abff4", "text": "Wow, this is really something huh?", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-28T20:48:06.572Z", "read": true, "readDate": "2014-12-01T06:27:38.339Z"}, {"_id": "54781ca4ab43d1d4113abff1", "text": "Create amazing apps - ionicframework.com", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-29T06:56:36.472Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z"}], "unread": 0};
//         }

//moment.locale('en', {
//    relativeTime: {
//        future: "in %s",
//        past: "%s ago",
//        s: "%d sec",
//        m: "a minute",
//        mm: "%d minutes",
//        h: "an hour",
//        hh: "%d hours",
//        d: "a day",
//        dd: "%d days",
//        M: "a month",
//        MM: "%d months",
//        y: "a year",
//        yy: "%d years"
//    }
//})
;