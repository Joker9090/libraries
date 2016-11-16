Object.prototype.getChilds = function(type,val){
  b = [];

  for (var i = 0; i < this.childNodes.length; i++) {
    if(this.childNodes[i].nodeName.toString().toUpperCase() == type.toString().toUpperCase() ){
      b[b.length] = this.childNodes[i];
    }else if(typeof this.childNodes[i].attributes != "undefined"){
      for (var k = 0; k < this.childNodes[i].attributes.length; k++) {
        if( this.childNodes[i].attributes[k].name == type) {
          if(typeof val == "undefined"){
             b[b.length] = this.childNodes[i];
          }else{
            for (var l = 0; l < this.childNodes[i].attributes[k].value.split(" ").length; l++) {
              if(this.childNodes[i].attributes[k].value.split(" ")[l] == val) b[b.length] = this.childNodes[i];
            }
          }

        }
      }
    }
  }

  return b;

}

Object.prototype.removeClass = function(className){
  if(this.getAttribute("class") == null) return this;
  classes = this.getAttribute("class").split(" ");
  newClasses = [];
  for (var i = 0; i < classes.length; i++) {
    if(classes[i].toUpperCase() != className.toUpperCase()) {
      newClasses[newClasses.length] = classes[i];
    }
  }
  this.setAttribute("class",newClasses.join(" ").toString());
  return this;
}

Object.prototype.addClass = function(className){
  if(this.hasClass(className)) return this
  this.setAttribute("class",( (this.getAttribute("class") == null) ? className : this.getAttribute("class")+' '+className ) );
  return this;
}

Object.prototype.hasClass = function(className){
  if(this.getAttribute("class") == null) return false;
  classes = this.getAttribute("class").split(" ");
  for (var i = 0; i < classes.length; i++) {
    if(classes[i].toUpperCase() == className.toUpperCase()) {
      return true;
    }
  }
}

Object.prototype.banimate = function(object,duration,fn){
  // width, height, left, right, top, bottom, opacity
  if(typeof this.canBanimate == "undefined" || this.canBanimate == false){
    this.canBanimate = true;

    exObj = {}
    for (var variable in object) {
      if (object.hasOwnProperty(variable)) {
        exObj[variable] = parseInt((this.style[variable]))
      };
    };

    function frame(t,exObj,object,k,duration,fn) {

      if(k == duration) {
        t.canBanimate = false;
        if(typeof fn == "function") fn(t);
        return
      };
      for (var variable in object) {
        if (object.hasOwnProperty(variable)) {
          dif = parseInt(object[variable]) - parseInt((exObj[variable].isNumber()) ? exObj[variable] : 0);
          frameDif = (dif / duration);
          if(t.style[variable].indexOf("px") > -1){
            t.style[variable] = Number(t.style[variable].removePx()) + frameDif + "px"
          }else if(t.style[variable].indexOf("%") > -1){
            t.style[variable] = Number(t.style[variable].removePorce()) + frameDif + "%"
          }else{
            t.style[variable] = Number(t.style[variable]) + frameDif + "%"
          }

        }
      }
      setTimeout(function(){
        frame(t,exObj,object,k+1,duration,fn)
      },1);
    };

    frame(this,exObj,object,0,duration,fn)
  }
}

String.prototype.removePx = function(){
  return this.replace("px","")
}

String.prototype.removePorce = function(){
  return this.replace("%","")
}

Object.prototype.isNumber = function() {
  return !isNaN(parseFloat(this)) && isFinite(this);
}

checkAnchor = function(){
  this.getHashes = function(){
    return hash = window.location.hash.toString().substring(1,window.location.hash.toString().length);
  }
  this.hasHash = function(hash){
    return (this.getHashes().toString().indexOf(hash) != -1)
  }
  this.clean = function(){
    window.location.hash = "";
  }
  this.put = function(newVal){
    window.location.hash = "#"+newVal;
  }

  this.event = undefined;

  this.hashChange = function(fn){
    that = this;
    document.addEventListener("hashLoad", function(t) {
      return function(e){
        fn(t.getHashes())
      }
    }(that));
    this.triggerEvent();
    this.checkHash();
  }

  this.makeEvent = function(){
    this.event = new CustomEvent("hashLoad");
  }

  this.triggerEvent = function(){
    document.dispatchEvent(this.event);
  }

  this.checkHash = function(fn){
    that = this;
    window.onhashchange = function(){
      that.triggerEvent()
    }
  }

  this.start = function(){
    this.makeEvent();
  }
  this.start();
}

windowEventFunctions = function(){
  this.onResizeFunctions = []
  this.addResizeFunction = function(fn){
    this.onResizeFunctions = this.onResizeFunctions.concat([fn]);
  }
  window.onresize = function(t){
    return function(e){
      for (var i = 0; i < t.onResizeFunctions.length; i++) {
        if(typeof t.onResizeFunctions[i] == "function") t.onResizeFunctions[i]();
      }
    }
  }(this);
}

ExtraScripts = function(){
 self = this;
 self.id = 0;
 self.engineCallScript = function(scriptUrl,end){
   _script = document.createElement("SCRIPT");
   _script.className = "extraScript-" + self.id;
   self.container.appendChild(_script);

   _script.onload = function () { if(typeof end == "function") end(); };

   _script.onerror = function () { console.log("Error calling script main " + scriptUri); };

   _script.src = self.search4Url(scriptUrl);
   self.id++;
 };
 self.callScript = function(scriptUrl,end){
   switch (true) {
     case scriptUrl instanceof Array && scriptUrl.length == 0:
      end();
     break;
     case scriptUrl instanceof Array:
       self.engineCallScript(scriptUrl[0],function(){
        scriptUrl.shift();
        self.callScript(scriptUrl,end)
       });
     break;
     case typeof scriptUrl == "string":
      self.engineCallScript(scriptUrl,end);
     break;
     default:
      console.log("Type Error");
   }
 };
 self.asyncId = 0;
 self.max = [];
 self.timers = [];
 self.callAsyncScript = function(scriptUrl,end){
  this.id = self.asyncId;
  self.asyncId++;
  self.max[this.id] = scriptUrl.length;
  for (var i = 0; i < scriptUrl.length; i++) {
     setTimeout(function(id,globalId){
       self.engineCallScript(scriptUrl[id],function(){  self.max[globalId]--; });
     },50,(i),(this.id));
  }
  self.timers[this.id] = setInterval(function(id){
    if(self.max[id] == 0){
      clearInterval(self.timers[id]);
      end();
    }
  },50,(this.id));

 }
 self.urls = {};

 self.setUrls = function(obj){ self.urls = obj; };

 self.search4Url = function(url){
   return (typeof self.urls[url] == "string") ? self.urls[url] : url ;
 };

 self.container = document.getElementsByTagName("BODY")[0];
 self.setContainer = function(newElement){
   self.container = newElement;
 };
   return self;
};
