(function ($) {
  "use strict";

  $(document).ready(function () {
    new WOW().init();

    if ($(".hero-1 .hero-slider-active").length > 0) {
      $(".hero-1 .hero-slider-active")
        .slick({
          autoplay: true,
          draggable: true,
          speed: 1500,
          arrows: false,
          dots: false,
          fade: true,
          pauseOnHover: false,
          swipeToSlide: true,
          cssEase: "ease-in-out",
          touchThreshold: 100,
          dotsClass: "slide-dots",
          prevArrow:
            '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
          nextArrow:
            '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        })
        .slickAnimation();
    }

    $("#achievement").owlCarousel({
      loop: true,
      center: true,
      items: 1,
      margin: 20,
      autoplay: true,
      dots: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
    });
    $("#toppers").owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 20,
      autoplay: true,
      dots: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1,
        },
        767: {
          items: 2,
        },
        1170: {
          items: 3,
        },
      },
    });
    $("#birthday").owlCarousel({
      loop: true,
      center: true,
      items: 1,
      autoplay: true,
      dots: false,
      nav: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      navText: [
        '<i class="fa fa-angle-left">',
        '<i class="fa fa-angle-right">',
      ],
    });

    $("#circulars").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      vertical: true,
      verticalSwiping: true,
      loop: true,
      autoplay: true,
      pauseOnHover: false,
      margin: 20,
      speed: 800,
      prevArrow: '<i class="fa fa-angle-left">',
      nextArrow: '<i class="fa fa-angle-right">',
    });

    $(".blogs").slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      Padding: "50px",
      dots: true,
      autoplay: true,
      dotsClass: "circle-dots",
      speed: 800,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            center: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

    /* =============================================
            # Magnific popup init
         ===============================================*/
    $(".popup-link").magnificPopup({
      type: "image",
      fixedContentPos: false,
    });

    $(".popup-gallery").magnificPopup({
      type: "image",
      fixedContentPos: false,
      gallery: {
        enabled: true,
      },
      // other options
    });

    $(".popup-video, .popup-vimeo, .popup-gmaps").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });

    /*==========================
           Scroll To Up Init
        ============================*/
    $.scrollUp({
      scrollName: "scrollUp", // Element ID
      topDistance: "1110", // Distance from top before showing element (px)
      topSpeed: 2000, // Speed back to top (ms)
      animation: "slide", // Fade, slide, none
      animationInSpeed: 300, // Animation in speed (ms)
      animationOutSpeed: 300, // Animation out speed (ms)
      scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

    //# Smooth Scroll
    var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 3;

    items.slice(perPage).hide();

    $("#pagination-container").pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        items.hide().slice(showFrom, showTo).show();
      },
    });

    // Sticky Menu
    //$(window).scroll(function () {
    //    var Width = $(document).width();

    //    if ($("body").scrollTop() > 100 || $("html").scrollTop() > 100) {
    //        if (Width > 767) {
    //            $("header").addClass("sticky");
    //        }
    //    } else {
    //        $("header").removeClass("sticky");
    //    }
    //});

    $(".container").imagesLoaded(function () {
      $(".case-cat-filter").on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });

      var $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
      });
    });

    var catButton = ".case-cat-filter button";

    $(catButton).on("click", function () {
      $(catButton).removeClass("active");
      $(this).addClass("active");
    });

    $("#hamburger").on("click", function () {
      $(".mobile-nav").addClass("show");
      $(".overlay").addClass("active");
    });

    $(".close-nav").on("click", function () {
      $(".mobile-nav").removeClass("show");
      $(".overlay").removeClass("active");
    });

    $(".overlay").on("click", function () {
      $(".mobile-nav").removeClass("show");
      $(".overlay").removeClass("active");
    });

    $("#mobile-menu").metisMenu();

    $(".search-btn").on("click", function () {
      $(".search-box").toggleClass("show");
    });

    if ($(".request-quote-form").length > 0) {
      NiceSelect.bind(document.getElementById("transfreight"));
      NiceSelect.bind(document.getElementById("incoterms"));
    }

    $(".side-toggle-menu, .offcanvas-btn").on("click", function () {
      $(".offset-menu").addClass("show");
    });

    $("#offset-menu-close-btn").on("click", function () {
      $(".offset-menu").removeClass("show");
    });

    $("#toggle").click(function () {
      $(this).toggleClass("active");
      $("#overlay").toggleClass("open");
    });
    $(document).ready(function () {
      $("#close-btn").click(function () {
        $("#search-overlay").fadeOut();
        $("#search-btn").show();
      });
      $("#search-btn").click(function () {
        $(this).hide();
        $("#search-overlay").fadeIn();
      });
    });
  }); // end document ready function

  function loader() {
    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").addClass("loaded");
      $(".preloader").delay(600).fadeOut();
    });
  }
  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
  });
  loader();
})(jQuery); // End jQuery
