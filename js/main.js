var mySwiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev',
  },
  loop: true,
  centeredSlides: true,
  autoplay: true,
  breakpoints: {
    590: {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: false,
    },
    710: {
      slidesPerView: 1.5,
      spaceBetween: 20,
      centeredSlides: false,
    },
    980: {
      slidesPerView: 2,
      centeredSlides: false,
    },
    1140: {
      slidesPerView: 2.4,
      spaceBetween: 20
    },
    1450: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1550: {
      slidesPerView: 3.3,
      spaceBetween: 36
    },
    1920: {
      slidesPerView: 3.8,
      spaceBetween: 36
    },


  }

})




$(document).ready(function () {
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
      $('body,html').stop();
    });
    $('body,html').animate({ scrollTop: top }, 2200);
  });
});
$('#coop_btn-mob').click(function () {
  $('#burger').prop('checked', false);
});





$("#burger").on("click", function () { 
  if ($(this).is(":checked")) {
    $('body').css("overflow", "hidden")
  } else {
    $('body').css("overflow", "visible")
  }
})



var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};








autosize();
function autosize() {
  var text = $('#desc_text');

  text.each(function () {
    $(this).attr('rows', 1);
    resize($(this));
  });

  text.on('input', function () {
    resize($(this));
  });

  function resize($text) {
    $text.css('height', 'auto');
    $text.css('height', $text[0].scrollHeight + 'px');
  }
}












$(function () {
  var countFiles = 1,
    $body = $('body'),
    typeFileArea = ['txt', 'doc', 'docx', 'ods'],
    coutnTypeFiles = typeFileArea.length;

  //create new element


  //show text file and check type file
  $body.on('change', 'input[type="file"]', function () {
    var $this = $(this),
      valText = $this.val(),
      fileName = valText.split(/(\\|\/)/g).pop(),
      fileItem = $this.siblings('.file-item'),
      beginSlice = fileName.lastIndexOf('.') + 1,
      typeFile = fileName.slice(beginSlice);

    fileItem.find('.file-name').text(fileName);
    if (valText != '') {
      fileItem.removeClass('hide-btn');

      for (var i = 0; i < coutnTypeFiles; i++) {

        if (typeFile == typeFileArea[i]) {
          $this.parent().addClass('has-mach');
        }
      }
    } else {
      fileItem.addClass('hide-btn');
    }

    if (!$this.parent().hasClass('has-mach')) {
      $this.parent().addClass('error');
    }
  });

  //remove file
  $body.on('click', '.btn-del-file', function () {
    var elem = $(this).closest('.one-file');
    elem.fadeOut(400);
    setTimeout(function () {
      elem.remove();


      var wrapFiles = $('.files-wr'),
        newFileInput;
      countFiles = wrapFiles.data('count-files') + 1;
      wrapFiles.data('count-files', countFiles);

      newFileInput = '<div class="one-file"><div class="file-item hide-btn"><span class="btn btn-del-file">x</span><span class="file-name"></span></div><input type="file" name="desc_load" id="desc_load"><label for="desc_load" class="desc_label"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"    xmlns="http://www.w3.org/2000/svg">    <path       d="M19 18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18Z"       fill="black" />    <path       d="M4 17V19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19V17C6 16.4477 5.55228 16 5 16C4.44772 16 4 16.4477 4 17Z"       fill="black" />    <path       d="M18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17Z"       fill="black" />    <path       d="M12 15C11.7926 15.0016 11.59 14.9387 11.42 14.82L7.41995 12C7.20436 11.8471 7.05809 11.615 7.01312 11.3545C6.96815 11.0941 7.02813 10.8264 7.17995 10.61C7.25574 10.5019 7.35219 10.4098 7.46376 10.3391C7.57532 10.2684 7.69977 10.2206 7.82994 10.1982C7.9601 10.1759 8.09339 10.1796 8.22212 10.2091C8.35085 10.2386 8.47247 10.2933 8.57995 10.37L12 12.76L15.3999 10.2C15.6121 10.0409 15.8788 9.97255 16.1414 10.0101C16.4039 10.0476 16.6408 10.1878 16.7999 10.4C16.9591 10.6122 17.0274 10.8789 16.9899 11.1414C16.9524 11.404 16.8121 11.6409 16.5999 11.8L12.6 14.8C12.4269 14.9298 12.2163 15 12 15Z"       fill="black" />    <path       d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"       fill="black" /> </svg></label></div>';
      wrapFiles.prepend(newFileInput);
    });
  });
});







