angular.module('app.services', [])

.service('OCRService', ['CaptureService', function(image){
  var string = OCRAD(image);
  this.getText = function() {
    return string;
  };
}])

.service('ParserService', ['OCRService', function(QCRService){
  //
}]);