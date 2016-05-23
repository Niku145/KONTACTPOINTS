angular.module('Kp.Factory', ['angularMoment', 'monospaced.elastic'])
        .factory('KpFactory', function ($localStorage, $rootScope, $http, $cordovaOauth, $q, $timeout) {

            //  alert("dd");
            var offerlists = {};
            var merchantofferlist = [];
            var airlines = {};
            var promotions = {};
            var airlines = {};
            var moreMovies = [];
            var keywords = {};
            var URL1 = {};
//            URL1 = "http://kpmobileservices.kontactpoints.com/api/Services/";
            URL1 = "http://192.168.1.151/KpAPI/api/Services/";
            returnData = {};
            returnData.API_URL = function () {

                return "http://192.168.1.151/KpAPI/api/Services/";

//                return "http://kpmobileservices.kontactpoints.com/api/Services/";
            }
            returnData.getLogin = function (LoginArray) {

                //document.domain = 'www.zappzi.kontactpoints.com';
                var URL = this.API_URL() + "Login";
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
            returnData.getMockMessage = function () {
                return {
                    userId: '534b8e5aaa5e7afc1b23e69b',
                    date: new Date(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                };
            }
            returnData.getSubcategory = function (catArray) {
                var URL = URL1 + "PromotionSubCategory";
                var FetchedData = $http.post(URL, catArray).then(function (result) {
                    console.log(JSON.stringify(result.data));
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getpromotion = function (catArray) {
                var URL = URL1 + "GetPromotion";
                var FetchedData = $http.post(URL, catArray).then(function (result) {
                    console.log(JSON.stringify(result.data));
                    debugger;
                    if (result.data.Data !== null) {
                       
                            promotions=result.data.Data;
                        
                    }
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getStoretime = function (timeArray) {
                var URL = URL1 + "GetStoreTimes";
                var FetchedData = $http.post(URL, timeArray).then(function (result) {
                    debugger;
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getconsumerbonus = function (timeArray) {
                var URL = URL1 + "GetConsumerBonus";
                var FetchedData = $http.post(URL, timeArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.verifyconsumer = function (receiverArray) {
                var URL = URL1 + "Verify_Consumer";
                var FetchedData = $http.post(URL, receiverArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.sendgift = function (receiverArray) {
                var URL = URL1 + "GiftPoints";
                var FetchedData = $http.post(URL, receiverArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getRate = function (merchantArray) {
                var URL = URL1 + "Ratings";
                var FetchedData = $http.post(URL, merchantArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getpostjob = function (id) {
                for (var i = 0; i < promotions.length; i++) {
                    if (promotions[i].SNO == id) {
                        return promotions[i];
                    }
                }
            };
            returnData.InsertMessage = function (messageArray) {
                var URL = URL1 + "InsertMessage";
                var FetchedData = $http.post(URL, messageArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getMessage = function (messageArray) {
                debugger
                var URL = URL1 + "GetMessage";
                var FetchedData = $http.post(URL, messageArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.loginStatus = function (messageArray) {
                var URL = URL1 + "LoginStatusforChat";
                var FetchedData = $http.post(URL, messageArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.forgotpin = function (pinArray) {
                var URL = URL1 + "ForgotPin";
                var FetchedData = $http.post(URL, pinArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.changepin = function (pinArray) {
                var URL = URL1 + "ChangePin";
                var FetchedData = $http.post(URL, pinArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.forgotpassword = function (passwordArray) {
                var URL = URL1 + "ForgotPassword";
                var FetchedData = $http.post(URL, passwordArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.changepassword = function (passwordArray) {
                var URL = URL1 + "ChangePassword";
                var FetchedData = $http.post(URL, passwordArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.transactionRequest = function (trasactionArray) {
                var URL = URL1 + "GetTransactionRequest";
                var FetchedData = $http.post(URL, trasactionArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.acceptReject = function (approvalArray) {
                debugger;
                var URL = URL1 + "UpdateTransactionRequest";
                var FetchedData = $http.post(URL, approvalArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.addiwt = function (iwtArray) {
                debugger;
                var URL = URL1 + "AddIwt";
                var FetchedData = $http.post(URL, iwtArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.iwtlist = function (iwtlistArray) {
                debugger;
                var URL = URL1 + "GetIwtList";
                var FetchedData = $http.post(URL, iwtlistArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.iwtlistupdate = function (updateArray) {
                debugger;
                var URL = URL1 + "UpdateIwt";
                var FetchedData = $http.post(URL, updateArray).then(function (result) {
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.iwtofferlist = function (offerArray) {
                debugger;
                var URL = URL1 + "GetIwtOfferList";
                var FetchedData = $http.post(URL, offerArray).then(function (result) {
                    debugger;
                    offerlists = result.data.Data;
                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.descriptlist = function (descriptArray) {
                debugger;
                var URL = URL1 + "GetIwtDescriptionList";
                var FetchedData = $http.post(URL, descriptArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.acceptoffer = function (acceptArray) {
                debugger;
                var URL = URL1 + "AcceptOffer";
                var FetchedData = $http.post(URL, acceptArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.rejectoffer = function (rejectArray) {
                debugger;
                var URL = URL1 + "RejectOffer";
                var FetchedData = $http.post(URL, rejectArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.IwtInsertMessage = function (IwtmessageArray) {
                var URL = URL1 + "InsertIwtDescription";
                var FetchedData = $http.post(URL, IwtmessageArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.getMerchantlist = function (listArray) {
                var URL = URL1 + "GetLWMerchantLists";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.GetLWByMerchant = function (listArray) {
                var URL = URL1 + "GetLWByMerchants";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result.data;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.giftRWPoints = function (listArray) {
                var URL = URL1 + "GiftRWPoints";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result.data;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.giftLWPoints = function (listArray) {
                var URL = URL1 + "GiftLWPoints";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result.data;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.paymentlist = function (listArray) {
                debugger;
                var URL = URL1 + "GetPayments";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result.data;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.livestatus = function (listArray) {
                debugger;
                var URL = URL1 + "GetLiveStatuss";
                var FetchedData = $http.post(URL, listArray).then(function (result) {
                    console.log(JSON.stringify(result.data));

                    return result.data
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.offerseen = function (seenArray) {
                debugger;
                var URL = URL1 + "UpdateOfferSeen";
                var FetchedData = $http.post(URL, seenArray).then(function (result) {

                    return result;
                }, function (err) {

                })
                return $q.when(FetchedData);
            }
            returnData.keywords = function () {
                var URL = URL1 + "GetKeywords";
                debugger;
                var FetchedData = $http.get(URL).then(function (result) {
                    debugger; // alert(JSON.stringify(result));
                    // console.log(JSON.stringify(result));
                    airlines = result.data.Table;
                    for (var i = 0; i < airlines.length; i++) {
                        moreMovies.push(airlines[i].name);
                    }
                    airlines = airlines.sort(function (a, b) {

                        var airlineA = a.name.toLowerCase();
                        var airlineB = b.name.toLowerCase();
                        if (airlineA > airlineB)
                            return 1;
                        if (airlineA < airlineB)
                            return -1;
                        return 0;
                    });
                }, function (err) {
                    debugger;

                })
                return $q.when(FetchedData);
            }
            returnData.getmovies = function (i) {
                var moviedata = $q.defer();
                var movies;
                debugger;

//                    moreMovies = airlines;
                if (i && i.indexOf('T') != -1)
                    movies = moreMovies.get;
                else
                    movies = moreMovies;

                $timeout(function () {
                    moviedata.resolve(movies);
                }, 1000);

                return moviedata.promise
            }
            returnData.getmrechantoffer = function (mid, offerid) {
                debugger;
                var merchantofferlist = [];
                for (i = 0; i < offerlists.length; i++) {
                    if (offerlists[i].MerchantId == mid && offerlists[i].IwtOfferId == offerid) {
                        merchantofferlist.push(offerlists[i]);
                    }
                }
                for (i = 0; i < offerlists.length; i++) {
                    if (offerlists[i].MerchantId == mid && offerlists[i].IwtOfferId !== offerid) {
                        merchantofferlist.push(offerlists[i]);
                    }
                }
                return merchantofferlist;
            }
             
            return returnData;


        })
//       



