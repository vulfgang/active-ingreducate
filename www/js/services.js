angular.module('app.services', [])

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

.service('ParserService', [function() {
  this.getParsed = function(text)
  {
    // Assume that the text is accurate.
    console.log('Begin parsing text:\n' + text + '\n*~*~*~*~*~*~*~*');
    
    var result;

    // Food ingredients list.
    if (text.toLowerCase().indexOf('ingredients') > -1)
    {
      text = text.replace('/.*:(.*)/', '$1');
      var ingredients = text.split(',');
      for (var ingredient in ingredients)
      {
        ingredient = ingredient.trim();
      }
      result = ingredients;
    }
    // Drugs active ingredients list.
    else if (text.indexOf('...') > -1)
    {
      var active_ingredients = text.replace('/^\s*(.*)\.\.+/mg', '$1');
      for (var active_ingredient in active_ingredients)
      {
        active_ingredient = active_ingredient.trim();
      }
      result = active_ingredients;
    }
    return result;
  };
}]);