$(function(){
  $("#client_tel").mask("+7(999) 999-9999");
});






let row = $('.tab-content_inner'),
  item = $('.tab-content_inner-item'),
  allportf = $('.tab-content_inner-item');
  webportf = $('.web-portfolio');
  promportf = $('.prom-portfolio');
  desportf = $('.design-portfolio');


row.masonry({
  itemSelector: '.tab-content_inner-item',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
});

$('#all-portfolio_btn').on('click', () => {
  item.addClass('hide');
  allportf.removeClass('hide');

  row.masonry();
});

$('#web-portfolio_btn').on('click', () => {
  item.addClass('hide');
  webportf.removeClass('hide');

  row.masonry();
});

$('#prom-portfolio_btn').on('click', () => {
  item.addClass('hide');
  promportf.removeClass('hide');

  row.masonry();
});


$('#design-portfolio_btn').on('click', () => {
  item.addClass('hide');
  desportf.removeClass('hide');

  row.masonry();
});












$(document).on('click', '.lawcen', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-lawcen').fadeIn();
});

$(document).on('click', '.exzaim', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-exzaim').fadeIn();
});

$(document).on('click', '.ttswin', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-ttswin').fadeIn();
});

$(document).on('click', '.fgmgame', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-fgmgame').fadeIn('slow','linear');
});

$(document).on('click', '.rmpwr', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-rmpwr').fadeIn('slow','linear');
});
$(document).on('click', '.fontan-prtf', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.modal-fontan-prtf').fadeIn('slow','linear');
});





$(document).on('click', '.tab-content_inner-item', function(){
  event.preventDefault();
  var id = $('.modalyak'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 0);
  $('.tab-content_inner-item').removeClass('modal-scroll');
  $(this).addClass('modal-scroll');
  $('.container').css("padding", "0")
  $('.bg-overlay').fadeIn();
  $('.hide-effect').fadeOut();
});

$(document).on('click', '.close_inner', function(){
  $('.container').css("padding", "0 15px")
  $('.modal').fadeOut();
  $('.bg-overlay').fadeOut();
  $('.hide-effect').fadeIn();


  event.preventDefault();
          var id = $('.modalyak'),
          top = $(id).offset().top;
          $('body,html').animate({scrollTop: top}, 0);
          $('.tab-content_inner-item').removeClass('modal-scroll');
});


$(document).on('click', '.bg-overlay', function(){
  $('.container').css("padding", "0 15px")
  $('.modal').fadeOut();
  $('.bg-overlay').fadeOut();
  $('.hide-effect').fadeIn();
;


  event.preventDefault();
          var id = $('.modalyak'),
          top = $(id).offset().top;
          $('body,html').animate({scrollTop: top }, 0);
          $('.tab-content_inner-item').removeClass('modal-scroll');
});



$(document).on('click', '.close', function(){
  $('.container').css("padding", "0 15px")
  $('.modal').fadeOut();
  $('.bg-overlay').fadeOut();
  $('.hide-effect').fadeIn();
  event.preventDefault();
          var id = $('.modalyak'),
          top = $(id).offset().top;
          $('body,html').animate({scrollTop: top}, 0);
          $('.tab-content_inner-item').removeClass('modal-scroll');
});






$(document).on('click', '.more-logo', function(){
  $('.more-logo-r').toggleClass('left');
  $('.more-logo-r').toggleClass('pricetime-height');
});
$(document).on('click', '.more-style', function(){
  $('.more-style-r').toggleClass('left');
  $('.more-style-r').toggleClass('pricetime-height');
});
$(document).on('click', '.more-mat', function(){
  $('.more-mat-r').toggleClass('left');
  $('.more-mat-r').toggleClass('pricetime-height');
});