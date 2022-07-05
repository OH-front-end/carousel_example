/* eslint-disable class-methods-use-this */
class Carousel {
  constructor(p) {
    // #4
    const settings = { ...{ containerID: '.carousel', slideID: '.slide', interval: 1000, isPlay: true }, ...p };

    this.container = document.querySelector(settings.containerID);
    this.slides = document.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlay = settings.isPlay;
  }
  // #1
  // _initConfig(o) {
  //   const p = {
  //     containerID: '.carousel', slideID: '.slide', interval: 1000, isPlay: true
  //   };


  //   if (typeof o !== 'undefined') {
  //     p.containerID = o.containerID || p.containerID;
  //     p.slideID = o.slideID || p.slideID;
  //     p.interval = o.interval || p.interval;
  //     p.isPlay = o.isPlay ?? p.isPlay;
  //   }
  //   return p;
  // }


  // #2
  // _initConfig(o) {
  //   const p = { containerID: '.carousel', slideID: '.slide', interval: 1000, isPlay: true };

  //   return { ...p, ...o };
  // }

  // #3
  // _initConfig(o) {
  //   return { ...{ containerID: '.carousel', slideID: '.slide', interval: 1000, isPlay: true }, ...o };
  // }

  initProps() {
    this.CODELEFTARROW = 'ArrowLeft';
    this.CODERIGHTARROW = 'ArrowRight';
    this.CODESPACE = 'Space';
    this.currentSlide = 0;
    this.SLIDES_COUNT = this.slides.length;
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }

  initContols() {
    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control control-pause">
                     <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                     <span id="fa-play-icon">${this.FA_PLAY}</span>
                   </span>`;
    const PREV = `<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`;
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.appendChild(controls);

    this.pauseButton = document.querySelector('#pause-btn');
    this.previousButton = document.querySelector('#prev-btn');
    this.nextButton = document.querySelector('#next-btn');

    this.pauseIcon = document.querySelector('#fa-pause-icon');
    this.playIcon = document.querySelector('#fa-play-icon');

    this.isPlay ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
  }

  initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;

      if (i === 0) indicator.classList.add('active');

      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indicatorsContainer = document.querySelector('.indicators');
    this.indicators = document.querySelectorAll('.indicator');
  }



  _goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _pressKey(e) {
    if (e.code === this.CODELEFTARROW) this.prevHandler();
    if (e.code === this.CODERIGHTARROW) this.nextHandler();
    if (e.code === this.CODESPACE) this.pausePlay();
  }



  _initListener() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.previousButton.addEventListener('click', this.prevHandler.bind(this));
    this.nextButton.addEventListener('click', this.nextHandler.bind(this));
    this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  pause() {
    if (this.isPlay) {
      clearInterval(this.timerID);
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.isPlay = false;
    }
  }

  play() {
    if (!this.isPlay) {
      this.timerID = setInterval(this._goToNext.bind(this), this.interval);
      this.pauseIcon.style.opacity = 1;
      this.playIcon.style.opacity = 0;
      this.isPlay = true;
    }
  }

  pausePlay() {
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
    this.isPlay ? this.pause() : this.play();
  }

  prevHandler() {
    this.pause();
    this._goToPrev();
  }

  nextHandler() {
    this.pause();
    this._goToNext();
  }

  indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this.pause();
      this._goToNth(+target.dataset.slideTo);
    }
  }

  init() {
    this.initProps();
    this.initIndicators();
    this.initContols();
    this._initListener();
    if (this.isPlay) this.timerID = setInterval(this._goToNext.bind(this), this.interval);
  }
}


export default Carousel;
