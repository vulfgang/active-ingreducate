angular.module('app.controllers', [])
   
.controller('captureCtrl', function($scope, Camera, $cordovaFileTransfer) {
  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false,
      correctOrientation: true
    });

    return $scope.lastPhoto;
  };

  $scope.parsePhoto = function(imageURI) {
    var ocrString;

    var options = {
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: 'image/jpg'
    };
    $cordovaFileTransfer.upload("http://192.168.43.96/ocr", imageURI, options).then(function(result) {
      ocrString = JSON.stringify(result.response);
      console.log("SUCCESS: " + ocrString);
    }, function(err) {
      ocrString = JSON.stringify(err);
      console.log("ERROR: " + ocrString);
    }, function (progress) {
      ocrString = JSON.stringify(progress);
      console.log("PROGRESS: " + ocrString);
    });

    return ocrString;
  };

  $scope.getAndParsePhoto = function() {
    var imageURI = $scope.getPhoto(); // also sets $scope.lastPhoto
    $scope.parsedString = $scope.parsePhoto(imageURI);
  };
})

.controller('historyCtrl', function($scope) {

});
 