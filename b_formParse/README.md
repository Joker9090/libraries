# formPase.js
*Copyright (C) 2017 Juan Martin Cerruti*

### Basic use

First you have yo load the b_formParse.js script in yout html.


### handle
```
form = document.querySelectorAll("form")[0]
form.onsubmit = function(e){
  e.preventDefault();
  e.stopPropagation();
  pritierObjCombine(serializeForm(form))
}
```

### example

For example file use example.html

Form:
```
<input type="text" name="title" value="">
<input type="text" name="main.title" value="">
<input type="text" name="main.description" value="">
<input type="text" name="main.section.description" value="">
<input type="text" name="main.section.title" value="">
<input type="text" name="main.section.item[0]title" value="">
<input type="text" name="main.section.item[1]title" value="">
<input type="text" name="main.section.item[2]title" value="">
```


after this
```
pritierObjCombine(serializeForm(form))
```

result:
```
{
   "title":"[value]",
   "main":{
      "description":"[value]",
      "title":"[value]",
      "section":{
         "description":"[value]",
         "title":"[value]",
         "item":[
            {
               "title":"[value]"
            },
            {
               "title":"[value]"
            },
            {
               "title":"[value]"
            }
         ]
      }
   }
}
```
