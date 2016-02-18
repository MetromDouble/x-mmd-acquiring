$( document ).ready(function() {
  /* Включение/отключение мобильного меню */
  $("#menu-toggler").click(function () {
    $("#sidebar").toggleClass("sidebar_open");
    $(this).toggleClass("menu-toggler_open")
  });
  /*
  * Class FormValidate()
  * Предназначен для хранения состояния формы
  */
  var FormValidate = function () {
    var self = this;
    this.cardnumber = false;
    this.holder = false;
    this.cvv = false;
    this.maySubmit = true;

    this.defaultColor = "";
    /* void check(jQuery elem, string elemType, number maxChars, string checkType)
    * @elem - элемент для проверки и изменения
    * @elemType - тип элемента
    * @maxChars - максимальное количество символов
    *
    * Метод является обработчиком события для текстовых полей формы
    */
    this.check = function (elem, elemType, maxChars) {
      if (!self.cardnumber && !self.holder && !self.cvv) {
        self.defaultColor = elem.css("border-color");
      }
      if (elemType == "cardnumber") {
        self.cardnumber = self.doOnlyDigit(elem, maxChars);
      }
      if (elemType == "cvv") {
        self.cvv = self.doOnlyDigit(elem, maxChars);
      }
      if (elemType == "holder") {
        self.holder = self.doOnlyText(elem, maxChars);
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
    /* void submitCheck(jQuery elem, string elemType, number minChars, number maxChars, string checkType)
    * @elem - элемент для проверки и изменения
    * @elemType - тип элемента
    * @minChars - минимальное количество символов
    * @maxChars - максимальное количество символов
    *
    * Метод для финальной проверки формы
    */
    this.submitCheck = function (elem, elemType, minChars, maxChars) {
      self.maySubmit = self.maySubmit && true;
      self.check(elem, elemType, maxChars);
      if (elem.val().length < minChars) {
        self.maySubmit = false;
        elem.css("border-color", "red");
      } else {
        elem.css("border-color", self.defaultColor);
      }
    }
  }

  FormValidate.prototype = {
    /* bool doOnlyDigit(jQuery elem, number maxChars)
    * bool doOnlyText(jQuery elem, number maxChars)
    * @elem - элемент для проверки и изменения
    * @maxChars - максимальное количество символов
    *
    * Методы, непосредственно проверяющие и изменяющие текстовые поля формы
    */
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

  /* Обработчики для полей номера карты */
  $("#card-number > input").each(function () {
    $(this).keyup(function () {
      formValidate.check($(this), "cardnumber", 4);
      if ($(this).val().length >= 4) {
        $(this).next().focus();
      }
    });
    $(this).change(function () {
      formValidate.check($(this), "cardnumber", 4);
    });

  });

  /* Обработчики для поля ввода cvv-кода */
  $("#card-cvv").keyup(function () {
    formValidate.check($(this), "cvv", 3);
  });
  $("#card-cvv").change(function () {
    formValidate.check($(this), "cvv", 3);
  });

  /* Обработчики для поля ввода имени владельца карты */
  $("#card-holder").keyup(function () {
    formValidate.check($(this), "holder", 120);
  });
  $("#card-holder").change(function () {
    formValidate.check($(this), "holder", 120);
  });

  /* Обработчик отправки формы */
  $("#cardform-paybutton").click(function () {
    formValidate.maySubmit = true;
    $("#card-number > input").each(function () {
      formValidate.submitCheck($(this), "cardnumber", 4, 4);
    });
    formValidate.submitCheck($("#card-cvv"), "cvv", 3, 3);
    formValidate.submitCheck($("#card-holder"), "holder", 4, 120);
    if (formValidate.maySubmit) {
      $("#cardform").submit();
    }
  });
});
