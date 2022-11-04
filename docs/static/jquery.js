!(function ($) {
  "use strict";
  $(document).ready(function() {  

      setTimeout(() => { 
    $("#menu-btn").on("click", function (t) {
      t.preventDefault();
        $("body").toggleClass("sidebar-enable");
        992 <= $(window).width()
          ? $("body").toggleClass("toggle-menu")
          : $("body").removeClass("toggle-menu");
    });
      $(".sidebar-menu a").each(function () {
        $(window).on("load", function () {
          $(".loader").fadeOut("slow");
        });
        var t = window.location.href.split(/[?#]/)[0];
        this.href === t ? (
          $(this).addClass("active"),
          $(this).parent().addClass("menu-active"),
          $(this).parent().parent().addClass("menu-show"),
          $(this).parent().parent().prev().addClass("menu-active"),
          $(this).parent().parent().parent().addClass("menu-active"),
          $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("menu-active")) : null;
      });
      }, 800);
  });

  $(function(){
    $('[id$="-include"]').each(function (e){
        "./" + $(this).load($(this).attr("id").replace("-include", "") +  ".html");
    });
  });
})(jQuery);
