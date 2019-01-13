jQuery( document ).ready(function($) {

  
  $('.accordion').accordion({
    "transitionSpeed": 400
  });


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
   * Header
   */
  function Header() {
    this.$elHeader = $('header.header-main');

    this.state = {
      offsetTop: 0,
      isSticky: this.$elHeader.data('sticky') || false
    };

    this.init();
    this.bindEvents();
  }
  /**
   * Initializes the header
   */
  Header.prototype.init = function() {
    var $this = this;

    // Set the headers top offset
    var previousSiblings = $this.$elHeader.prevAll('div');

    for (var i = 0; i < previousSiblings.length; i++) {
      $this.state.offsetTop += parseInt(previousSiblings[i].scrollHeight);
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
    var headerHeight = $this.$elHeader.outerHeight();

    if (scrollTop > (headerHeight + $this.state.offsetTop) ) {
      $this.$elHeader.addClass('fixed');
    } else if (scrollTop < $this.state.offsetTop) {
      $this.$elHeader.removeClass('fixed');
    }

  };

  var header = new Header();

  
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
    $this.$elMobileToggle.on('click', function() {
      $this.$elMenuMobile.toggleClass('active');
    });

    // Mobile dropdown toggle
    if ($this.$elMenuMobile_dropdownToggle.length > 0) {
      $this.$elMenuMobile_dropdownToggle.find('.dropdown-toggle').on('click', function(event) {
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
  
});