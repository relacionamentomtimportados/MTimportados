/* ==========================================================================
   ARÔME DE CAPELIN - CAROUSEL & VITRINES CONTROLLER
   ========================================================================== */

class HeroCarousel {
  constructor(carouselId) {
    this.container = document.getElementById(carouselId);
    if (!this.container) return;
    this.track = this.container.querySelector('.carousel-track');
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.prevBtn = this.container.querySelector('.carousel-control.prev');
    this.nextBtn = this.container.querySelector('.carousel-control.next');
    this.indicatorsContainer = this.container.querySelector('.carousel-indicators');

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayTimer = null;

    this.init();
  }

  init() {
    if (this.totalSlides <= 1) return;

    // Build indicators
    if (this.indicatorsContainer) {
      this.indicatorsContainer.innerHTML = '';
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `indicator-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => this.goToSlide(i));
        this.indicatorsContainer.appendChild(dot);
      }
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Touch Swipe Support
    let startX = 0;
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        this.nextSlide();
        this.resetAutoPlay();
      } else if (endX - startX > 50) {
        this.prevSlide();
        this.resetAutoPlay();
      }
    }, { passive: true });

    this.startAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updatePosition();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updatePosition();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updatePosition();
  }

  updatePosition() {
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    if (this.indicatorsContainer) {
      const dots = this.indicatorsContainer.querySelectorAll('.indicator-dot');
      dots.forEach((dot, idx) => {
        if (idx === this.currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayTimer);
    this.startAutoPlay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.heroCarousel = new HeroCarousel('hero-carousel');
});
