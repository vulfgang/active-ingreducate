angular.module('app.controllers', [])
   
.controller('captureCtrl', ['$scope', 'Camera', 'ParserService', function($scope, Camera, ParserService) {
  $scope.getPhoto = function() {

    $scope.lastPhoto = '/img/sample.jpg';
    $scope.ocrString = 'de';

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('IMG');
    img.src = '/img/sample.jpg';
    img.onload = function() {
      context.drawImage(img, 0, 0, img.width, img.height);
      context.getImageData(0, 0, img.width, img.height);
      var text = OCRAD(canvas);
      var parsed = ParserService.getParsed(text);
      document.getElementById("ocrString").innerHTML = text;
      document.getElementById("parsed").innerHTML = parsed;
    };
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
}])

.controller('historyCtrl', function($scope) {

});
 