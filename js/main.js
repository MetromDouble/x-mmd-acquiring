$( document ).ready(function() {
  $("#menu-toggler").click(function () {
    $("#sidebar").toggleClass("sidebar_open");
    $(this).toggleClass("menu-toggler_open")
  });

  var FormValidate = function () {
    var self = this;
    this.cardnumber = false;
    this.holder = false;
    this.cvv = false;

    this.defaultColor = "";

    this.check = function (elem, elemType, maxChars, checkType) {
      self.defaultColor = elem.css("border-color");
      if (checkType == "digit") {
        if (elemType == "cardnumber") {
          self.cardnumber = self.doOnlyDigit(elem, maxChars);
        }
        if (elemType == "cvv") {
          self.cvv = self.doOnlyDigit(elem, maxChars);
        }
      }
      if (checkType == "text") {
        if (elemType == "holder") {
          self.holder = self.doOnlyText(elem, maxChars);
        }
      }
      if (self.cardnumber || self.holder || self.cvv) {
        elem.css("border-color", "red");
        elem.parent().addClass("card__fields_warning");
      }
      if ( (elemType == "cardnumber" && !self.cardnumber) ||
           (elemType == "holder" && !self.holder) ||
           (elemType == "cvv" && !self.cvv) ){
        elem.css("border-color", self.defaultColor);
        elem.parent().removeClass("card__fields_warning");
      }
    }
  }

  FormValidate.prototype = {
    doOnlyDigit: function (elem, maxChars) {
      if (elem.val().length >= maxChars) {
        while (!(elem.val().length <= maxChars)) {
          elem.val(elem.val().replace(/[-\\\.\/\{\}\[\]\ `~|<>?();&^@!=$*"_%+#:'0-9a-zA-Zа-яА-Я]$/i,""));
        }
      }
      if(elem.val().match(/[-\\\.\/\{\}\[\]\ `~|<>?();&^@!=$*"_%+#:'a-zA-Zа-яА-Я]/ig)) {
        elem.val(elem.val().replace(/[-\\\.\/\{\}\[\]\ `~|<>?();&^@!=$*"_%+#:'a-zA-Zа-яА-Я]/ig,""));
        return true;
      }
      return false;
    },
    doOnlyText: function (elem, maxChars) {
      if (elem.val().length >= maxChars) {
        while (!(elem.val().length <= maxChars)) {
          elem.val(elem.val().replace(/[-\\\.\/\{\}\[\]`~|<>?();&^@!=$*"_%+#:'0-9a-zA-Zа-яА-Я]$/i,""));
        }
      }
      if(elem.val().match(/[-\\\.\/\{\}\[\]`~|<>?();&^@!=$*"_%+#:'0-9а-яА-Я]/ig)) {
        elem.val(elem.val().replace(/[-\\\.\/\{\}\[\]`~|<>?();&^@!=$*"_%+#:'0-9а-яА-Я]/ig,""));
        return true;
      }
      return false;
    }
  }

  var formValidate = new FormValidate;

  $("#card-number > input").each(function () {
    $(this).keyup(function () {
      formValidate.check($(this), "cardnumber", 4, "digit");
      if ($(this).val().length >= 4) {
        $(this).next().focus();
      }
    });
    $(this).change(function () {
      formValidate.check($(this), "cardnumber", 4, "digit");
    });

  });

  $("#card-cvv").keyup(function () {
    formValidate.check($(this), "cvv", 3, "digit");
  });
  $("#card-cvv").change(function () {
    formValidate.check($(this), "cvv", 3, "digit");
  });

  $("#card-holder").keyup(function () {
    formValidate.check($(this), "holder", 120, "text");
  });
});
