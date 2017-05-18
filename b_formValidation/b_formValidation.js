formValidate = function(form){
  this.form = form
  this.toCheckItems = function(){
    _arr = new Array();
    form.children("*[data-check]").each(function(t,i){
      _arr.push(this)
    })
    return _arr
  }
  this.errorBox = form.children("*[data-error-message-box]")
  this.errors = Array();
  this.revertErrors = function(){
    this.errors = Array();
    this.errorBox.innerHTML = "";
    this.itarate(this.toCheckItems(),function(head){
      if(head.hasAttribute("data-show-message-box")){
        $((head.getAttribute("data-show-message-box"))).addClass("hidden")
      }
    })
  }
  this.validateEmail = function(email) {
    var re = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    return re.test(email);
  }
  this.validateNumber = function(number) {
    var re = /^\d+$/
    return re.test(number)
  }
  this.validateText = function(text) {
    var re = /^[a-zA-Z]+$/
    return re.test(text)
  }
  this.makeError = function(i,errorMsg){
    this.errors[this.errors.length] = {
      object: $(i),
      text: $(i).val(),
      error: errorMsg
    }
    if(i.hasAttribute("data-show-message-box")){
      $((i.getAttribute("data-show-message-box"))).removeClass("hidden")
    }else if(i.hasAttribute("data-error-message")){
      if(this.errorBox.innerHTML != "") this.errorBox.innerHTML = i.Attr("data-error-message")
    }
  }
  this.itarate = function(arr,fn){
    head = arr[0];
    tail = arr.splice(1,arr.length)
    fn(head)
    if(tail.length > 0) this.itarate(tail,fn);
  }
  this.check = function(arr){
    this.itarate(arr,function(head){
      switch (true) {
        case (
          head.hasAttribute("noEmpty")
          &&
          parseInt($(head).val().length) == 0
        ):
          this.makeError(head,"noEmpty")
        break;
        case (
          head.hasAttribute("min")
          &&
          parseInt(head.getAttribute("min")) >= $(head).val().length
        ): this.makeError(head,"min")
        break;
        case (
          head.hasAttribute("max")
          &&
          parseInt(head.getAttribute("min")) <= $(head).val().length
        ): this.makeError(head,"max")
        break;
        case (
          head.hasAttribute("onlyNumber")
          &&
          !this.validateNumber($(head).val())
        ): this.makeError(head,"onlyNumber")
        break;
        case (
          head.hasAttribute("onlyText")
          &&
          !this.validateText($(head).val())
        ): this.makeError(head,"onlyText")
        break;
        case (
          head.hasAttribute("isEmail")
          &&
          !this.validateEmail($(head).val())
        ): this.makeError(head,"isEmail")
        break;
      }
    })
    console.log(this.errors)
    return (this.errors.length > 0) ? false : true;
  }

  this.revertErrors()
  return this.check(this.toCheckItems())
}
