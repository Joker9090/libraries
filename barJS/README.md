# barJS.js
*Copyright (C) 2016 Juan Martin Cerruti*

A little helper-lib instead of JQuery

### Content


```
Object.prototype.getChilds(type,Val)
Object.prototype.removeClass(className)
Object.prototype.addClass(className)
Object.prototype.hasClass(className)
Object.prototype.banimate(o,duration,callback)
Object.prototype.isNumber(className)
checkAnchor()
windowEventFunctions() // removed in 1.2
ExtraScripts()
AutoDestructChecker(c,doOn,doWhile) // only in 1.2
requestFullScreen() // only in 1.2
checkMobile() // only in 1.2
```

### getChilds

This function return all next childsNodes from a parentObject. Searching for Attr , Attr && Value or HTML name

```
e = document.getElementById("anyId")
e.getChilds("div") // or
e.getChilds("class") // or
e.getChilds("class","fix-top")
```

### removeClass

This function removeClass if object has the class

```
e = document.getElementById("anyId")
e.removeClass("fix-top")
```

### addClass

This function addClass if object hasn't the class

```
e = document.getElementById("anyId")
e.addClass("fix-top")
```

### hasClass

This function check if object hasClass

```
e = document.getElementById("anyId")
if(e.hasClass("fix-top")) console.log("I know it");
```

### banimate

This function is like .animate from jquery but only can animate width, height, left, right, top, bottom, opacity
```
e = document.getElementById("anyId")
e.banimate({
  width: "100%",
  top: "60px"
},100,function(){
  console.log("done")
})
```

### isNumber

This function check if var is number

```
var nubmer = 14
if(nubmer.isNumber())  console.log("I know it");
```

### checkAnchor

This function helps you to handle hashChanges ( Anchors )

```
CA = new checkAnchor();

CA.hashChange(function(hashes){

  switch (true) {
    case CA.hasHash("all"): console.log("hash have all"); break;
    case CA.hasHash("home"): console.log("hash have home"); break;
    case CA.hasHash("woman"): console.log("hash have woman"); break;
    case CA.hasHash("man"): console.log("hash have man"); break;
    case CA.hasHash("kids"): console.log("hash have kids"); break;
    default: console.log("cant get Hash")
  }

});

CA.clean() // clean anchor
CA.put("all")  // put #all in anchor
```


### v1.2

## ADD AutoDestructChecker with params condition,doOnCondition,doWhileCondition
Its like a setInterval with a selfDestroy button
You have to pass functions in the params

## ADD requestFullScreen function to convert the webpage in FullScreen app
Also with window.FULLSCREEN Var to ask if is in FULLSCREEN mode

## ADD checkMobile function to check if the browser is mobile

## REOVE windowEventFunctions function thats sucks


### FOR ExtraScripts

Please visit link

```
https://github.com/Joker9090/libraries/tree/master/b_extraScripts
```
