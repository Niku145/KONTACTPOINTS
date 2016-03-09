angular.module('Kp.Factory', [])
        .factory('KpFactory', function ($localStorage, $rootScope, $http, $cordovaOauth, $q) {

            //  alert("dd");
            returnData = {};
            returnData.API_URL = function () {
                //return "http://zappzi.com.hostinguk.co.uk/api/Services/";

                return "http://www.kpmobileservices.kontactpoints.com/api/Services/";
            }

            returnData.getLogin = function (LoginArray) {

                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = this.API_URL() + "MerchantLogin";
                //  alert(URL);
                var FetchedData = $http.post(URL, LoginArray).then(function (result) {
                    debugger;
                    //  console.log(JSON.stringify(result));                  
                    return result.data;
                }, function (err) {
                    debugger;
                    //   alert("Error new");
                    // alert(JSON.stringify(err));
                    //  console.log("error returned");
                    // console.log(JSON.stringify(err));
                })
                return $q.when(FetchedData);
            }

            returnData.getCategory = function () {
                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = "http://217.194.223.35/Zappzi/api/Services/GetCategory";
                alert(URL);

                var FetchedData = $http.get(URL).then(function (result) {

                    alert("Success");
                    console.log(JSON.stringify(result));
                    return result.data;

                }, function (err) {
                    alert("Error");
                    alert(JSON.stringify(err))
                    console.log("error returned");
                    console.log(JSON.stringify(err));
                })
                return $q.when(FetchedData);
            }

            returnData.getSignup = function (SignupArray) {
                debugger;
                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = this.API_URL() + "Registration";
                var FetchedData = $http.post(URL, SignupArray).then(function (result) {
                    debugger;
                    // alert(JSON.stringify(result));
                    console.log(JSON.stringify(result));
                    return result;
                }, function (err) {
                    debugger;
                    console.log("error returned");
                    console.log(JSON.stringify(err));
                })
                return $q.when(FetchedData);
            }

            returnData.getStatement = function (StatementArray) {
                debugger;
                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = this.API_URL() + "Verify_Consumer";
                var FetchedData = $http.post(URL, StatementArray).then(function (result) {
                    debugger;
                    console.log(JSON.stringify(result));
                    return result.data;
                }, function (err) {
                    debugger;
                    console.log("error returned");
                    console.log(JSON.stringify(err));
                })
                return $q.when(FetchedData);
            }

            returnData.getStatementDetail = function (StatementArray) {
                debugger;

                var URL = this.API_URL() + "GetStatements";
                var FetchedData = $http.post(URL, StatementArray).then(function (result) {
                    debugger;
                    console.log(JSON.stringify(result));
                    return result.data;
                }, function (err) {
                    debugger;
                    console.log("error returned");
                    console.log(JSON.stringify(err));
                })
                return $q.when(FetchedData);
            }

            returnData.AddToken = function (TokenArray) {
                debugger;
                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = this.API_URL() + "AccessToken";
                var FetchedData = $http.post(URL, TokenArray).then(function (result) {
                    // debugger;
                    //alert(JSON.stringify(result));                  
                    return result;
                }, function (err) {
                    //  debugger;
                    // alert(JSON.stringify(err));                    
                })
                return $q.when(FetchedData);
            }

            returnData.getContact = function (MyContactArray) {
                var URL = this.API_URL() + "MyContact";
                var FetchedData = $http.post(URL, MyContactArray).then(function (result) {
                    console.log(JSON.stringify(result.data))
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }

            returnData.GroupCreation = function (MyGroupArray) {
                debugger;
                var URL = this.API_URL() + "GroupCreationNew";
                var FetchedData = $http.post(URL, MyGroupArray).then(function (result) {
                    console.log(JSON.stringify(result.data))
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }

            returnData.GetGroup = function (MyGroupListArray) {
                var URL = this.API_URL() + "GroupView";
                var FetchedData = $http.post(URL, MyGroupListArray).then(function (result) {
                    console.log(JSON.stringify(result.data))
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }


            returnData.MyMessage = function (MyMessageArray) {
                debugger;
                var URL = this.API_URL() + "GroupMessageView";
                var FetchedData = $http.post(URL, MyMessageArray).then(function (result) {
                    //alert(JSON.stringify(result.data))
                    //alert(JSON.stringify(result.data.Data))
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }

            returnData.ComposeMessage = function (SendMessageArray) {
                debugger;
                var URL = this.API_URL() + "ComposeMessage";
                var FetchedData = $http.post(URL, SendMessageArray).then(function (result) {
                    //alert(JSON.stringify(result.data))
                    //alert(JSON.stringify(result.data.Data))
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.consumerdata = function (MerchantArray) {
                var URL = this.API_URL() + "validated_Consumer";
                var FetchedData = $http.post(URL, MerchantArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.merchantofferdata = function (MerchantOfferArray) {
                var URL = this.API_URL() + "Merchant_Offer";
                var FetchedData = $http.post(URL, MerchantOfferArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.manufactuerofferdata = function (MerchantOfferArray) {
                var URL = this.API_URL() + "Manufacturer_Offer";
                var FetchedData = $http.post(URL, MerchantOfferArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.transaction = function (transactionArray) {
                var URL = this.API_URL() + "point";
                var FetchedData = $http.post(URL, transactionArray).then(function (result) {
                    debugger;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.addconsumer = function (consumerArray) {
                var URL = this.API_URL() + "AddConsumer";
                var FetchedData = $http.post(URL, consumerArray).then(function (result) {
                    debugger;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.setbonuspoint = function (consumerArray) {
                var URL = this.API_URL() + "SetBonus";
                var FetchedData = $http.post(URL, consumerArray).then(function (result) {
                    debugger;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.viewpromotion = function (promotionArray) {
                var URL = this.API_URL() + "ViewPromotion";
                var FetchedData = $http.post(URL, promotionArray).then(function (result) {
                    debugger;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.updatepromotion = function (promotionArray) {
                var URL = this.API_URL() + "UpdateTemplate";
                var FetchedData = $http.post(URL, promotionArray).then(function (result) {
                    debugger;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }

            return returnData;
        })