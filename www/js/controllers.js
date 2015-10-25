angular.module('app.controllers', [])
   
.controller('captureCtrl', function($scope, Camera, $cordovaFileTransfer) {
  $scope.getPhoto = function(callback) {
    Camera.getPicture().then(function(imageURI) {
      // document.write(imageURI);

      $scope.lastPhoto = imageURI;
      callback(imageURI);
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: true,
      correctOrientation: true
    });
  };

  $scope.parsePhoto = function(imageURI) {
    var ocrString;

    var options = {
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: 'image/jpg',
      headers: 'Content-Type: image/jpg'
    };
    // document.write('doge');
    // document.write(imageURI);
    $cordovaFileTransfer.upload(
      "http://192.168.43.96:9000/ocr",
      imageURI,
      options,
      true
    ).then(
      function(result) {
        ocrString = JSON.stringify(result.response);
        // console.log("SUCCESS: " + ocrString);
        $scope.parsedString = ocrString;
        document.getElementById('success').innerHTML = "SUCCESS" + ocrString;
        // return ocrString;
      },
      function(err) {
        ocrString = JSON.stringify(err);
        // console.log("ERROR: " + ocrString);
        document.getElementById('error').innerHTML = "ERROR: " + ocrString;
        // return err;
      },
      function(progress) {
        ocrString = JSON.stringify(progress);
        // console.log("ERROR: " + ocrString);
        document.getElementById('progress').innerHTML = "PROGRESS: " + ocrString;
        // return err;
      }
    );
    // return ocrString;
  };

  $scope.getAndParsePhoto = function() {
    $scope.getPhoto(function(imageURI) {
      $scope.parsePhoto(imageURI);
    });
  };
})

.controller('historyCtrl', function($scope) {

});
 