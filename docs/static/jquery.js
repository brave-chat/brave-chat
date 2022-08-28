!(function ($) {
  "use strict";
  $("#menu-btn").on("click", function (t) {
    t.preventDefault(),
      $("body").toggleClass("sidebar-enable"),
      992 <= $(window).width()
        ? $("body").toggleClass("toggle-menu")
        : $("body").removeClass("toggle-menu");
  }),
    $(".sidebar-menu a").each(function () {
      var t = window.location.href.split(/[?#]/)[0];
      this.href == t &&
        ($(this).addClass("active"),
        $(this).parent().addClass("menu-active"),
        $(this).parent().parent().addClass("mm-show"),
        $(this).parent().parent().prev().addClass("menu-active"),
        $(this).parent().parent().parent().addClass("menu-active"),
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass("menu-active"));
    })

})(jQuery);
