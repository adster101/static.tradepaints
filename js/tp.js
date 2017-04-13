function load() {

  var slider = document.querySelector('.js_slider');

    // Init the slider
    var loryObj = lory(slider, {
      classNamePrevCtrl: 'slides__prev',
	    classNameNextCtrl: 'slides__next'
    });

  }
  window.onload = load;
