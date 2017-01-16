import $ from 'jquery';

let SliderBlock = (() => {

  // Private vars
  let prefix = 'js-',
    blockName = 'slider',
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

      let $slider = block;

      const slideActiveClassName = block.data('active');
      const isLoop = block.data('loop');
      const animation = block.data('animation');
      const animationPrev = block.data('animation-direction-prev');
      const animationNext = block.data('animation-direction-next');

      let $slides = $('.js-slider-slide');
      let slidesIndexes = [];
      let $prevSlideHandler = $('.js-slider-arrow-prev');
      let $nextSlideHandler = $('.js-slider-arrow-next');

      $.fn.extend({
        animateCss: function (animationName, callback) {
          let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
          });
          callback();
          // setTimeout(callback, 1000);
        }
      });

      $slides.each((i, element) => {
        const index = $(element).index();
        slidesIndexes.push(index);
      });

      let $activeSlide = $slider.find('.' + slideActiveClassName);
      let currentIndex = $activeSlide.index();
      let firstIndex = slidesIndexes[0];
      let lastIndex = slidesIndexes[slidesIndexes.length - 1];

      $slider.on('slider:check', (e) => {

        $activeSlide = $slider.find('.' + slideActiveClassName);
        currentIndex = $activeSlide.index();
        firstIndex = slidesIndexes[0];
        lastIndex = slidesIndexes[slidesIndexes.length - 1];

        if (!isLoop) {

          if (currentIndex == firstIndex) {
            $prevSlideHandler.removeClass('promo__arrow_is_active');
          } else {
            $prevSlideHandler.addClass('promo__arrow_is_active');
          }

          if (currentIndex == lastIndex) {
            $nextSlideHandler.removeClass('promo__arrow_is_active');
          } else {
            $nextSlideHandler.addClass('promo__arrow_is_active');
          }
        }
      });

      $slider.trigger('slider:check');

      $prevSlideHandler.on('click', (e) => {
        e.preventDefault();

        $activeSlide = $slider.find('.' + slideActiveClassName);
        $slider.trigger('slider:prev', [$activeSlide]);
      });

      $nextSlideHandler.on('click', (e) => {
        e.preventDefault();

        $activeSlide = $slider.find('.' + slideActiveClassName);
        $slider.trigger('slider:next', [$activeSlide]);
      });

      $slider.on('slider:prev', (e, $activeSlide) => {

        let $prevSlide;
        currentIndex = $activeSlide.index();

        if (currentIndex == firstIndex && isLoop) {
          $prevSlide = $slides.last();
        } else {
          $prevSlide = $activeSlide.prev();
        }

        $slider.trigger('slider:set', [$activeSlide, $prevSlide, animationPrev, animationNext]);
        $slider.trigger('slider:check');
      });

      $slider.on('slider:next', (e, $activeSlide) => {

        let $nextSlide;
        currentIndex = $activeSlide.index();

        if (currentIndex == lastIndex && isLoop) {
          $nextSlide = $slides.first();
        } else {
          $nextSlide = $activeSlide.next();
        }


        $slider.trigger('slider:set', [$activeSlide, $nextSlide, animationNext, animationPrev]);
        $slider.trigger('slider:check');
      });

      $slider.on('slider:set', (e, $activeSlide, $slide, direction, backDirection) => {

        $slide.addClass(slideActiveClassName);
        $activeSlide.removeClass(slideActiveClassName);

        // $slide.animateCss(animation + backDirection, () => {
        //
        // });

        // $activeSlide.animateCss(animation + direction, () => {
        //
        // });

      });

    },

    debug: function (message) {
      if (debug) {
        console.log(message);
      }
    }

  };

})();

export default SliderBlock;
