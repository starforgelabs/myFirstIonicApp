var module = angular.module('starter.controllers', []);

module.controller('DashCtrl', function ($cordovaBarcodeScanner,
                                        $cordovaCamera,
                                        $cordovaVibration,
                                        $ionicPlatform,
                                        $scope) {
    $scope.ready = "Not ready";

    $scope.touchHardware = function () {
        $scope.camera = "Button Pressed...";
        $ionicPlatform.ready(function () {
            $scope.camera = "Trying Setup...";
            try {
                var options = {
                    quality: 50,
                    destinationType: 0, // Camera.DestinationType.DATA_URL,
                    sourceType: 1, // Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: 0, // Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    //popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };
            } catch (error) {
                $scope.camera = "Setup threw an exception: " + error;

            }

            $scope.camera = "Calling Camera...";
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.camera = "Success";
                var image = document.getElementById('cameraTest');
                image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                $scope.camera = "Error: " + err;
                // error
            });
        });
    };

    $scope.touchBzz = function () {
        $scope.bzz = "Not ready";

        $ionicPlatform.ready(function () {
            $scope.bzz = "Calling Bzz...";
            try {
                $cordovaVibration.vibrate(100);
                $scope.bzz = "Bzz!";
            } catch (error) {
                $scope.bzz = "Error: " + error;
            }
        });
    };

    $scope.touchScan = function () {
        $scope.scan = "Button Pressed...";
        $ionicPlatform.ready(function () {
            $scope.scan = "Calling Camera...";
            try {
                $cordovaBarcodeScanner.scan().then(function (data) {
                    $scope.scan = "Success";
                    $scope.scanData = data;
                }, function (err) {
                    $scope.scan = "Error: " + err;
                });
            } catch (error) {
                $socpe.scan = "Error: " + error;
            }
        });
    };

    $ionicPlatform.ready(function () {
        $scope.ready = "Ready";

        $scope.$on('$cordovaBatteryStatus:status', function (result) {
            $scope.battery = "Status Called";
            $scope.batteryLevel = result.level;
            $scope.batteryPluggedIn = result.isPlugged ? "Yes" : "No";
        });

        $scope.$on('$cordovaBatteryStatus:critical', function (result) {
            $scope.battery = "Critical Called";
            $scope.batteryLevel = result.level;
            $scope.batteryPluggedIn = result.isPlugged ? "Yes" : "No";
        });

        $scope.$on('$cordovaBatteryStatus:low', function (result) {
            $scope.battery = "Low Called";
            $scope.batteryLevel = result.level;
            $scope.batteryPluggedIn = result.isPlugged ? "Yes" : "No";
        });
    });
});

module.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
});

module.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});

module.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
