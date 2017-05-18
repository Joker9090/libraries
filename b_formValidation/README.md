# b_formValidation.js
*Copyright (C) 2017 Juan Martin Cerruti*

### Basic use
required Jquery

First you have yo load the b_formValidation.js script in yout html.

```
form = $('.form')
if( formValidate(form) ) {
  //All good
}else{
  //errors
}
```

### handle validations
Inputs and textareas must have data-check Attr
```
<input data-check ...
```

There are many types to check:
```
 noEmpty
 min="{number}"
 max="{number}"
 onlyNumber
 onlyText
 isEmail
```
all as Attrs too

### trigger validations

There are two cases
1) global errorMsgBox

A span, p or label element with the follow attr:
```
data-error-message-box
```

and the error msg in each input or textarea
```
<p data-error-message-box ></p>

<input data-check noEmpty name="firstname" data-error-message="You have to complete the firstname" ...
<input data-check noEmpty name="lastname" data-error-message="You have to complete the lastname" ...
```

2) particular errorMsgBox

A span, p or label element with the follow attr

```
data-error="{here goes the errorMsgBoxName}"

```

and the trigger of the error in the input or textareas
```

<label> Firtname <span class="error hidden" data-error="firstname-error">*You have to complete the firstname</span></label>
<input data-check noEmpty name="firstname" data-show-message-box='[data-error="firstname-error"]' ...

<label> lastname <span class="error hidden" data-error="lastname-error">*You have to complete the lastname</span></label>
<input data-check noEmpty name="lastname" data-show-message-box='[data-error="lastname-error"]' ...
```
