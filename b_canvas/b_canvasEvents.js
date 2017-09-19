CanvasEvents = function(){
  ce_self = this;
  ce_self.KeyEvents = Array();
  ce_self.KeyEventsIntervals = Array();
  ce_self.addKeyEvent = function(k,fn){
    if(typeof k == "object") { ce_self.parseObjectKeyEvent(k) }
    else { ce_self.KeyEvents[k] = fn
        tempObj = {
          keyCode  : k,
          function : fn,
          block : false,
          delay: 500
        };
        ce_self.parseObjectKeyEvent(tempObj);
    }
  }
  ce_self.parseObjectKeyEvent = function(obj){
      ce_self.KeyEvents[obj.keyCode] = obj
  }
  ce_self.keyEventStart = function(){
    window.onkeydown = function(e){
      if(typeof ce_self.KeyEvents[e.keyCode] == "object") {
        if(typeof ce_self.KeyEventsIntervals[e.keyCode] == "undefined" ){
          ce_self.KeyEvents[e.keyCode].function();
          ce_self.KeyEventsIntervals[e.keyCode] = setInterval(function(keyCode){
            if(ce_self.KeyEvents[keyCode].block == true){
                clearInterval(ce_self.KeyEventsIntervals[keyCode])
                ce_self.KeyEventsIntervals[e.keyCode] = undefined;
                if(typeof ce_self.KeyEvents[e.keyCode].endAction == "function") ce_self.KeyEvents[e.keyCode].endAction();
            }else{
              ce_self.KeyEvents[keyCode].function();
            }
         },ce_self.KeyEvents[e.keyCode].delay,(e.keyCode))
        }
      }
    }
    window.onkeyup = function(e){
      if(typeof ce_self.KeyEvents[e.keyCode] == "object" && ce_self.KeyEvents[e.keyCode].block != true) {
        if(typeof ce_self.KeyEventsIntervals[e.keyCode] != "undefined"){
          clearInterval(ce_self.KeyEventsIntervals[e.keyCode])
          ce_self.KeyEventsIntervals[e.keyCode] = undefined;
          if(typeof ce_self.KeyEvents[e.keyCode].keyReleaseFunction == "function") ce_self.KeyEvents[e.keyCode].keyReleaseFunction();
        }
      }
    }

  }()

  ce_self.addClickEvent = function(canvas, ks){
    this.config  = {
      scaled: false,
    }
    this.setConfig = function(n,v){
      this.config[n] = v
      this.setCanvasClick(this.config)
    }
    this.setCanvasClick = function(config){
      canvas.onclick = function(t){
        return function(event){
          var rect = canvas.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
          for (var i = 0; i < ks.length; i++) {
            if(t.scaled){
              var x = (canvas.width * event.clientX) / window.innerWidth;
              var y = (canvas.height * event.clientY) / window.innerHeight;
            }
            if(typeof ks[i].clickInside == "function"){
              if(( x > ks[i].drawPosX() && x < ks[i].drawPosX()+ks[i].width )
              &&( y > ks[i].drawPosY() && y < ks[i].drawPosY() + ks[i].height )){
                ks[i].clickInside();
              }
            }
          }
        }
      }(config)
    }
    this.setCanvasClick(this.config);


    return this;
  }

}
