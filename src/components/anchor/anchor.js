import $ from 'jquery';
import scrollTo from 'jquery.scrollto';

let AnchorBlock = (() => {

  // Private vars
  let prefix = 'js-',
    blockName = 'anchor',
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

      let $handler = $('.js-anchor-handler');
      let $target = $('.js-anchor');

      $handler.on('click', (e) => {
        e.preventDefault();

        $.scrollTo($target, 200, {
          easing: 'swing'
        });

      });

    },

    debug: function (message) {
      if (debug) {
        console.log(message);
      }
    }

  };

})();

export default AnchorBlock;
