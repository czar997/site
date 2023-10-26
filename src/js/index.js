import mobileNav from './modules/mobile-nav.js';
mobileNav();

//
import ScrollReveal from 'scrollreveal';
import Vivus from 'vivus';
import { Swiper } from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.clients__partners', {
    modules: [Autoplay],
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      900: {
        slidesPerView: 5,
      },
      1100: {
        slidesPerView: 6,
      },
      1300: {
        slidesPerView: 8.25,
      },
    },
    loop: true,
    speed: 3500,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    spaceBetween: 40,
    a11y: false,
    allowTouchMove: true,
    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        this.el.addEventListener('mouseleave', () => {
          this.autoplay.start();
        });
      },
    },
  });

  const swiperFeedback = new Swiper('.testimonials__slider', {
    modules: [Pagination],
    slidesPerView: 'auto',
    centeredSlides: true,
    centeredSlidesBounds: true,
    initialSlide: 1,
    speed: 1200,
    spaceBetween: -105,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: -30,
      },
      575: {
        spaceBetween: -50,
      },
      768: {
        spaceBetween: -75,
      },
      1024: {
        spaceBetween: -105,
      },
    },
  });

  //sticky header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('sticky', window.scrollY > 260);
  });

  //Модальное окно "Попробуй бесплатно"
  const modalTryFreeBtn = document.querySelectorAll('[data-try]');
  const modalTryWindow = document.querySelector('.modal__tryfree');

  if (modalTryFreeBtn.length > 0 && modalTryWindow) {
    const closeModal = (event) => {
      const target = event.target;
      if (target === modalTryWindow || target.closest('.modal__close')) {
        modalTryWindow.style.opacity = '0';
        document.body.classList.toggle('no-scroll');
        setTimeout(() => {
          modalTryWindow.style.visibility = 'hidden';
        }, 300);
      }
    };

    const openModal = () => {
      modalTryWindow.style.opacity = '1';
      modalTryWindow.style.visibility = 'visible';
      document.body.classList.toggle('no-scroll');
    };

    modalTryFreeBtn.forEach((btn) => {
      btn.addEventListener('click', openModal);
    });

    modalTryWindow.addEventListener('click', closeModal);
  }
  // Табы в истории компании
  const dateInfoLabels = document.querySelectorAll('.history__date-info');
  const infoTabs = document.querySelectorAll('.history__info-text');

  if (dateInfoLabels.length > 0 && infoTabs.length > 0) {
    dateInfoLabels.forEach((label) => {
      label.addEventListener('click', () => {
        const tab = label.getAttribute('data-tab');

        infoTabs.forEach((tabContent) => {
          tabContent.classList.remove('active-tab');
        });

        const selectedTab = document.getElementById(tab);
        if (selectedTab) {
          selectedTab.classList.add('active-tab');
        }
      });
    });
  }
  //
  //VIVUS SVG
  // Функция, определяющая, виден ли элемент
  window.onload = function () {
    const isVisible = (elem) => {
      const e = elem.getBoundingClientRect();
      return e.bottom >= 0 && e.top <= (window.innerHeight || document.documentElement.clientHeight);
    };

    const initVivus = (svgElement) => {
      // Изменение opacity перед началом анимации
      svgElement.style.opacity = '1';

      new Vivus(svgElement, {
        type: 'delayed',
        duration: 150,
        animTimingFunction: Vivus.EASE,
      });
    };

    const handleVisibility = () => {
      document.querySelectorAll('[data-animate-svg]:not([data-animated])').forEach((svgElement) => {
        if (isVisible(svgElement)) {
          svgElement.setAttribute('data-animated', 'true');
          initVivus(svgElement);
        }
      });
    };

    const svgImages = document.querySelectorAll('img[airweb-svg-animation]');
    const svgInitPromises = Array.from(svgImages).map(function (imgElement) {
      return fetch(imgElement.src)
        .then((response) => response.text())
        .then((data) => {
          const divElement = document.createElement('div');
          divElement.innerHTML = data;
          const svgElem = divElement.querySelector('svg');

          if (!svgElem) {
            console.error('SVG content not found for', imgElement.src);
            return null;
          }

          svgElem.setAttribute('data-animate-svg', '');

          Array.from(imgElement.attributes).forEach((attr) => {
            svgElem.hasAttribute(attr.name) || svgElem.setAttribute(attr.name, attr.value);
          });

          imgElement.replaceWith(svgElem);
          return svgElem;
        });
    });

    Promise.all(svgInitPromises).then(() => {
      handleVisibility();
      window.addEventListener('scroll', handleVisibility);
    });
  };

  // SCroll reveal

  // Определение анимации для элемента
  ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 800,
    delay: 100,
    easing: 'ease-in-out',
  });
  ScrollReveal().reveal('.functional__info', {
    origin: 'bottom', // Меняем точку происхождения анимации на верхний край элемента
  });
  ScrollReveal().reveal('.functional__grid-card:nth-child(1),.functional__grid-card:nth-child(2),.functional__grid-card:nth-child(3)', {
    origin: 'top', // Меняем точку происхождения анимации на верхний край элемента
  });
  ScrollReveal().reveal('.functional__grid-card:nth-child(4),.functional__grid-card:nth-child(5),.functional__grid-card:nth-child(6)', {
    origin: 'bottom', // Меняем точку происхождения анимации на верхний край элемента
  });
  ScrollReveal().reveal('.benefits__content-item', {
    opacity: 0, // начальная прозрачность
    duration: 1000, // продолжительность анимации в миллисекундах
    distance: '0px', // насколько далеко элемент будет двигаться
    scale: 1, // начальный масштаб элемента
    reset: false, // если true, анимация будет повторяться каждый раз при входе/выходе элемента из области видимости
  });

  if (window.innerWidth <= 575) {
    ScrollReveal().reveal('.functional__grid-card', {
      origin: 'bottom',
    });
  }
});
