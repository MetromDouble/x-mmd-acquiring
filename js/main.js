$( document ).ready(function() {
  $("#menu-toggler").click(function () {
    $("#sidebar").toggleClass("sidebar_open");
    $(this).toggleClass("menu-toggler_open")
  });

});
