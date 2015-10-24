angular.module('app.controllers', [])
   
.controller('captureCtrl', ['$scope', 'Camera', function($scope, Camera) {
  $scope.getPhoto = function() {
    $scope.lastPhoto = '/img/sample.jpg';
    $scope.ocrString = 'doge';

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('IMG');
    img.src = '/img/sample.jpg';
    img.onload = function() {
      document.write('hi');
      context.drawImage(img, 0, 0 );
      var myData = context.getImageData(0, 0, img.width, img.height);
      $scope.ocrString = OCRAD(myData);
      if ($scope.ocrString.length !== 0) {
        $scope.ocrString = 'doge';
      }
    };

    // Camera.getPicture().then(function(imageURI) {
    //   console.log(imageURI);
    //   $scope.lastPhoto = imageURI;
    //   var ocrString = OCRAD(imageURI);
    // }, function(err) {
    //   console.err(err);
    // }, {
    //   quality: 75,
    //   targetWidth: 320,
    //   targetHeight: 320,
    //   saveToPhotoAlbum: false,
    //   correctOrientation: true
    // });
  };
}])

.controller('historyCtrl', function($scope) {

});
 