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
