# formParse.js
*Copyright (C) 2017 Juan Martin Cerruti*

### Basic use

First you have yo load the b_formParse.js script in yout html.

IMPORTANT -> This js cames with serializeForm function.
For more info search b_serializeForm in my libs repo

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
<input type="text" name="title" value="a">
<input type="text" name="main.title" value="b">
<input type="text" name="main.description" value="c">
<input type="text" name="main.section.description" value="d">
<input type="text" name="main.section.title" value="e">
<input type="text" name="main.section.item[0]" value="f">
<input type="text" name="main.section.item[1]" value="g">
<input type="text" name="main.section.item[2]" value="h">
<input type="text" name="main.section.itemTitle[0]title" value="i">
<input type="text" name="main.section.itemTitle[0]description" value="j">
<input type="text" name="main.section.itemTitle[1]title" value="k">
<input type="text" name="main.section.itemTitle[1]description" value="l">
<input type="text" name="main.section.itemTitle[2]title" value="m">
<input type="text" name="main.section.itemTitle[2]description" value="n">

<input type="text" name="main.section.itemObject[0]title" value="q">
<input type="text" name="main.section.itemObject[0]item.title" value="r">
<input type="text" name="main.section.itemObject[0]item.description" value="s">
<input type="text" name="main.section.itemObject[1]item.title" value="t">
<input type="text" name="main.section.itemObject[1]item.description" value="u">
```


after this
```
pritierObjCombine(serializeForm(form))
```

result:
```
{
	"title": "a",
	"main": {
		"title": "b",
		"description": "c",
		"section": {
			"description": "d",
			"title": "e",
			"item": ["f", "g", "h"],
			"itemTitle": [{
				"title": "i",
				"description": "j"
			}, {
				"title": "k",
				"description": "l"
			}, {
				"title": "m",
				"description": "n"
			}],
			"itemObject": [{
				"title": "q",
				"item": {
					"description": "s"
				}
			}, {
				"item": {
					"description": "u"
				}
			}]
		}
	}
}
```
