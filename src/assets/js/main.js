document.addEventListener('DOMContentLoaded', function () {
  var app = senna.dataAttributeHandler.getApp();

  app.on('endNavigate', function (event) {
    initNavbar();
    fixHeroHeight();
    wrapCarouselItems();
    startLightbox();
    wisdomEvent();
    trackPageViews(event);
  });

  initNavbar();
  fixHeroHeight();
  wrapCarouselItems();
  startLightbox();
  wisdomEvent();
  // randomWisdow();

});

// Keeps the primary navigation in close proximity to the user
// by fixing it when scrolling up and disappearing when scrolling down
var headroom;

function initNavbar() {
  var header = document.querySelector('.site-header');

  if (headroom) {
    headroom.destroy();
  }

  headroom = new Headroom(header, {
    offset: 0,
    tolerance: 10,
    classes: {
      initial: "animated",
      pinned: "slideDown",
      unpinned: "slideUp",
      top: "top",
      notTop: "notTop",
      bottom: "bottom",
      notBottom: "notBottom"
    }
  });

  headroom.init();
}

// Since Google Analytics only tracks page loads, we need to send a page view
// event every time Senna navigates to another page
function trackPageViews(event) {
  if (ga) {
    ga('set', 'page', event.path);
    ga('send', 'pageview');
  }
}

// Converts hero image's height to pixels in order
// to fix a weird behavior with 100vh on mobile devices
function fixHeroHeight() {
  var postHeader = document.querySelector('.post-header');

  if (postHeader) {
    postHeader.style.height = document.documentElement.clientHeight + 'px';
  }
}

function wrap(toWrap, wrapper) {
  wrapper = wrapper || document.createElement('div');
  toWrap.parentNode.appendChild(wrapper);
  return wrapper.appendChild(toWrap);
};

function wrapCarouselItems() {
  var images = document.querySelectorAll(".carousel img");

  images.forEach((img) => {
    if (img.parentElement.tagName === 'a') return;

    var aHref = document.createElement('a');
    aHref.setAttribute('href', img.src);
    wrap(img, aHref);

    var div = document.createElement('div');
    div.classList.add('carousel-item');
    wrap(aHref, div);
  });
}


function startLightbox() {
  // var luminous = new LuminousGallery(document.querySelectorAll(".carousel a"), {arrowNavigation: true}, {});
  var lightbox = new $(".carousel a").simpleLightbox({showCounter: false});
  console.log('TEST')
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onClick() {
  $('.loading').addClass('fadeIn');
  $.getJSON('/json/proverbs.json', function (res) {
    $('.loading').removeClass('fadeIn');

    var chapter = getRandomInt(0, res.chapters.length - 1);
    var verse = getRandomInt(0, res.chapters[chapter].length - 1);
    $('.manifesto').html(res.chapters[chapter][verse]);
    $('.ref').html('Proverbs ' + (chapter+1) + '.' + (verse+1));
    $('.manifesto').addClass('fadeIn');

  });
}

function wisdomEvent() {
  $('#wisdom-btn').click(onClick);

}
