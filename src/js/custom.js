jQuery( document ).ready(function($) {

  /**
   * Menu
   */
  function Menu() {
    this.$elMenuDesktop = $('.menu.menu--desktop');
    this.$elMenuMobile = $('.menu.menu--mobile');
    this.$elMobileToggle = $('#mobile-toggle');
    this.$elMenuDesktop_dropdownToggle = this.$elMenuDesktop.find('.parent');
    this.$elMenuMobile_dropdownToggle = this.$elMenuMobile.find('.parent');

    this.state = {
      desktop: {
        $elDropdown: '',
        icon: this.$elMenuDesktop.data('dropdown-icon') || false,
        isDropdownOpen: false,
        isSticky: this.$elMenuDesktop.data('sticky') || false,
      },
      mobile: {
        icon: this.$elMenuMobile.data('dropdown-icon') || false,
        isSticky: this.$elMenuMobile.data('sticky') || false,
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

    var currentItem = $this.$elMenuDesktop_dropdownToggle.find('.active');
    currentItem.closest('.parent').addClass('active-parent');
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

    // Sticky Menu
    if ($this.state.desktop.isSticky) {
      $(document).on('scroll', function() {
        $this.sticky();
      });
    }

    if ($this.state.mobile.isSticky) {
      $(document).on('scroll', function() {
        $this.sticky();
      });
    }

    // Mobile dropdown toggle
    if ($this.$elMenuMobile_dropdownToggle.length > 0) {
      $this.$elMenuMobile_dropdownToggle.find('.dropdown-toggle').on('click', function(event) {
        var dropdownToggle = $(event.target);
        dropdownToggle.siblings('ul').toggleClass('active');
      });
    }


  };

  /**
   * Adds a .fixed class to the menu when a user scrolls past the menu, 
   * forcing it to the top of the page.
   * @param {Object} $menu The menu object to apply sticky to.
   */
  Menu.prototype.sticky = function($menu) {
    var $this = this;

    var header = $this.$elMenuDesktop.closest('header');
    var scrollTop = $(document).scrollTop();
    var menuHeight = header.outerHeight();

    if (scrollTop > (menuHeight + 60) ) {
      // Check if the user has scrolled past the menu.
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
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