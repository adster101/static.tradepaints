(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* globals jQuery */
	
	exports.lory = lory;
	
	var _detectPrefixes = __webpack_require__(2);
	
	var _detectPrefixes2 = _interopRequireDefault(_detectPrefixes);
	
	var _dispatchEvent = __webpack_require__(3);
	
	var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var slice = Array.prototype.slice;
	
	function lory(slider, opts) {
	    var position = void 0;
	    var slidesWidth = void 0;
	    var frameWidth = void 0;
	    var slides = void 0;
	
	    /**
	     * slider DOM elements
	     */
	    var frame = void 0;
	    var slideContainer = void 0;
	    var prevCtrl = void 0;
	    var nextCtrl = void 0;
	    var prefixes = void 0;
	    var transitionEndCallback = void 0;
	
	    var index = 0;
	    var options = {};
	
	    /**
	     * if object is jQuery convert to native DOM element
	     */
	    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
	        slider = slider[0];
	    }
	
	    /**
	     * private
	     * set active class to element which is the current slide
	     */
	    function setActiveElement(slides, currentIndex) {
	        var _options = options;
	        var classNameActiveSlide = _options.classNameActiveSlide;
	
	
	        slides.forEach(function (element, index) {
	            if (element.classList.contains(classNameActiveSlide)) {
	                element.classList.remove(classNameActiveSlide);
	            }
	        });
	
	        slides[currentIndex].classList.add(classNameActiveSlide);
	    }
	
	    /**
	     * private
	     * setupInfinite: function to setup if infinite is set
	     *
	     * @param  {array} slideArray
	     * @return {array} array of updated slideContainer elements
	     */
	    function setupInfinite(slideArray) {
	        var _options2 = options;
	        var infinite = _options2.infinite;
	
	
	        var front = slideArray.slice(0, infinite);
	        var back = slideArray.slice(slideArray.length - infinite, slideArray.length);
	
	        front.forEach(function (element) {
	            var cloned = element.cloneNode(true);
	
	            slideContainer.appendChild(cloned);
	        });
	
	        back.reverse().forEach(function (element) {
	            var cloned = element.cloneNode(true);
	
	            slideContainer.insertBefore(cloned, slideContainer.firstChild);
	        });
	
	        slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);
	
	        return slice.call(slideContainer.children);
	    }
	
	    /**
	     * [dispatchSliderEvent description]
	     * @return {[type]} [description]
	     */
	    function dispatchSliderEvent(phase, type, detail) {
	        (0, _dispatchEvent2.default)(slider, phase + '.lory.' + type, detail);
	    }
	
	    /**
	     * translates to a given position in a given time in milliseconds
	     *
	     * @to        {number} number in pixels where to translate to
	     * @duration  {number} time in milliseconds for the transistion
	     * @ease      {string} easing css property
	     */
	    function translate(to, duration, ease) {
	        var style = slideContainer && slideContainer.style;
	
	        if (style) {
	            style[prefixes.transition + 'TimingFunction'] = ease;
	            style[prefixes.transition + 'Duration'] = duration + 'ms';
	
	            if (prefixes.hasTranslate3d) {
	                style[prefixes.transform] = 'translate3d(' + to + 'px, 0, 0)';
	            } else {
	                style[prefixes.transform] = 'translate(' + to + 'px, 0)';
	            }
	        }
	    }
	
	    /**
	     * slidefunction called by prev, next & touchend
	     *
	     * determine nextIndex and slide to next postion
	     * under restrictions of the defined options
	     *
	     * @direction  {boolean}
	     */
	    function slide(nextIndex, direction) {
	        var _options3 = options;
	        var slideSpeed = _options3.slideSpeed;
	        var slidesToScroll = _options3.slidesToScroll;
	        var infinite = _options3.infinite;
	        var rewind = _options3.rewind;
	        var rewindSpeed = _options3.rewindSpeed;
	        var ease = _options3.ease;
	        var classNameActiveSlide = _options3.classNameActiveSlide;
	
	
	        var duration = slideSpeed;
	
	        var nextSlide = direction ? index + 1 : index - 1;
	        var maxOffset = Math.round(slidesWidth - frameWidth);
	
	        dispatchSliderEvent('before', 'slide', {
	            index: index,
	            nextSlide: nextSlide
	        });
	
	        if (typeof nextIndex !== 'number') {
	            if (direction) {
	                nextIndex = index + slidesToScroll;
	            } else {
	                nextIndex = index - slidesToScroll;
	            }
	        }
	
	        nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
	
	        if (infinite && direction === undefined) {
	            nextIndex += infinite;
	        }
	
	        var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);
	
	        if (rewind && Math.abs(position.x) === maxOffset && direction) {
	            nextOffset = 0;
	            nextIndex = 0;
	            duration = rewindSpeed;
	        }
	
	        /**
	         * translate to the nextOffset by a defined duration and ease function
	         */
	        translate(nextOffset, duration, ease);
	
	        /**
	         * update the position with the next position
	         */
	        position.x = nextOffset;
	
	        /**
	         * update the index with the nextIndex only if
	         * the offset of the nextIndex is in the range of the maxOffset
	         */
	        if (slides[nextIndex].offsetLeft <= maxOffset) {
	            index = nextIndex;
	        }
	
	        if (infinite && (nextIndex === slides.length - infinite || nextIndex === 0)) {
	            if (direction) {
	                index = infinite;
	            }
	
	            if (!direction) {
	                index = slides.length - infinite * 2;
	            }
	
	            position.x = slides[index].offsetLeft * -1;
	
	            transitionEndCallback = function transitionEndCallback() {
	                translate(slides[index].offsetLeft * -1, 0, undefined);
	            };
	        }
	
	        if (classNameActiveSlide) {
	            setActiveElement(slice.call(slides), index);
	        }
	
	        dispatchSliderEvent('after', 'slide', {
	            currentSlide: index
	        });
	    }
	
	    /**
	     * public
	     * setup function
	     */
	    function setup() {
	        dispatchSliderEvent('before', 'init');
	
	        prefixes = (0, _detectPrefixes2.default)();
	        options = _extends({}, _defaults2.default, opts);
	
	        var _options4 = options;
	        var classNameFrame = _options4.classNameFrame;
	        var classNameSlideContainer = _options4.classNameSlideContainer;
	        var classNamePrevCtrl = _options4.classNamePrevCtrl;
	        var classNameNextCtrl = _options4.classNameNextCtrl;
	        var enableMouseEvents = _options4.enableMouseEvents;
	        var classNameActiveSlide = _options4.classNameActiveSlide;
	
	
	        frame = slider.getElementsByClassName(classNameFrame)[0];
	        slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
	        prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
	        nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];
	
	        position = {
	            x: slideContainer.offsetLeft,
	            y: slideContainer.offsetTop
	        };
	
	        if (options.infinite) {
	            slides = setupInfinite(slice.call(slideContainer.children));
	        } else {
	            slides = slice.call(slideContainer.children);
	        }
	
	        reset();
	
	        if (classNameActiveSlide) {
	            setActiveElement(slides, index);
	        }
	
	        if (prevCtrl && nextCtrl) {
	            prevCtrl.addEventListener('click', prev);
	            nextCtrl.addEventListener('click', next);
	        }
	
	        frame.addEventListener('touchstart', onTouchstart);
	
	        if (enableMouseEvents) {
	            frame.addEventListener('mousedown', onTouchstart);
	            frame.addEventListener('click', onClick);
	        }
	
	        options.window.addEventListener('resize', onResize);
	
	        dispatchSliderEvent('after', 'init');
	    }
	
	    /**
	     * public
	     * reset function: called on resize
	     */
	    function reset() {
	        var _options5 = options;
	        var infinite = _options5.infinite;
	        var ease = _options5.ease;
	        var rewindSpeed = _options5.rewindSpeed;
	        var rewindOnResize = _options5.rewindOnResize;
	        var classNameActiveSlide = _options5.classNameActiveSlide;
	
	
	        slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
	        frameWidth = frame.getBoundingClientRect().width || frame.offsetWidth;
	
	        if (frameWidth === slidesWidth) {
	            slidesWidth = slides.reduce(function (previousValue, slide) {
	                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
	            }, 0);
	        }
	
	        if (rewindOnResize) {
	            index = 0;
	        } else {
	            ease = null;
	            rewindSpeed = 0;
	        }
	
	        if (infinite) {
	            translate(slides[index + infinite].offsetLeft * -1, 0, null);
	
	            index = index + infinite;
	            position.x = slides[index].offsetLeft * -1;
	        } else {
	            translate(slides[index].offsetLeft * -1, rewindSpeed, ease);
	            position.x = slides[index].offsetLeft * -1;
	        }
	
	        if (classNameActiveSlide) {
	            setActiveElement(slice.call(slides), index);
	        }
	    }
	
	    /**
	     * public
	     * slideTo: called on clickhandler
	     */
	    function slideTo(index) {
	        slide(index);
	    }
	
	    /**
	     * public
	     * returnIndex function: called on clickhandler
	     */
	    function returnIndex() {
	        return index - options.infinite || 0;
	    }
	
	    /**
	     * public
	     * prev function: called on clickhandler
	     */
	    function prev() {
	        slide(false, false);
	    }
	
	    /**
	     * public
	     * next function: called on clickhandler
	     */
	    function next() {
	        slide(false, true);
	    }
	
	    /**
	     * public
	     * destroy function: called to gracefully destroy the lory instance
	     */
	    function destroy() {
	        dispatchSliderEvent('before', 'destroy');
	
	        // remove event listeners
	        frame.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
	        frame.removeEventListener('touchstart', onTouchstart);
	        frame.removeEventListener('touchmove', onTouchmove);
	        frame.removeEventListener('touchend', onTouchend);
	        frame.removeEventListener('mousemove', onTouchmove);
	        frame.removeEventListener('mousedown', onTouchstart);
	        frame.removeEventListener('mouseup', onTouchend);
	        frame.removeEventListener('mouseleave', onTouchend);
	        frame.removeEventListener('click', onClick);
	
	        options.window.removeEventListener('resize', onResize);
	
	        if (prevCtrl) {
	            prevCtrl.removeEventListener('click', prev);
	        }
	
	        if (nextCtrl) {
	            nextCtrl.removeEventListener('click', next);
	        }
	
	        // remove cloned slides if infinite is set
	        if (options.infinite) {
	            Array.apply(null, Array(options.infinite)).forEach(function () {
	                slideContainer.removeChild(slideContainer.firstChild);
	                slideContainer.removeChild(slideContainer.lastChild);
	            });
	        }
	
	        dispatchSliderEvent('after', 'destroy');
	    }
	
	    // event handling
	
	    var touchOffset = void 0;
	    var delta = void 0;
	    var isScrolling = void 0;
	
	    function onTransitionEnd() {
	        if (transitionEndCallback) {
	            transitionEndCallback();
	
	            transitionEndCallback = undefined;
	        }
	    }
	
	    function onTouchstart(event) {
	        var _options6 = options;
	        var enableMouseEvents = _options6.enableMouseEvents;
	
	        var touches = event.touches ? event.touches[0] : event;
	
	        if (enableMouseEvents) {
	            frame.addEventListener('mousemove', onTouchmove);
	            frame.addEventListener('mouseup', onTouchend);
	            frame.addEventListener('mouseleave', onTouchend);
	        }
	
	        frame.addEventListener('touchmove', onTouchmove);
	        frame.addEventListener('touchend', onTouchend);
	
	        var pageX = touches.pageX;
	        var pageY = touches.pageY;
	
	
	        touchOffset = {
	            x: pageX,
	            y: pageY,
	            time: Date.now()
	        };
	
	        isScrolling = undefined;
	
	        delta = {};
	
	        dispatchSliderEvent('on', 'touchstart', {
	            event: event
	        });
	    }
	
	    function onTouchmove(event) {
	        var touches = event.touches ? event.touches[0] : event;
	        var pageX = touches.pageX;
	        var pageY = touches.pageY;
	
	
	        delta = {
	            x: pageX - touchOffset.x,
	            y: pageY - touchOffset.y
	        };
	
	        if (typeof isScrolling === 'undefined') {
	            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
	        }
	
	        if (!isScrolling && touchOffset) {
	            event.preventDefault();
	            translate(position.x + delta.x, 0, null);
	        }
	
	        // may be
	        dispatchSliderEvent('on', 'touchmove', {
	            event: event
	        });
	    }
	
	    function onTouchend(event) {
	        /**
	         * time between touchstart and touchend in milliseconds
	         * @duration {number}
	         */
	        var duration = touchOffset ? Date.now() - touchOffset.time : undefined;
	
	        /**
	         * is valid if:
	         *
	         * -> swipe attempt time is over 300 ms
	         * and
	         * -> swipe distance is greater than 25px
	         * or
	         * -> swipe distance is more then a third of the swipe area
	         *
	         * @isValidSlide {Boolean}
	         */
	        var isValid = Number(duration) < 300 && Math.abs(delta.x) > 25 || Math.abs(delta.x) > frameWidth / 3;
	
	        /**
	         * is out of bounds if:
	         *
	         * -> index is 0 and delta x is greater than 0
	         * or
	         * -> index is the last slide and delta is smaller than 0
	         *
	         * @isOutOfBounds {Boolean}
	         */
	        var isOutOfBounds = !index && delta.x > 0 || index === slides.length - 1 && delta.x < 0;
	
	        var direction = delta.x < 0;
	
	        if (!isScrolling) {
	            if (isValid && !isOutOfBounds) {
	                slide(false, direction);
	            } else {
	                translate(position.x, options.snapBackSpeed);
	            }
	        }
	
	        touchOffset = undefined;
	
	        /**
	         * remove eventlisteners after swipe attempt
	         */
	        frame.removeEventListener('touchmove', onTouchmove);
	        frame.removeEventListener('touchend', onTouchend);
	        frame.removeEventListener('mousemove', onTouchmove);
	        frame.removeEventListener('mouseup', onTouchend);
	        frame.removeEventListener('mouseleave', onTouchend);
	
	        dispatchSliderEvent('on', 'touchend', {
	            event: event
	        });
	    }
	
	    function onClick(event) {
	        if (delta.x) {
	            event.preventDefault();
	        }
	    }
	
	    function onResize(event) {
	        reset();
	
	        dispatchSliderEvent('on', 'resize', {
	            event: event
	        });
	    }
	
	    // trigger initial setup
	    setup();
	
	    // expose public api
	    return {
	        setup: setup,
	        reset: reset,
	        slideTo: slideTo,
	        returnIndex: returnIndex,
	        prev: prev,
	        next: next,
	        destroy: destroy
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = detectPrefixes;
	/**
	 * Detecting prefixes for saving time and bytes
	 */
	function detectPrefixes() {
	    var transform = void 0;
	    var transition = void 0;
	    var transitionEnd = void 0;
	    var hasTranslate3d = void 0;
	
	    (function () {
	        var el = document.createElement('_');
	        var style = el.style;
	
	        var prop = void 0;
	
	        if (style[prop = 'webkitTransition'] === '') {
	            transitionEnd = 'webkitTransitionEnd';
	            transition = prop;
	        }
	
	        if (style[prop = 'transition'] === '') {
	            transitionEnd = 'transitionend';
	            transition = prop;
	        }
	
	        if (style[prop = 'webkitTransform'] === '') {
	            transform = prop;
	        }
	
	        if (style[prop = 'msTransform'] === '') {
	            transform = prop;
	        }
	
	        if (style[prop = 'transform'] === '') {
	            transform = prop;
	        }
	
	        document.body.insertBefore(el, null);
	        style[transform] = 'translate3d(0, 0, 0)';
	        hasTranslate3d = !!global.getComputedStyle(el).getPropertyValue(transform);
	        document.body.removeChild(el);
	    })();
	
	    return {
	        transform: transform,
	        transition: transition,
	        transitionEnd: transitionEnd,
	        hasTranslate3d: hasTranslate3d
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = dispatchEvent;
	
	var _customEvent = __webpack_require__(4);
	
	var _customEvent2 = _interopRequireDefault(_customEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * dispatch custom events
	 *
	 * @param  {element} el         slideshow element
	 * @param  {string}  type       custom event name
	 * @param  {object}  detail     custom detail information
	 */
	function dispatchEvent(target, type, detail) {
	    var event = new _customEvent2.default(type, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	    });
	
	    target.dispatchEvent(event);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;
	
	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}
	
	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */
	
	module.exports = useNative() ? NativeCustomEvent :
	
	// IE >= 9
	'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :
	
	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  /**
	   * slides scrolled at once
	   * @slidesToScroll {Number}
	   */
	  slidesToScroll: 1,
	
	  /**
	   * time in milliseconds for the animation of a valid slide attempt
	   * @slideSpeed {Number}
	   */
	  slideSpeed: 300,
	
	  /**
	   * time in milliseconds for the animation of the rewind after the last slide
	   * @rewindSpeed {Number}
	   */
	  rewindSpeed: 600,
	
	  /**
	   * time for the snapBack of the slider if the slide attempt was not valid
	   * @snapBackSpeed {Number}
	   */
	  snapBackSpeed: 200,
	
	  /**
	   * Basic easing functions: https://developer.mozilla.org/de/docs/Web/CSS/transition-timing-function
	   * cubic bezier easing functions: http://easings.net/de
	   * @ease {String}
	   */
	  ease: 'ease',
	
	  /**
	   * if slider reached the last slide, with next click the slider goes back to the startindex.
	   * use infinite or rewind, not both
	   * @rewind {Boolean}
	   */
	  rewind: false,
	
	  /**
	   * number of visible slides or false
	   * use infinite or rewind, not both
	   * @infinite {number}
	   */
	  infinite: false,
	
	  /**
	   * class name for slider frame
	   * @classNameFrame {string}
	   */
	  classNameFrame: 'js_frame',
	
	  /**
	   * class name for slides container
	   * @classNameSlideContainer {string}
	   */
	  classNameSlideContainer: 'js_slides',
	
	  /**
	   * class name for slider prev control
	   * @classNamePrevCtrl {string}
	   */
	  classNamePrevCtrl: 'js_prev',
	
	  /**
	   * class name for slider next control
	   * @classNameNextCtrl {string}
	   */
	  classNameNextCtrl: 'js_next',
	
	  /**
	   * class name for current active slide
	   * if emptyString then no class is set
	   * @classNameActiveSlide {string}
	   */
	  classNameActiveSlide: 'active',
	
	  /**
	   * enables mouse events for swiping on desktop devices
	   * @enableMouseEvents {boolean}
	   */
	  enableMouseEvents: false,
	
	  /**
	   * window instance
	   * @window {object}
	   */
	  window: window,
	
	  /**
	   * If false, slides lory to the first slide on window resize.
	   * @rewindOnResize {boolean}
	   */
	  rewindOnResize: true
	};

/***/ }
/******/ ])
});
;
/*
 * priority-nav - v1.0.12 | (c) 2016 @gijsroge | MIT license
 * Repository: https://github.com/gijsroge/priority-navigation.git
 * Description: Priority+ pattern navigation that hides menu items if they don't fit on screen.
 * Demo: http://gijsroge.github.io/priority-nav.js/
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define("priorityNav", factory(root));
    } else if (typeof exports === "object") {
        module.exports = factory(root);
    } else {
        root.priorityNav = factory(root);
    }
})(window || this, function (root) {

    "use strict";

    /**
     * Variables
     */
    var priorityNav = {}; // Object for public APIs
    var breaks = []; // Object to store instances with breakpoints where the instances menu item"s didin"t fit.
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    var settings = {};
    var instance = 0;
    var count = 0;
    var mainNavWrapper, totalWidth, restWidth, mainNav, navDropdown, navDropdownToggle, dropDownWidth, toggleWrapper;
    var viewportWidth = 0;

    /**
     * Default settings
     * @type {{initClass: string, navDropdown: string, navDropdownToggle: string, mainNavWrapper: string, moved: Function, movedBack: Function}}
     */
    var defaults = {
        initClass:                  "js-priorityNav", // Class that will be printed on html element to allow conditional css styling.
        mainNavWrapper:             "nav", // mainnav wrapper selector (must be direct parent from mainNav)
        mainNav:                    "ul", // mainnav selector. (must be inline-block)
        navDropdownClassName:       "nav__dropdown", // class used for the dropdown.
        navDropdownToggleClassName: "nav__dropdown-toggle", // class used for the dropdown toggle.
        navDropdownLabel:           "more", // Text that is used for the dropdown toggle.
        navDropdownBreakpointLabel: "menu", //button label for navDropdownToggle when the breakPoint is reached.
        breakPoint:                 500, //amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
        throttleDelay:              50, // this will throttle the calculating logic on resize because i'm a responsible dev.
        offsetPixels:               0, // increase to decrease the time it takes to move an item.
        count:                      true, // prints the amount of items are moved to the attribute data-count to style with css counter.

        //Callbacks
        moved: function () {
        },
        movedBack: function () {
        }
    };


    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === "[object Object]") {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };


    /**
     * Get the closest matching element up the DOM tree
     * @param {Element} elem Starting element
     * @param {String} selector Selector to match against (class, ID, or data attribute)
     * @return {Boolean|Element} Returns false if not match found
     */
    var getClosest = function (elem, selector) {
        var firstChar = selector.charAt(0);
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (firstChar === ".") {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            } else if (firstChar === "#") {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            } else if (firstChar === "[") {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    return elem;
                }
            }
        }
        return false;
    };


    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    var extend = function (defaults, options) {
        var extended = {};
        forEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        });
        forEach(options, function (value, prop) {
            extended[prop] = options[prop];
        });
        return extended;
    };


    /**
     * Debounced resize to throttle execution
     * @param func
     * @param wait
     * @param immediate
     * @returns {Function}
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }


    /**
     * Toggle class on element
     * @param el
     * @param className
     */
    var toggleClass = function (el, className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(" ");
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1); else
                classes.push(className);

            el.className = classes.join(" ");
        }
    };


    /**
     * Check if dropdown menu is already on page before creating it
     * @param mainNavWrapper
     */
    var prepareHtml = function (_this, settings) {

        /**
         * Create dropdow menu
         * @type {HTMLElement}
         */
        toggleWrapper = document.createElement("span");
        navDropdown = document.createElement("ul");
        navDropdownToggle = document.createElement("button");

        /**
         * Set label for dropdown toggle
         * @type {string}
         */
        navDropdownToggle.innerHTML = settings.navDropdownLabel;

        /**
         * Set aria attributes for accessibility
         */
        navDropdownToggle.setAttribute("aria-controls", "menu");
        navDropdownToggle.setAttribute("type", "button");
        navDropdown.setAttribute("aria-hidden", "true");


        /**
         * Move elements to the right spot
         */
        if(_this.querySelector(mainNav).parentNode !== _this){
            console.warn("mainNav is not a direct child of mainNavWrapper, double check please");
            return;
        }

        _this.insertAfter(toggleWrapper, _this.querySelector(mainNav));

        toggleWrapper.appendChild(navDropdownToggle);
        toggleWrapper.appendChild(navDropdown);

        /**
         * Add classes so we can target elements
         */
        navDropdown.classList.add(settings.navDropdownClassName);
        navDropdown.classList.add("priority-nav__dropdown");

        navDropdownToggle.classList.add(settings.navDropdownToggleClassName);
        navDropdownToggle.classList.add("priority-nav__dropdown-toggle");

        toggleWrapper.classList.add(settings.navDropdownClassName+"-wrapper");
        toggleWrapper.classList.add("priority-nav__wrapper");

        _this.classList.add("priority-nav");
    };


    /**
     * Get innerwidth without padding
     * @param element
     * @returns {number}
     */
    var getElementContentWidth = function(element) {
        var styles = window.getComputedStyle(element);
        var padding = parseFloat(styles.paddingLeft) +
            parseFloat(styles.paddingRight);

        return element.clientWidth - padding;
    };


    /**
     * Get viewport size
     * @returns {{width: number, height: number}}
     */
    var viewportSize = function() {
        var doc = document, w = window;
        var docEl = (doc.compatMode && doc.compatMode === "CSS1Compat")?
            doc.documentElement: doc.body;

        var width = docEl.clientWidth;
        var height = docEl.clientHeight;

        // mobile zoomed in?
        if ( w.innerWidth && width > w.innerWidth ) {
            width = w.innerWidth;
            height = w.innerHeight;
        }

        return {width: width, height: height};
    };


    /**
     * Get width
     * @param elem
     * @returns {number}
     */
    var calculateWidths = function (_this) {
        totalWidth = getElementContentWidth(_this);
        //Check if parent is the navwrapper before calculating its width
        if (_this.querySelector(navDropdown).parentNode === _this) {
            dropDownWidth = _this.querySelector(navDropdown).offsetWidth;
        } else {
            dropDownWidth = 0;
        }
        restWidth = getChildrenWidth(_this) + settings.offsetPixels;
        viewportWidth = viewportSize().width;
    };


    /**
     * Move item to array
     * @param item
     */
    priorityNav.doesItFit = function (_this) {

        /**
         * Check if it is the first run
         */
        var delay = _this.getAttribute("instance") === 0 ? delay : settings.throttleDelay;

        /**
         * Increase instance
         */
        instance++;

        /**
         * Debounced execution of the main logic
         */
        (debounce(function () {

            /**
             * Get the current element"s instance
             * @type {string}
             */
            var identifier = _this.getAttribute("instance");

            /**
             * Update width
             */
            calculateWidths(_this);

            /**
             * Keep executing until all menu items that are overflowing are moved
             */
            while (totalWidth <= restWidth  && _this.querySelector(mainNav).children.length > 0 || viewportWidth < settings.breakPoint && _this.querySelector(mainNav).children.length > 0) {
                //move item to dropdown
                priorityNav.toDropdown(_this, identifier);
                //recalculate widths
                calculateWidths(_this, identifier);
                //update dropdownToggle label
                if(viewportWidth < settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
            }

            /**
             * Keep executing until all menu items that are able to move back are moved
             */
            while (totalWidth >= breaks[identifier][breaks[identifier].length - 1] && viewportWidth > settings.breakPoint) {
                //move item to menu
                priorityNav.toMenu(_this, identifier);
                //update dropdownToggle label
                if(viewportWidth > settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownLabel);
            }

            /**
             * If there are no items in dropdown hide dropdown
             */
            if (breaks[identifier].length < 1) {
                _this.querySelector(navDropdown).classList.remove("show");
                //show navDropdownLabel
                updateLabel(_this, identifier, settings.navDropdownLabel);
            }

            /**
             * If there are no items in menu
             */
            if (_this.querySelector(mainNav).children.length < 1) {
                //show navDropdownBreakpointLabel
                _this.classList.add("is-empty");
                updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
            }else{
                _this.classList.remove("is-empty");
            }

            /**
             * Check if we need to show toggle menu button
             */
            showToggle(_this, identifier);

        }, delay ))();
    };


    /**
     * Show/hide toggle button
     */
    var showToggle = function (_this, identifier) {
        if (breaks[identifier].length < 1) {
            _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-hidden");
            _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-visible");
            _this.classList.remove("priority-nav-has-dropdown");

            /**
             * Set aria attributes for accessibility
             */
            _this.querySelector(".priority-nav__wrapper").setAttribute("aria-haspopup", "false");

        } else {
            _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-visible");
            _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-hidden");
            _this.classList.add("priority-nav-has-dropdown");

            /**
             * Set aria attributes for accessibility
             */
            _this.querySelector(".priority-nav__wrapper").setAttribute("aria-haspopup", "true");
        }
    };


    /**
     * Update count on dropdown toggle button
     */
    var updateCount = function (_this, identifier) {
        _this.querySelector(navDropdownToggle).setAttribute("priorityNav-count", breaks[identifier].length);
    };

    var updateLabel = function(_this, identifier, label){
        _this.querySelector(navDropdownToggle).innerHTML = label;
    };


    /**
     * Move item to dropdown
     */
    priorityNav.toDropdown = function (_this, identifier) {


        /**
         * move last child of navigation menu to dropdown
         */
        if (_this.querySelector(navDropdown).firstChild && _this.querySelector(mainNav).children.length > 0) {
            _this.querySelector(navDropdown).insertBefore(_this.querySelector(mainNav).lastElementChild, _this.querySelector(navDropdown).firstChild);
        } else if (_this.querySelector(mainNav).children.length > 0) {
            _this.querySelector(navDropdown).appendChild(_this.querySelector(mainNav).lastElementChild);
        }

        /**
         * store breakpoints
         */
        breaks[identifier].push(restWidth);

        /**
         * check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
            updateCount(_this, identifier);
        }

        /**
         * If item has been moved to dropdown trigger the callback
         */
        settings.moved();
    };


    /**
     * Move item to menu
     */
    priorityNav.toMenu = function (_this, identifier) {

        /**
         * move last child of navigation menu to dropdown
         */
        if (_this.querySelector(navDropdown).children.length > 0) _this.querySelector(mainNav).appendChild(_this.querySelector(navDropdown).firstElementChild);

        /**
         * remove last breakpoint
         */
        breaks[identifier].pop();

        /**
         * Check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
            updateCount(_this, identifier);
        }

        /**
         * If item has been moved back to the main menu trigger the callback
         */
        settings.movedBack();
    };


    /**
     * Count width of children and return the value
     * @param e
     */
    var getChildrenWidth = function (e) {
        var children = e.childNodes;
        var sum = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeType !== 3) {
                if(!isNaN(children[i].offsetWidth)){
                    sum += children[i].offsetWidth;
                }

            }
        }
        return sum;
    };



    /**
     * Bind eventlisteners
     */
    var listeners = function (_this, settings) {

        // Check if an item needs to move
        if(window.attachEvent) {
            window.attachEvent("onresize", function() {
                if(priorityNav.doesItFit)priorityNav.doesItFit(_this);
            });
        }
        else if(window.addEventListener) {
            window.addEventListener("resize", function() {
                if(priorityNav.doesItFit)priorityNav.doesItFit(_this);
            }, true);
        }

        // Toggle dropdown
        _this.querySelector(navDropdownToggle).addEventListener("click", function () {
            toggleClass(_this.querySelector(navDropdown), "show");
            toggleClass(this, "is-open");
            toggleClass(_this, "is-open");

            /**
             * Toggle aria hidden for accessibility
             */
            if(-1 !== _this.className.indexOf( "is-open" )){
                _this.querySelector(navDropdown).setAttribute("aria-hidden", "false");
            }else{
                _this.querySelector(navDropdown).setAttribute("aria-hidden", "true");
                _this.querySelector(navDropdown).blur();
            }
        });

        /*
         * Remove when clicked outside dropdown
         */
        document.addEventListener("click", function (event) {
            if (!getClosest(event.target, "."+settings.navDropdownClassName) && event.target !== _this.querySelector(navDropdownToggle)) {
                _this.querySelector(navDropdown).classList.remove("show");
                _this.querySelector(navDropdownToggle).classList.remove("is-open");
                _this.classList.remove("is-open");
            }
        });

        /**
         * Remove when escape key is pressed
         */
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
                document.querySelector(navDropdown).classList.remove("show");
                document.querySelector(navDropdownToggle).classList.remove("is-open");
                mainNavWrapper.classList.remove("is-open");
            }
        };
    };


    /**
     * Remove function
     */
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    };

    /*global HTMLCollection */
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = 0, len = this.length; i < len; i++) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    };


    /**
     * Destroy the current initialization.
     * @public
     */
    priorityNav.destroy = function () {
        // If plugin isn"t already initialized, stop
        if (!settings) return;
        // Remove feedback class
        document.documentElement.classList.remove(settings.initClass);
        // Remove toggle
        toggleWrapper.remove();
        // Remove settings
        settings = null;
        delete priorityNav.init;
        delete priorityNav.doesItFit;
    };


    /**
     * insertAfter function
     * @param n
     * @param r
     */
    if (supports && typeof Node !== "undefined"){
        Node.prototype.insertAfter = function(n,r) {this.insertBefore(n,r.nextSibling);};
    }

    var checkForSymbols = function(string){
        var firstChar = string.charAt(0);
        if (firstChar === "." || firstChar === "#") {
            return false;
        }else{
            return true;
        }
    };


    /**
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    priorityNav.init = function (options) {

        /**
         * Merge user options with defaults
         * @type {Object}
         */
        settings = extend(defaults, options || {});

        // Feature test.
        if (!supports && typeof Node === "undefined"){
            console.warn("This browser doesn't support priorityNav");
            return;
        }

        // Options check
        if (!checkForSymbols(settings.navDropdownClassName) || !checkForSymbols(settings.navDropdownToggleClassName)){
            console.warn("No symbols allowed in navDropdownClassName & navDropdownToggleClassName. These are not selectors.");
            return;
        }

        /**
         * Store nodes
         * @type {NodeList}
         */
        var elements = document.querySelectorAll(settings.mainNavWrapper);

        /**
         * Loop over every instance and reference _this
         */
        forEach(elements, function(_this){

            /**
             * Create breaks array
             * @type {number}
             */
            breaks[count] = [];

            /**
             * Set the instance number as data attribute
             */
            _this.setAttribute("instance", count++);

            /**
             * Store the wrapper element
             */
            mainNavWrapper = _this;
            if (!mainNavWrapper) {
                console.warn("couldn't find the specified mainNavWrapper element");
                return;
            }

            /**
             * Store the menu elementStore the menu element
             */
            mainNav = settings.mainNav;
            if (!_this.querySelector(mainNav)) {
                console.warn("couldn't find the specified mainNav element");
                return;
            }

            /**
             * Check if we need to create the dropdown elements
             */
            prepareHtml(_this, settings);

            /**
             * Store the dropdown element
             */
            navDropdown = "."+settings.navDropdownClassName;
            if (!_this.querySelector(navDropdown)) {
                console.warn("couldn't find the specified navDropdown element");
                return;
            }

            /**
             * Store the dropdown toggle element
             */
            navDropdownToggle = "."+settings.navDropdownToggleClassName;
            if (!_this.querySelector(navDropdownToggle)) {
                console.warn("couldn't find the specified navDropdownToggle element");
                return;
            }

            /**
             * Event listeners
             */
            listeners(_this, settings);

            /**
             * Start first check
             */
            priorityNav.doesItFit(_this);

        });

        /**
         * Count amount of instances
         */
        instance++;

        /**
         * Add class to HTML element to activate conditional CSS
         */
        document.documentElement.classList.add(settings.initClass);
    };


    /**
     * Public APIs
     */
    return priorityNav;

});
'use strict';

      var slider = document.querySelector('.js_slider');

      if (slider !== null) {

      var sliderObj = lory(slider, {
        infinite: 1,
        enableMouseEvents: true,
        slideSpeed: 500,
        ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      });
      setInterval(function () {
   sliderObj.next();
 }, 3000 + 300); // Interval + Transition

}

var el = document.querySelector('.search__form');

 el.addEventListener('focus', function(e){
   el.classList.add('search__form--active');
 }, true);
 el.addEventListener('blur', function(e){
   el.classList.remove('search__form--active');
 }, true);

 var nav = priorityNav.init({
   mainNavWrapper: ".priority-nav",
   mainNav: "div",
   breakPoint: 300
 });
