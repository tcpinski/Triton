jQuery( document ).ready(function($) {

  /**************************
   * Plugin Loader
   *************************/
  class PluginLoader {
    constructor() {
      this.jqueryAccordion = $('.accordion') || false;
      this.jqueryCounterUp = $('') || false;
      this.slick = $('') || false;
      this.videoBackground = $('') || false;
      this.init();
    }

  /**
   * Initializes plugins
   */
  init() {
    // Jquery Accordion
    if (this.jqueryAccordion) {
      this.jqueryAccordion.accordion({
        'transitionSpeed': 400
      });
    }

    // Jquery Counter Up
    if (this.jqueryCounterUp) {

    }

    // Slick
    if (this.slick) {

    }

    // Video Background
    if (this.videoBackground) {

    }

    };
  }

  const pluginLoader = new PluginLoader();

  /**************************
   * Banner
   *************************/
  class Banner {
    constructor() {
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

    /**
     * Initializes the banner
     */
    init() {

      // Banner Top
      if (this.$elBannerTop) {
        if (this.state.topSticky) {
          this.$elBannerTop.addClass('fixed');
        }
      }

      // Banner Bottom
      if (this.$elBannerBottom) {
        if (this.state.bottomSticky) {
          this.$elBannerBottom.addClass('fixed');
        }
      }
    }

    /**
     * Bind banner events
     */
    bindEvents() {

      if (this.$elTopCloseBtn) {
        this.$elTopCloseBtn.on('click touch', () => {
          this.$elBannerTop.hide();
          $('header.header-main').css('marginTop', '0');
          this.state.isTopOpen = false;
        });
      }
  
      if (this.$elBottomCloseBtn) {
        this.$elBottomCloseBtn.on('click touch', () => {
          this.$elBannerBottom.hide();
          $('footer.footer-main').css('paddingBottom', '0');
          this.state.isBottomOpen = false;
        });
      }
    }
  }


  /**************************
   * Header
   * @requires Banner
   *************************/
  class Header {
    constructor() {
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

    /**
     * Initializes the header
     */
    init() {

      // Sticky top banner
      if (this.banner.$elBannerTop.data('sticky')) {
        this.$elHeader.css('marginTop', this.banner.$elBannerTop.outerHeight() + 'px');
        this.$elHeader.addClass('fixed-with-banner');
        this.$elHeader.closest('body').find('main').css('marginTop', this.$elHeader.outerHeight() + this.banner.$elBannerTop.outerHeight() + 'px');
      }

      // No top banner
      if (this.banner.$elBannerTop.length == 0) {
        this.$elHeader.addClass('fixed-without-banner');
        this.$elHeader.closest('body').find('main').css('marginTop', this.$elHeader.outerHeight() + 'px');
      }
    }

    /**
     * Binds all necessary events to the header.
     */
    bindEvents() {

      // Sticky Header
      if (this.state.isSticky) {
        $(document).on('scroll', () => {
          this.sticky();
        });
      }
    }

    /**
     * Adds a .fixed class to the menu when a user scrolls past the menu, 
     * forcing it to the top of the page.
     * @param {Object} $menu The menu object to apply sticky to.
     */
    sticky() {
      const scrollTop = $(document).scrollTop();

      if (this.banner.state.isTopOpen == false) {
        this.state.offsetTop = 0;
        this.$elHeader.addClass('fixed-without-banner');
        this.$elHeader.closest('body').find('main').css('marginTop', this.state.height + 'px');
      }
  
      if (!this.$elHeader.hasClass('fixed-with-banner')) {
        if (scrollTop > this.state.offsetTop) {
          this.$elHeader.addClass('fixed');
          this.state.previousElement.css('marginBottom', this.state.height);
        } else {
          this.$elHeader.removeClass('fixed');
          this.state.previousElement.css('marginBottom', '0');
        }
      } else {
        if (scrollTop > this.state.offsetTop) {
          this.$elHeader.addClass('fixed');
        } else {
          this.$elHeader.removeClass('fixed');
        }
      }
    }

    findPreviousElement() {
      const $prevElements = this.$elHeader.prevAll('div');
      let $prevElement = '';
  
      $prevElements.each((index, value) => {
        const $element = $(value);
  
        if ($element.hasClass('aspNetHidden') || $element.hasClass('personalBarContainer')) { return; }
        $prevElement = $element;
  
      });
  
      return $prevElement;
    }
  }

  const header = new Header();

  /**************************
   * Footer
   * @requires Banner
   *************************/
  class Footer {
    constructor() {
      this.$elFooter = $('.footer-main');
      this.banner = new Banner();
  
      this.init();
    }

    /**
     * Initializes the footer
     */
    init() {

      if (this.banner.$elBannerBottom) {
        this.$elFooter.css('paddingBottom', this.banner.$elBannerBottom.outerHeight() + 'px');
      }
    }
  }

  const footer = new Footer();
  
  /**************************
   * Menu
   *************************/
  class Menu {
    constructor() {
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
    init() {
      this.initCurrentItems();
      this.initDropdownIcons();
    }

    /**
     * Binds all necessary events to both the desktop & mobile menus.
     */
    bindEvents() {

      // Mobile Toggle
      this.$elMobileToggle.on('click touch', () => {
        this.$elMenuMobile.toggleClass('active');

        if (this.$elMenuMobile.hasClass('active')) {
          // Get the transition duration. Wait that amount of time before setting the
          // isOpen state.
          const transitionDuration = getTransitionDuration(this.$elMenuMobile);
          
          setTimeout(() => {
            this.state.mobile.isOpen = true;
          }, transitionDuration * 1000);
          
        } else {
          this.state.mobile.isOpen = false;
        }

      });

      // Mobile dropdown toggle
      if (this.$elMenuMobile_dropdownToggle.length > 0) {
        this.$elMenuMobile_dropdownToggle.find('.dropdown-toggle').on('click touch', (event) => {
          const dropdownToggle = $(event.target);
          const dropdownPanel = dropdownToggle.siblings('ul');

          dropdownPanel.toggleClass('active');

          if (dropdownPanel.hasClass('active')) {
            dropdownPanel.css('maxHeight', dropdownPanel[0].scrollHeight + 'px');
          } else {
            dropdownPanel.css('maxHeight', '0px');
          }

        });
      }

      // Mobile Outside Click
      $(document).on('click touch', (event) => {
        const $target = $(event.target);
        const isMobileMenu = $target.closest('.menu--mobile').length > 0;

        if (this.state.mobile.isOpen) {
          if (!isMobileMenu) {
            this.$elMenuMobile.removeClass('active');
            this.state.mobile.isOpen = false;
          }
        }

      });

    }

    /**
     * Adds classes to the current item chain.
     */
    initCurrentItems() {
      this.$elMenuDesktop_dropdownToggle.find('.active').closest('.parent').addClass('active-parent');
      this.$elMenuMobile_dropdownToggle.find('.active').closest('.parent').addClass('active-parent');
    }

    /**
     * Adds a Font Awesome icon to each parent list item anchor.
     */
    initDropdownIcons() {

      if (this.state.desktop.icon) {
        this.$elMenuDesktop_dropdownToggle.each((index, value) => {
          const dropdownToggle = $(value);
          const dropdownIcon = $('<i/>', {"class": 'icon ' + this.state.desktop.icon });
          dropdownToggle.find('a').eq(0).append(dropdownIcon);
        });
      }

      if (this.state.mobile.icon) {
        this.$elMenuMobile_dropdownToggle.each((index, value) => {
          const dropdownToggle = $(value);
          const dropdownIcon = $('<i/>', {"class": 'dropdown-toggle icon ' + this.state.desktop.icon });
          dropdownToggle.append(dropdownIcon);
        });
      }
    }

  }

  const menu = new Menu();

  /**************************
   * Helper Functions
   *************************/
  function getTransitionDuration($element) {
    return $element.css('transitionDuration').replace(/[^0-9.]/g, '');
  }

  function setTransitionDuration($element, duration) {
    $element.css('transition-duration', duration);
  }
  
});