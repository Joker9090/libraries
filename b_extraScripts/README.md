# b_extraScript.js
*Copyright (C) 2016 Juan Martin Cerruti*

### Basic use

First you have yo load the b_extraScript.js script in yout html.
 

```
extraScript.callScript("example/url.js",callbackFunction)
```

### ArrayMode use

You can put an array to call diferents js at time

```
extraScript.callScript(["example/url0.js","example/url1.js"],callbackFunction)
```

### URLRemplaceMod use

You can replaceUrls for shorts strings

```
urls = {
  "url0" : "example/url0.js",
  "url1"   : "example/url1.js"
};
extraScript.setUrls(urls);
extraScript.callScript(["url0","url1"],callbackFunction)
```

### AsynCall use

You can make asyncCalls

```
urls = {
  "url0" : "example/url0.js",
  "url1"   : "example/url1.js"
};
extraScript.setUrls(urls);
extraScript.callAsyncScript(["url0","url1"],callbackFunction)
```

### Change Where put scripts after loaded

You can make asyncCalls

```
newPlace = document.getElementsByTagName("section")[1]
extraScript.setContainer(newPlace);

extraScript.callScript("example/url1.js",callbackFunction)
```



