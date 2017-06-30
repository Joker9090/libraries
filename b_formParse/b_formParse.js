function serializeForm(form){
      var obj = {};
      var elements = form.querySelectorAll("input, select, textarea" );
      for( var i = 0; i < elements.length; ++i ) {
          var element = elements[i];
          var name = element.name;
          var value = element.value;

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

    pritierObjCombine = function(formObject){

      function getNumberOfArrayVal(string){
          return parseInt(string.replace("[","").replace("]",""))
      }
      function merge_options(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) {
          if(Array.isArray(obj1[attrname])){
            obj3[attrname] = (obj3[attrname] === undefined) ? (Array().concat(obj1[attrname])) : obj3[attrname].concat(obj1[attrname]);
          }else{
            obj3[attrname] = (typeof obj1[attrname] == "object" && typeof obj3[attrname] == "object" ) ? merge_options(obj3[attrname],obj1[attrname]) : obj1[attrname];
          }
        }
        for (var attrname in obj2) {
          if(Array.isArray(obj2[attrname])){
            obj3[attrname] = (obj3[attrname] === undefined) ? (Array().concat(obj2[attrname])) : obj3[attrname].concat(obj2[attrname]);
          }else{
            obj3[attrname] = (typeof obj2[attrname] == "object" && typeof obj3[attrname] == "object" ) ? merge_options(obj3[attrname],obj2[attrname]) : obj2[attrname];
          }
        }
        return obj3;
      }

      RunParser = function(formObject){

        function engine(fo){
          var newObj = {};
          var arrayPos = [];
          for (var variable in fo) {
            if (fo.hasOwnProperty(variable)) {
              var is = (variable.indexOf(".") >= 0 && ( variable.indexOf(".") < variable.search(/(\[\d\])/) || variable.search(/(\[\d\])/) < 0 ) )
              ? "obj"
              : (variable.indexOf("]") >= 0 && ( variable.search(/(\[\d\])/) < variable.indexOf(".") || variable.indexOf(".") < 0 ) )
              ? "arr"
              : "var";

              switch (is) {
                case "obj":
                  var nameSplitted = variable.split(".");
                  var name = nameSplitted[0];
                  nameSplitted.shift();
                  var innerKey = nameSplitted.join(".");
                  newObj[name] = merge_options(newObj[name], { [innerKey] : fo[variable] });
                break;
                case "arr":
                  var nameSplitted = variable.split(/(\[\d\])/);
                  var number = getNumberOfArrayVal(nameSplitted[1])
                  var name = nameSplitted[0];
                  nameSplitted.shift();
                  var innerKey = "";
                  for (var i = 1; i < nameSplitted.length; i++) {
                    innerKey += nameSplitted[i] + ( ( (i+1) == nameSplitted.length) ? "" : "["+i+"]");
                  }
                  if(newObj[name] === undefined){
                    newObj[name] = [];
                  }
                  if(newObj[name][number] === undefined){
                    newObj[name].push(engine( { [innerKey] : fo[variable] } ))
                  }else{
                    newObj[name][number] = Object.assign({},newObj[name][number],engine( { [innerKey] : fo[variable] } ))
                  }
                break;
                default:
                  if(variable !== "" && variable !== "0"){
                    newObj[variable] = fo[variable]
                  }else{
                    newObj = fo[variable];
                  }
                break;
              }
            }
          }
          for (var variable in newObj) {
            if (newObj.hasOwnProperty(variable)) {
              if(Array.isArray(newObj[variable])){
                for (var i = 0; i < newObj[variable].length; i++) {
                  newObj[variable][i] = (typeof newObj[variable][i] === "object") ? engine(newObj[variable][i]) : newObj[variable][i]
                }
              }else{
                newObj[variable] = (typeof newObj[variable] === "object") ? engine(newObj[variable]) : newObj[variable]
              }
            }
          }
          return newObj;
        }
        return engine(formObject)
      }

      return new RunParser(formObject);

    }
