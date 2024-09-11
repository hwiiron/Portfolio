// intro
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(hideIntro, 2500);
});

function hideIntro() {
  var intro = document.querySelector('.intro');
  intro.style.opacity = '0';
  setTimeout(function () {
    intro.style.display = 'none';
    var mainContent = document.getElementById('container');
    mainContent.style.opacity = '1';
  }, 800);
}


// typeIt
new TypeIt("#typeIt", {
  strings: "Hello World",
  speed: 100,
  startDelay: 1000,
}).go();


// cursor
var pointSize = $(".cursor").width() / 2;
$("#home").mousemove(function (e) {
  $('.cursor').css("top", e.pageY - pointSize);
  $('.cursor').css("left", e.pageX - pointSize);
});


// scroll custom
window.onscroll = function () {
  progressBar()
};


// scroll시
$(window).scroll(function () {
  var scrollPosition = $(this).scrollTop();
  var logo = $('header h1 a');
  var cursor = $('.cursor');
  var header = $('header');
  var ball = $('#home');

  if (scrollPosition > 0) {
    logo.addClass('on');
    cursor.addClass('hidden');
    ball.addClass('hidden');
  } else {
    logo.removeClass('on');
    cursor.removeClass('hidden');
    ball.removeClass('hidden');
  }

  if (scrollPosition > 1000) {
    header.css('background', '#fff');
  } else {
    header.css('background', '0');
  }
});

function progressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementsByClassName("scroll-bar")[0].style.width = scrolled + "%";
}


// nav
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll('nav ul li a');
  var sections = document.querySelectorAll('.content');

  function setActiveNavLink() {
    var currentScroll = window.pageYOffset + 50;
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;
      var targetNavLink = document.querySelector('nav ul li a[href="#' + section.id + '"]');
      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight || (currentScroll + window.innerHeight) >= document.body.offsetHeight) {
        navLinks.forEach(function (link) { link.classList.remove('active'); });
        targetNavLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      var targetElement = document.querySelector(targetId);
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      navLinks.forEach(function (link) { link.classList.remove('active'); });
      link.classList.add('active');
    });
  });
});


// project data-aos-delay
window.addEventListener('resize', function () {
  var listItem = document.querySelectorAll('#project .list li');

  if (window.innerWidth >= 641) {
    for (var i = 0; i < listItem.length; i++) {
      var delay = (i % 3 === 0) ? 100 : (i % 3 === 1) ? 300 : 700;
      listItem[i].setAttribute('data-aos-delay', delay);
    }
  }
  else {
    for (var i = 0; i < listItem.length; i++) {
      var delay = (i % 2 === 0) ? 100 : 300;
      listItem[i].setAttribute('data-aos-delay', delay);
    }
  }
});

window.dispatchEvent(new Event('resize'));



// project transition
document.addEventListener("DOMContentLoaded", function () {
  var listItems = document.querySelectorAll("#project .list li");

  listItems.forEach(function (item) {
    item.addEventListener("mouseleave", function () {
      this.style.transition = "0.3s ease";
    });
  });
});


// #contact
$(window).on('scroll', function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    setTimeout(function () {
      $('#contact .inner .communication dt, #contact .inner .communication dd').addClass('on');
    }, 500);

    setTimeout(function () {
      $('#contact .inner .communication dd a').addClass('on');
    }, 1200);
  } else {
    $('#contact .inner .communication dt, #contact .inner .communication dd').removeClass('on');
    $('#contact .inner .communication dd a').removeClass('on');
  }
});


// EmailJS
window.onload = function () {
  var contactForm = document.getElementById('contactForm');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');
  var submitButton = contactForm.querySelector('button[type="submit"]');

  function checkInputs() {
    var userEmail = emailInput.value.trim();
    var message = messageInput.value.trim();

    if (userEmail !== '' && message !== '') {
      submitButton.classList.add('on');
    } else {
      submitButton.classList.remove('on');
    }
  }

  emailInput.addEventListener('input', checkInputs);
  messageInput.addEventListener('input', checkInputs);

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var userEmail = emailInput.value.trim();
    var message = messageInput.value.trim();

    if (userEmail === '') {
      alert('이메일을 입력해주세요.');
      emailInput.focus();
      return;
    }

    if (message === '') {
      alert('문의 내용을 입력해주세요.');
      messageInput.focus();
      return;
    }

    emailjs.sendForm('shinhwiiron', 'template_si4igcg', this)
      .then(() => {
        console.log('SUCCESS!');
        alert('빠른 시일 내에 답변드리겠습니다. 감사합니다.');
        emailInput.value = '';
        messageInput.value = '';
        submitButton.classList.remove('on');
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });
  });
}


// popup
$('.noLink').click(function (event) {
  if ($(window).width() <= 1199) {
    event.preventDefault();
    alert("PC로 접속해주세요.");
  } else {
    var target = $(this).data('target');
    $(target).fadeIn(300);
    $('body').css('overflow', 'hidden');
  }
});

$('.popup .close, .popupBg').click(function (event) {
  if ($(event.target).hasClass('popupBg') || $(event.target).hasClass('close')) {
    $(this).closest('.popupBg').fadeOut(300);
    $('body').css('overflow', 'auto');
  }
});


// 오른쪽 클릭 방지
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert('개발자 도구를 사용할 수 없습니다.');
}, false);

// 개발자도구 접근 키 방지
document.addEventListener('keydown', function (e) {
  if (e.keyCode == 123 ||
    (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) ||
    (e.ctrlKey && e.keyCode == 85) ||
    (e.metaKey && e.altKey && e.keyCode == 73) ||  // Command + Option + I
    (e.metaKey && e.shiftKey && e.keyCode == 67) ||  // Command + Shift + C
    (e.metaKey && e.keyCode == 85)) {  // Command + U
    e.preventDefault();
    alert('개발자 도구를 사용할 수 없습니다.');
  }
}, false);


// 1199이하 해상도에서 alert
// var windowWidth = window.innerWidth;

// if (windowWidth <= 1199) {
//     alert("자세한 정보를 원하시면 PC로 접속해주세요.");
// }


// mobile 접속 제한
// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     alert("PC로 접속해주세요.");
//     window.close();
// }