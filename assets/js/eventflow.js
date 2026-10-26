(function ($) {
  "use strict";




  /*--------------------------------------------------------------
    RegisterPlugin, ScrollTrigger, SplitText
  --------------------------------------------------------------*/
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false
  });

  // Animation gsap
  function title_animation() {
    const $tg_var = $('.sec-title-animation');
    if (!$tg_var.length) {
      return;
    }

    const $quotes = $('.sec-title-animation .title-animation');

    $quotes.each(function () {
      const quote = this;
      const $quote = $(quote);

      if (quote.animation) {
        quote.animation.progress(1).kill();
        quote.split.revert();
      }

      const getclass = $quote.closest('.sec-title-animation').attr('class');
      const animation = getclass.split('animation-');
      if (animation[1] === "style4") return;

      quote.split = new SplitText(quote, {
        type: "lines,words,chars",
        linesClass: "split-line"
      });

      gsap.set(quote, { perspective: 400 });

      if (animation[1] === "style1") {
        gsap.set(quote.split.chars, { opacity: 0, y: "90%", rotateX: "-40deg" });
      }
      if (animation[1] === "style2") {
        gsap.set(quote.split.chars, { opacity: 0, x: "50" });
      }
      if (animation[1] === "style3") {
        gsap.set(quote.split.chars, { opacity: 0 });
      }

      quote.animation = gsap.to(quote.split.chars, {
        scrollTrigger: {
          trigger: quote,
          start: "top 90%",
        },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: .02
      });
    });
  }
  ScrollTrigger.addEventListener("refresh", title_animation);




  /*--------------------------------------------------------------
    FullHeight
  --------------------------------------------------------------*/
  function fullHeight() {
    $('.full-height').css("height", $(window).height());
  }

  function thmSwiperInit() {
    const $swiperSliders = $(".thm-swiper__slider");
    if ($swiperSliders.length) {
      $swiperSliders.each(function () {
        const $elm = $(this);
        const options = $elm.data('swiper-options');
        new Swiper($elm, options);
      });
    }
  }

  function thmOwlInit() {
    const $owlCarousels = $(".thm-owl__carousel");
    if ($owlCarousels.length) {
      $owlCarousels.each(function () {
        const $elm = $(this);
        const options = $elm.data('owl-options');
        $elm.owlCarousel(options);
      });
    }

    const $customNavCarousels = $(".thm-owl__carousel--custom-nav");
    if ($customNavCarousels.length) {
      $customNavCarousels.each(function () {
        const $elm = $(this);
        const owlNavPrev = $elm.data('owl-nav-prev');
        const owlNavNext = $elm.data('owl-nav-next');

        $(owlNavPrev).on("click", function (e) {
          $elm.trigger('prev.owl.carousel');
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          $elm.trigger('next.owl.carousel');
          e.preventDefault();
        });
      });
    }
  }

  // Video
  const $videoHolderWrap = $(".video-holder-wrap");
  if ($videoHolderWrap.length > 0) {
    function videoint() {
      const $backgroundVimeo = $(".background-vimeo");
      const $mediaContainer = $(".media-container");
      const $vimeoIframe = $(".background-vimeo iframe");
      const $videoContainer = $(".video-container");
      const w = $backgroundVimeo.data("vim");

      $backgroundVimeo.append(
        '<iframe src="//player.vimeo.com/video/' + w +
        '?background=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
      );

      const $videoHolder = $(".video-holder");
      $videoHolder.height($mediaContainer.height());

      if ($(window).width() > 1024) {
        if ($videoHolder.length > 0) {
          if ($mediaContainer.height() / 9 * 16 > $mediaContainer.width()) {
            $vimeoIframe
              .height($mediaContainer.height())
              .width($mediaContainer.height() / 9 * 16);
            $vimeoIframe.css({
              "margin-left": -1 * $vimeoIframe.width() / 2 + "px",
              top: "-75px",
              "margin-top": "0px"
            });
          } else {
            const winWidth = $(window).width();
            $vimeoIframe
              .width(winWidth)
              .height(winWidth / 16 * 9);
            $vimeoIframe.css({
              "margin-left": -1 * $vimeoIframe.width() / 2 + "px",
              "margin-top": -1 * $vimeoIframe.height() / 2 + "px",
              top: "50%"
            });
          }
        }
      } else {
        $videoHolder.height($mediaContainer.height());
        $vimeoIframe.height($mediaContainer.height());
      }

      const winWidth = $(window).width();
      const winHeight = $(window).height();
      $videoContainer.css("width", winWidth + "px");
      $videoContainer.css("height", Number(720 / 1280 * winWidth) + "px");

      if ($videoContainer.height() < winHeight) {
        $videoContainer.css("height", winHeight + "px");
        $videoContainer.css("width", Number(1280 / 720 * winHeight) + "px");
      }
    }
    videoint();
  }



  // Lenis
  const lenis = new Lenis({
    duration: 1.3,          // smoothness (higher = smoother)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // natural easing
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  // Use GSAP ticker correctly
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // keep close to real-time
  });

  gsap.ticker.lagSmoothing(0);





  // Popular Causes Progress Bar
  const $countBars = $(".count-bar");
  if ($countBars.length) {
    $countBars.appear(function () {
      const $el = $(this);
      const percent = $el.data("percent");
      $el.css("width", percent).addClass("counted");
    }, { accY: -50 });
  }

  // Progress Bar / Levels
  const $barFills = $(".progress-levels .progress-box .bar-fill");
  if ($barFills.length) {
    $barFills.each(function () {
      $(this).appear(function () {
        const progressWidth = $(this).attr("data-percent");
        $(this).css("width", progressWidth + "%");
      });
    }, { accY: 0 });
  }

  // Fact Counter + Text Count
  const $countBoxes = $(".count-box");
  if ($countBoxes.length) {
    $countBoxes.appear(function () {
      const $t = $(this);
      const $countText = $t.find(".count-text");
      const n = $countText.attr("data-stop");
      const r = parseInt($countText.attr("data-speed"), 10);

      if (!$t.hasClass("counted")) {
        $t.addClass("counted");
        $({ countNum: $countText.text() }).animate({ countNum: n }, {
          duration: r,
          easing: "linear",
          step: function () {
            $countText.text(Math.floor(this.countNum));
          },
          complete: function () {
            $countText.text(this.countNum);
          }
        });
      }
    }, { accY: 0 });
  }

  // Accordion
  const $accrodionGrps = $(".accrodion-grp");
  if ($accrodionGrps.length) {
    $accrodionGrps.each(function () {
      const $self = $(this);
      const accrodionName = $self.data("grp-name");
      const $accordions = $self.find(".accrodion");

      $self.addClass(accrodionName);
      $self.find(".accrodion .accrodion-content").hide();
      $self.find(".accrodion.active .accrodion-content").show();

      $accordions.each(function () {
        $(this).find(".accrodion-title").on("click", function () {
          const $parentAccrodion = $(this).parent();
          if (!$parentAccrodion.hasClass("active")) {
            const $grp = $(".accrodion-grp." + accrodionName);
            $grp.find(".accrodion").removeClass("active");
            $grp.find(".accrodion .accrodion-content").slideUp();
            $parentAccrodion.addClass("active");
            $parentAccrodion.find(".accrodion-content").slideDown();
          }
        });
      });
    });
  }

  const $scrollToTarget = $(".scroll-to-target");
  if ($scrollToTarget.length) {
    $scrollToTarget.on("click", function () {
      const target = $(this).attr("data-target");
      $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  }

  const $contactForms = $(".contact-form-validated");
  if ($contactForms.length) {
    $contactForms.each(function () {
      const $self = $(this);
      $self.validate({
        rules: {
          name: { required: true },
          email: { required: true, email: true },
          message: { required: true },
          subject: { required: true }
        },
        submitHandler: function (form) {
          const $form = $(form);
          $.post($form.attr("action"), $form.serialize(), function (response) {
            $form.parent().find(".result").append(response);
            $form.find('input[type="text"]').val("");
            $form.find('input[type="email"]').val("");
            $form.find("textarea").val("");
          });
          return false;
        }
      });
    });
  }

  // Mailchimp form
  const $mcForms = $(".mc-form");
  if ($mcForms.length) {
    $mcForms.each(function () {
      const $self = $(this);
      const mcURL = $self.data("url");
      const $mcResp = $self.parent().find(".mc-form__response");

      $self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          $mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          if (resp.result === "success") {
            $self.removeClass("errored").addClass("successed");
            $mcResp.removeClass("errored").addClass("successed");
            $self.find("input").val("");
            $mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            $self.removeClass("successed").addClass("errored");
            $mcResp.removeClass("successed").addClass("errored");
            $self.find("input").val("");
            $mcResp.find("p").fadeOut(10000);
          }
        }
      });
    });
  }

  const $videoPopup = $(".video-popup");
  if ($videoPopup.length) {
    $videoPopup.magnificPopup({
      type: "iframe",
      iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
          '</div>',
      },
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: false
    });
  }

  const $imgPopup = $(".img-popup");
  if ($imgPopup.length) {
    const groups = {};
    $imgPopup.each(function () {
      const id = parseInt($(this).attr("data-group"), 10);
      if (!groups[id]) groups[id] = [];
      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: { enabled: true }
      });
    });
  }

  // CountDownTimer - One
  const $countdownOne = $('.time-countdown-one');
  if ($countdownOne.length) {
    $countdownOne.each(function () {
      const $self = $(this);
      const countDate = $self.data('countdown-time');
      $self.countdown(countDate, function (event) {
        $(this).html(
          '<li><div class="box"><span class="days">' + event.strftime('%D') + '</span><span class="timeRef">Days</span></div></li>' +
          '<li><div class="box"><span class="hours">' + event.strftime('%H') + '</span><span class="timeRef clr-1">Hours</span></div></li>' +
          '<li><div class="box"><span class="minutes">' + event.strftime('%M') + '</span><span class="timeRef clr-2">Minutes</span></div></li>' +
          '<li><div class="box"><span class="seconds">' + event.strftime('%S') + '</span><span class="timeRef clr-3">Seconds</span></div></li>'
        );
      });
    });
  }

  // CountDownTimer - Two
  const $countdownTwo = $('.time-countdown-two');
  if ($countdownTwo.length) {
    $countdownTwo.each(function () {
      const $self = $(this);
      const countDate = $self.data('countdown-time');
      $self.countdown(countDate, function (event) {
        $(this).html(
          '<li><div class="box"><span class="days">' + event.strftime('%D') + '</span><span class="timeRef">Days</span></div></li>' +
          '<li><div class="box"><span class="hours">' + event.strftime('%H') + '</span><span class="timeRef clr-1">Hours</span></div></li>' +
          '<li><div class="box"><span class="minutes">' + event.strftime('%M') + '</span><span class="timeRef clr-2">Min</span></div></li>' +
          '<li><div class="box"><span class="seconds">' + event.strftime('%S') + '</span><span class="timeRef clr-3">Sec</span></div></li>'
        );
      });
    });
  }

  // CountDownTimer - Coming Soon
  const $comingSoonCountdown = $('.coming-soon-countdown');
  if ($comingSoonCountdown.length) {
    $comingSoonCountdown.each(function () {
      const $self = $(this);
      const countDate = $self.data('countdown-time');
      $self.countdown(countDate, function (event) {
        $(this).html(
          '<li><div class="box"><span class="days">' + event.strftime('%D') + '</span><span class="timeRef">days</span></div></li>' +
          '<li><div class="box"><span class="hours">' + event.strftime('%H') + '</span><span class="timeRef clr-1">hrs</span></div></li>' +
          '<li><div class="box"><span class="minutes">' + event.strftime('%M') + '</span><span class="timeRef clr-2">mins</span></div></li>' +
          '<li><div class="box"><span class="seconds">' + event.strftime('%S') + '</span><span class="timeRef clr-3">secs</span></div></li>'
        );
      });
    });
  }

  function dynamicCurrentMenuClass($selector) {
    let path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    $selector.find("li").removeClass("current");

    $selector.find("li").each(function () {
      const $anchor = $(this).find("a").first();
      if ($anchor.length > 0) {
        let href = $anchor.attr("href");
        if (href && href !== "#") {
          // Normalize href
          let normalizedHref = href.split(/[?#]/)[0]; // Remove query/hash
          if (normalizedHref.length > 1 && normalizedHref.endsWith('/')) {
            normalizedHref = normalizedHref.slice(0, -1);
          }
          
          if (normalizedHref === path) {
            $(this).addClass("current");
          }
        }
      }
    });

    $selector.find("li.current").parents("li").addClass("current");

    if (path === "/" || path === "" || path === "/index") {
      $selector.find("> li:first-child").addClass("current");
    }
  }

  const $mainMenuList = $(".main-menu__list");
  if ($mainMenuList.length) {
    dynamicCurrentMenuClass($mainMenuList);
  }

  const $mobileNavContainer = $(".mobile-nav__container");
  if ($mainMenuList.length && $mobileNavContainer.length) {
    const navContent = $mainMenuList[0].outerHTML;
    $mobileNavContainer.html(navContent);
  }

  const $stickyHeaderContent = $(".sticky-header__content");
  if ($stickyHeaderContent.length) {
    const navContent = $(".main-menu").html();
    $stickyHeaderContent.html(navContent);
  }

  const $mobileDropdownAnchors = $(".mobile-nav__container .main-menu__list .dropdown > a");
  if ($mobileDropdownAnchors.length) {
    $mobileDropdownAnchors.each(function () {
      const $self = $(this);
      const $toggleBtn = $('<button aria-label="dropdown toggler"><i class="fa fa-angle-down"></i></button>');
      $self.append($toggleBtn);
      $toggleBtn.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("expanded");
        $(this).parent().toggleClass("expanded");
        $(this).parent().parent().children("ul").slideToggle();
      });
    });
  }

  const $mobileNavToggler = $(".mobile-nav__toggler");
  if ($mobileNavToggler.length) {
    $mobileNavToggler.on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  const $searchToggler = $(".search-toggler");
  if ($searchToggler.length) {
    $searchToggler.on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  const $odometerEls = $(".odometer");
  if ($odometerEls.length) {
    $odometerEls.each(function () {
      $(this).appear(function () {
        const countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  const $dynamicYear = $(".dynamic-year");
  if ($dynamicYear.length) {
    $dynamicYear.html(new Date().getFullYear());
  }

  const $wowEls = $(".wow");
  if ($wowEls.length) {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      mobile: true,
      live: true
    });
    wow.init();
  }

  const $thmAccordions = $(".thm-accordion");
  if ($thmAccordions.length) {
    $thmAccordions.each(function () {
      const $this = $(this);
      const accordionID = $this.attr("id");
      const $accordionTitles = $this.find(".thm-accordion__title");
      const $accordionContents = $this.find(".thm-accordion__content");

      $this.addClass(accordionID);
      $accordionContents.hide();
      $this.find(".active-item .thm-accordion__content").show();

      $accordionTitles.on("click", function (e) {
        e.preventDefault();
        const $accordionItem = $(this).parent();
        if (!$accordionItem.hasClass("active-item")) {
          const $accordion = $("#" + accordionID);
          $accordion.find(".thm-accordion__item").removeClass("active-item");
          $accordionItem.addClass("active-item");
          $accordionContents.slideUp();
          $accordionItem.find(".thm-accordion__content").slideDown();
        }
      });
    });
  }

  const $tabsBox = $(".tabs-box");
  if ($tabsBox.length) {
    $tabsBox.find(".tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      const $this = $(this);
      const $target = $($this.attr("data-tab"));

      if ($target.is(":visible")) return false;

      const $parentTabsBox = $target.parents(".tabs-box");
      $parentTabsBox.find(".tab-buttons .tab-btn").removeClass("active-btn");
      $this.addClass("active-btn");
      $parentTabsBox.find(".tabs-content .tab").fadeOut(0).removeClass("active-tab");
      $target.fadeIn(300).addClass("active-tab");
    });
  }

  // Portfolio / Masonry
  function projectMasonaryLayout() {
    const $masonaryLayout = $(".masonary-layout");
    if ($masonaryLayout.length) {
      $masonaryLayout.isotope({ layoutMode: "masonry" });
    }

    const $postFilter = $(".post-filter");
    if ($postFilter.length) {
      $postFilter.find("li .filter-text").on("click", function () {
        const $self = $(this);
        const selector = $self.parent().attr("data-filter");
        $postFilter.find("li").removeClass("active");
        $self.parent().addClass("active");
        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: { duration: 500, easing: "linear", queue: false }
        });
        return false;
      });
    }

    const $dynamicFiltersCounter = $(".post-filter.has-dynamic-filters-counter");
    if ($dynamicFiltersCounter.length) {
      $dynamicFiltersCounter.find("li").each(function () {
        const filterElement = $(this).data("filter");
        const count = $(".filter-layout").find(filterElement).length;
        $(this).children(".filter-text").append('<span class="count">' + count + "</span>");
      });
    }
  }

  function SmoothMenuScroll() {
    const $anchor = $(".scrollToLink");
    if ($anchor.length) {
      $anchor.children("a").on("click", function (event) {
        const headerH = 90;
        const $target = $(this);
        $("html, body").stop().animate(
          { scrollTop: $($target.attr("href")).offset().top - headerH },
          500,
          "easeInOutExpo"
        );
        $anchor
          .removeClass("current")
          .removeClass("current-menu-ancestor")
          .removeClass("current_page_item")
          .removeClass("current-menu-parent");
        $target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    const windscroll = $(window).scrollTop();
    const $onePageMenu = $(".one-page-scroll-menu");
    if (!$onePageMenu.length) {
      return;
    }

    if (windscroll >= 117) {
      $onePageMenu.find(".scrollToLink a").each(function () {
        const sections = $(this).attr("href");
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            const sectionId = $(sections).attr("id");
            $onePageMenu.find("li")
              .removeClass("current current-menu-ancestor current_page_item current-menu-parent");
            $onePageMenu.find('a[href*=\\#' + sectionId + ']').parent().addClass("current");
          }
        });
      });
    } else {
      $onePageMenu.find("li.current").removeClass("current");
      $onePageMenu.find("li:first").addClass("current");
    }
  }

  // Fallback: never let heavy media (hero video) keep the preloader on screen
  setTimeout(function () {
    const $p = $(".preloader");
    if ($p.length) {
      $p.fadeOut();
    }
  }, 1600);

  // Window Load
  $(window).on("load", function () {
    const $preloader = $(".preloader");
    if ($preloader.length) {
      $preloader.fadeOut();
    }

    thmSwiperInit();
    thmOwlInit();
    projectMasonaryLayout();
    fullHeight();
    OnePageMenuScroll();

    const $postFilterLoad = $(".post-filter");
    if ($postFilterLoad.length) {
      const $filterLayout = $(".filter-layout");
      const $postFilterItems = $postFilterLoad.find("li");

      $filterLayout.isotope({
        filter: ".filter-item",
        animationOptions: { duration: 500, easing: "linear", queue: false }
      });

      $postFilterItems.on("click", function () {
        const $self = $(this);
        const selector = $self.attr("data-filter");
        $postFilterItems.removeClass("active");
        $self.addClass("active");
        $filterLayout.isotope({
          filter: selector,
          animationOptions: { duration: 500, easing: "linear", queue: false }
        });
        return false;
      });
    }

    const $dynamicFilterCounter = $(".post-filter.has-dynamic-filter-counter");
    if ($dynamicFilterCounter.length) {
      $dynamicFilterCounter.find("li").each(function () {
        const filterElement = $(this).data("filter");
        const count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }

    const $testimonialThumb = $("#testimonial-three__thumb");
    if ($testimonialThumb.length) {
      const testimonialsThumb = new Swiper($testimonialThumb[0], {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 1400,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        autoplay: { delay: 5000 }
      });

      new Swiper($("#testimonial-three__carousel")[0], {
        observer: true,
        observeParents: true,
        speed: 1400,
        mousewheel: true,
        slidesPerView: 1,
        autoplay: { delay: 5000 },
        thumbs: { swiper: testimonialsThumb },
        pagination: {
          el: $("#testimonial-three__carousel-pagination")[0],
          type: "bullets",
          clickable: true
        }
      });
    }

    const $marquee = $(".marquee_mode");
    if ($marquee.length) {
      $marquee.marquee({
        speed: 40,
        gap: 0,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
      });
    }
  });

  // Window Scroll
  $(window).on("scroll", function () {
    const $strickyMenu = $(".stricked-menu");
    if ($strickyMenu.length) {
      const headerScrollPos = 130;
      if ($(window).scrollTop() > headerScrollPos) {
        $strickyMenu.addClass("stricky-fixed");
      } else {
        $strickyMenu.removeClass("stricky-fixed");
      }
    }

    const $scrollToTop = $(".scroll-to-top");
    if ($scrollToTop.length) {
      if ($(window).scrollTop() > 100) {
        $scrollToTop.fadeIn(500);
      } else {
        $scrollToTop.fadeOut(500);
      }
    }

    OnePageMenuScroll();
  });

  $('select:not(.ignore)').niceSelect();

})(jQuery);