var module = angular.module('starter.controllers', []);

module.controller('DashCtrl', function ($ionicPlatform, $cordovaCamera, $scope) {
    $scope.ready = "Not ready";

    $scope.touchHardware = function () {
        $scope.camera = "Button Pressed...";
        $ionicPlatform.ready(function () {
            $scope.camera = "Trying Setup...";
            var options = {
                quality: 50,
                //destinationType: Camera.DestinationType.DATA_URL,
                //sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                //encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $scope.camera = "Calling Camera...";
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.camera = "Success";
                //var image = document.getElementById('myImage');
                //image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                $scope.camera = "Error: " + err;
                // error
            });
        });
    };

    $ionicPlatform.ready(function () {
        $scope.ready = "Ready";
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
