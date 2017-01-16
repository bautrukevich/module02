import $ from 'jquery';

let HamburgerBlock = (() => {

  // Private vars
  let prefix = 'js-',
    blockName = 'hamburger',
    block = $('.' + prefix + blockName),
    isExists = block.length,
    debug = false;

  return {

    // Init module
    init: function () {

      let instance = this;

      instance.debug(blockName + ' init');
      if (isExists) {
        this.load();
      }
    },

    // Load module
    load: function () {

      let instance = this;

      instance.debug(blockName + ' load');

      let $hamburgerHandler = block.find('.js-hamburger-handler');
      let $logo = $('.logo');

      let $hamburgerTarget = $($hamburgerHandler.data('target'));
      let targetActiveClassName = $hamburgerHandler.data('active');

      $hamburgerHandler.on('hamburger:check', (e) => {
        if ($hamburgerTarget.hasClass(targetActiveClassName)) {

          // Customize
          $hamburgerHandler.removeClass('hamburger__handler_end');
          $hamburgerHandler.addClass('hamburger__handler_active');
          $logo.removeClass('logo_end');
        } else {

          // Customize
          $hamburgerHandler.addClass('hamburger__handler_end');
          $hamburgerHandler.removeClass('hamburger__handler_active');
          $logo.addClass('logo_end');
        }
      });

      $hamburgerHandler.trigger('hamburger:check');

      $hamburgerHandler.on('click', (e) => {
        e.preventDefault();

        if ($hamburgerTarget.hasClass(targetActiveClassName)) {
          $hamburgerHandler.trigger('hamburger:hide',[$hamburgerTarget, targetActiveClassName]);
        } else {
          $hamburgerHandler.trigger('hamburger:show',[$hamburgerTarget, targetActiveClassName]);
        }
      });

      $hamburgerHandler.on('hamburger:hide', (e, $target, activeClass) => {
        $target.removeClass(activeClass);
        $hamburgerHandler.trigger('hamburger:check');
      });

      $hamburgerHandler.on('hamburger:show', (e, $target, activeClass) => {
        $target.addClass(activeClass);
        $hamburgerHandler.trigger('hamburger:check');
      });

    },

    debug: function (message) {
      if (debug) {
        console.log(message);
      }
    }

  };

})();

export default HamburgerBlock;
