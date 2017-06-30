function serializeForm(form){
  var obj = {};
  var elements = form.querySelectorAll("input, select, textarea" );
  for( var i = 0; i < elements.length; ++i ) {
      var element = elements[i];
      var name = element.name;
      var value = (element.value === "true") ? true : (element.value === "false") ? false : element.value;

      if( name ) {
          obj[ name ] = value;
      }
  }

  removeEmpties = function(obj) {
   var newObj = {}
   for (var key in obj) {
     if(obj[key] instanceof Array) {
       newObj[key] = Array();
       for (var i = 0; i < obj[key].length; i++) {
         newObj[key].push(removeEmpties(obj[key][i]))
       }
     }else if(typeof obj[key] === "object") {
       newObj[key] = removeEmpties(obj[key])
     }else if ((obj.hasOwnProperty(key)) && (obj[key] !== null) && (obj[key] !== "") && (obj[key] !== undefined)) {
       newObj[key] = obj[key];
     }
   }
   return newObj
  }

  return removeEmpties(obj);
}
