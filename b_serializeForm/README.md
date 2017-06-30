# b_serializeForm.js
*Copyright (C) 2017 Juan Martin Cerruti*

### Basic use

First you have yo load the b_serializeForm.js script in yout html.

Works with inputs, selects, textarea

### handle
```
form = document.querySelectorAll("form")[0]
form.onsubmit = function(e){
  e.preventDefault();
  e.stopPropagation();
  serializeForm(form)
}
```

### example

Form:
```
<input type="text" name="title" value="a">
<input type="text" name="description" value="b">
<input type="text" name="optionA" value="c">
<input type="text" name="optionB" value="d">
```

after this
```
serializeForm(form)
```

result:
```
{
	"title": "a",
	"description": "b",
	"optionA": "c",
	"optionB": "d"
}
```
