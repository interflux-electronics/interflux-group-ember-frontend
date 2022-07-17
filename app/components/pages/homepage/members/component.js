import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PagesHomepageMembersComponent extends Component {
  currentSlide = 0;

  get companies() {
    if (this.args.companies) {
      return this.args.companies.sortBy('rank');
    } else {
      return null;
    }
  }

  @action
  prevCompany() {
    this.goTo(this.currentSlide - 1);
  }

  @action
  nextCompany() {
    this.goTo(this.currentSlide + 1);
  }

  @action
  goTo(i) {
    console.log('goTo', i);
    const slides = document.querySelector('#slides');
    const ul = document.querySelector('#slides ul');
    const slide = document.querySelector(`#slides .slide:nth-child(${i + 1})`);
    const dot = document.querySelector(`#dots button:nth-child(${i + 1})`);
    const active = document.querySelector(`#dots button.active`);
    console.log(`${slide.clientHeight}px`);
    slides.style = `height: ${slide.clientHeight}px`;
    ul.style.left = `${i * -100}vw`;
    dot.classList.add('active');
    if (active) {
      active.classList.remove('active');
    }
    this.currentSlide = i;
  }

  @action
  onInsert() {
    this.goTo(0);
  }
}
