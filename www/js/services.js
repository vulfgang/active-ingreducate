angular.module('app.services', [])

.service('OCRService', ['CaptureService', function(image){
  return {
    getText: function() {
      return OCRAD(image);
    }
  };
  // var string = OCRAD(image);
  // this.getText = function() {
  //   return string;
  // };
}])

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
}])

.service('ParserService', ['OCRService', function(QCRService){
  //
}]);