jQuery( document ).ready(function($) {

  /**
   * Plugins
   */
  function PluginLoader() {
    this.jqueryAccordion = $('.accordion');
    this.jqueryCounterUp = $('');
    this.slick = $('');
    this.videoBackground = $('');
    this.init();
  }

  /**
   * Initializes plugins
   */
  PluginLoader.prototype.init = function() {

    // Jquery Accordion
    if (this.jqueryAccordion.length > 0) {
      this.jqueryAccordion.accordion({
        'transitionSpeed': 400
      });
    }

    // Jquery Counter Up
    if (this.jqueryCounterUp.length > 0) {

    }

    // Slick
    if (this.slick.length > 0) {

    }

    // Video Background
    if (this.videoBackground.length > 0) {

    }

  };

  var pluginLoader = new PluginLoader();


  /**
   * Banner
   */
  function Banner() {
    this.$elBannerTop = $('.banner.banner--top') || false;
    this.$elBannerBottom = $('.banner.banner--bottom') || false;
    this.$elTopCloseBtn = this.$elBannerTop.find('.banner__close-button') || false;
    this.$elBottomCloseBtn = this.$elBannerBottom.find('.banner__close-button') || false;

    this.state = {
      topSticky: this.$elBannerTop.data('sticky') || false,
      bottomSticky: this.$elBannerBottom.data('sticky') || false,
      isTopOpen: this.$elBannerTop.css('display') == 'none' ? false : true,
      isBottomOpen: this.$elBannerTop.css('display') == 'none' ? false : true,
    };

    this.init();
    this.bindEvents();
  }

  Banner.prototype.init = function() {

    // Banner Top
    if (this.$elBannerTop.length > 0) {
      if (this.state.topSticky) {
        this.$elBannerTop.addClass('fixed');
      }
    }

    // Banner Bottom
    if (this.$elBannerBottom.length > 0) {
      if (this.state.bottomSticky) {
        this.$elBannerBottom.addClass('fixed');
      }
    }

  };

  Banner.prototype.bindEvents = function() {
    var $this = this;

    if ($this.$elTopCloseBtn.length) {
      $this.$elTopCloseBtn.on('click touch', function() {
        $this.$elBannerTop.hide();
        $('header.header-main').css('marginTop', '0');
        $this.state.isTopOpen = false;
      });
    }

    if ($this.$elBottomCloseBtn) {
      $this.$elBottomCloseBtn.on('click touch', function() {
        $this.$elBannerBottom.hide();
        $('footer.footer-main').css('paddingBottom', '0');
        $this.state.isBottomOpen = false;
      });
    }

  };


   /**
   * Header
   * 
   * @requires Banner
   */
  function Header() {
    this.$elHeader = $('header.header-main');
    this.banner = new Banner();

    this.state = {
      height: this.$elHeader.outerHeight(),
      offsetTop: this.$elHeader.position().top,
      previousElement: this.findPreviousElement(),
      isSticky: this.$elHeader.data('sticky') || false
    };

    this.init();
    this.bindEvents();
  }

  Header.prototype.init = function() {
    var $this = this;

    // Sticky top banner
    if ($this.banner.$elBannerTop.data('sticky')) {
      $this.$elHeader.css('marginTop', $this.banner.$elBannerTop.outerHeight() + 'px');
      $this.$elHeader.addClass('fixed-with-banner');
      $this.$elHeader.closest('body').find('main').css('marginTop', $this.$elHeader.outerHeight() + $this.banner.$elBannerTop.outerHeight() + 'px');
    }

    // No top banner
    if ($this.banner.$elBannerTop.length == 0) {
      $this.$elHeader.addClass('fixed-without-banner');
      $this.$elHeader.closest('body').find('main').css('marginTop', $this.$elHeader.outerHeight() + 'px');
    }

  };

  /**
   * Binds all necessary events to the header.
   */
  Header.prototype.bindEvents = function() {
    var $this = this;

    // Sticky Header
    if ($this.state.isSticky) {
      $(document).on('scroll', function() {
        $this.sticky();
      });
    }
  };

  /**
   * Adds a .fixed class to the menu when a user scrolls past the menu, 
   * forcing it to the top of the page.
   * @param {Object} $menu The menu object to apply sticky to.
   */
  Header.prototype.sticky = function() {
    var $this = this;
    var scrollTop = $(document).scrollTop();

    if ($this.banner.state.isTopOpen == false) {
      $this.state.offsetTop = 0;
      $this.$elHeader.addClass('fixed-without-banner');
      $this.$elHeader.closest('body').find('main').css('marginTop', $this.state.height + 'px');
    }

    if (!$this.$elHeader.hasClass('fixed-with-banner')) {
      if (scrollTop > $this.state.offsetTop) {
        $this.$elHeader.addClass('fixed');
        $this.state.previousElement.css('marginBottom', $this.state.height);
      } else {
        $this.$elHeader.removeClass('fixed');
        $this.state.previousElement.css('marginBottom', '0');
      }
    } else {
      if (scrollTop > $this.state.offsetTop) {
        $this.$elHeader.addClass('fixed');
      } else {
        $this.$elHeader.removeClass('fixed');
      }
    }

  };

  /**
   * Finds the element immediately preceding the header.
   */
  Header.prototype.findPreviousElement = function() {
    var $this = this;

    var $prevElements = $this.$elHeader.prevAll('div');
    var $prevElement = '';

    $prevElements.each(function(index, value) {
      var $element = $(value);

      if ($element.hasClass('aspNetHidden') || $element.hasClass('personalBarContainer')) { return; }
      $prevElement = $element;

    });

    return $prevElement;
  };

  var header = new Header();



  /**
   * Footer
   * 
   * @requires Banner
   */
  function Footer() {
    this.$elFooter = $('.footer-main');
    this.banner = new Banner();

    this.init();
  }

  /**
   * Initialize the footer
   */
  Footer.prototype.init = function() {
    var $this = this;

    if ($this.banner.$elBannerBottom) {
      $this.$elFooter.css('paddingBottom', $this.banner.$elBannerBottom.outerHeight() + 'px');
      console.log($this.$elFooter.css('paddingBottom'));
    }
  }

  var footer = new Footer();
  

  
  /**
   * Menu
   */
  function Menu() {
    this.$elMenuDesktop = $('.menu.menu--desktop');
    this.$elMenuMobile = $('.menu.menu--mobile');
    this.$elMobileToggle = $('.mobile-toggle');
    this.$elMenuDesktop_dropdownToggle = this.$elMenuDesktop.find('.parent');
    this.$elMenuMobile_dropdownToggle = this.$elMenuMobile.find('.parent');

    this.state = {
      desktop: {
        icon: this.$elMenuDesktop.data('dropdown-icon') || false,
      },
      mobile: {
        icon: this.$elMenuMobile.data('dropdown-icon') || false,
        isOpen: false,
      }
    };

    this.init();
    this.bindEvents();
  }

  /**
   * Initializes the dropdown menus.
   */
  Menu.prototype.init = function() {
    this.initCurrentItems();
    this.initDropdownIcons();
  };

  /**
   * Adds classes to the current item chain.
   */
  Menu.prototype.initCurrentItems = function() {
    var $this = this;

    $this.$elMenuDesktop_dropdownToggle.find('.active').closest('.parent').addClass('active-parent');
    $this.$elMenuMobile_dropdownToggle.find('.active').closest('.parent').addClass('active-parent');
  };

  /**
   * Binds all necessary events to both the desktop & mobile menus.
   */
  Menu.prototype.bindEvents = function() {

    var $this = this;

    // Mobile Toggle
    $this.$elMobileToggle.on('click touch', function() {
      $this.$elMenuMobile.toggleClass('active');

      if ($this.$elMenuMobile.hasClass('active')) {
        // Get the transition duration. Wait that amount of time before setting the
        // isOpen state.
        var transitionDuration = getTransitionDuration($this.$elMenuMobile);
        
        setTimeout(function() {
          $this.state.mobile.isOpen = true;
        }, transitionDuration * 1000);
        
      } else {
        $this.state.mobile.isOpen = false;
      }

    });

    // Mobile dropdown toggle
    if ($this.$elMenuMobile_dropdownToggle.length > 0) {
      $this.$elMenuMobile_dropdownToggle.find('.dropdown-toggle').on('click touch', function(event) {
        var dropdownToggle = $(event.target);
        var dropdownPanel = dropdownToggle.siblings('ul');

        dropdownPanel.toggleClass('active');

        if (dropdownPanel.hasClass('active')) {
          dropdownPanel.css('maxHeight', dropdownPanel[0].scrollHeight + 'px');
        } else {
          dropdownPanel.css('maxHeight', '0px');
        }

      });
    }

    // Mobile Outside Click
    $(document).on('click touch', function(event) {
      var $target = $(event.target);
      var isMobileMenu = $target.closest('.menu--mobile').length > 0;

      if ($this.state.mobile.isOpen) {
        if (!isMobileMenu) {
          $this.$elMenuMobile.removeClass('active');
          $this.state.mobile.isOpen = false;
        }
      }

    });

  };

  /**
   * Adds a Font Awesome icon to each parent list item anchor.
   */
  Menu.prototype.initDropdownIcons = function() {
    var $this = this;

    if ($this.state.desktop.icon) {
      $this.$elMenuDesktop_dropdownToggle.each(function(index, value) {
        var dropdownToggle = $(value);
        var dropdownIcon = $('<i/>', {"class": 'icon ' + $this.state.desktop.icon });
        dropdownToggle.find('a').eq(0).append(dropdownIcon);
      });
    }

    if ($this.state.mobile.icon) {
      $this.$elMenuMobile_dropdownToggle.each(function(index, value) {
        var dropdownToggle = $(value);
        var dropdownIcon = $('<i/>', {"class": 'dropdown-toggle icon ' + $this.state.desktop.icon });
        dropdownToggle.append(dropdownIcon);
      });
    }

  };

  var menu = new Menu();

  // Helper functions
  function getTransitionDuration($element) {
    return $element.css('transitionDuration').replace(/[^0-9.]/g, '');
  }

  function setTransitionDuration($element, duration) {
    $element.css('transition-duration', duration);
  }
  
});