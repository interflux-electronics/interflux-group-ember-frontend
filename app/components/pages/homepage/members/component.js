import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class PagesHomepageMembersComponent extends Component {
  @service media;
  @service window;

  @tracked shownSlide = 0;
  @tracked shownContent = 0;
  @tracked slideHeight = 300;

  get shownCompany() {
    return this.companies ? this.companies.mapBy('id')[this.shownSlide] : null;
  }

  get companies() {
    if (!this.args.companies) {
      return null;
    }
    const members = this.args.companies
      .rejectBy('businessName', 'Interflux Group')
      .sortBy('rankOnGroupWebsite');
    if (this.media.isDesktop || this.media.isWidescreen) {
      return members;
    }
    const group = {
      isGroup: true
    };
    return [group, ...members];
  }

  @action
  onInsert() {
    if (this.companies) {
      this.showCompany(0);
    }
  }

  // TODO: reset the height each time the window resizes
  @action
  showCompany(i) {
    const n = this.companies.length;
    const ii = i < 0 ? 0 : i < n ? i : n - 1;
    this.shownSlide = ii;
    this.shownContent = null;
    this.showContentSoon(ii);
    this.resize();
  }

  // TODO: remove?
  async showContentSoon(i) {
    await this.window.delay(0);
    if (this.shownSlide === i) {
      this.shownContent = i;
    }
  }

  @action
  prevCompany() {
    this.showCompany(this.shownSlide - 1);
  }

  @action
  nextCompany() {
    this.showCompany(this.shownSlide + 1);
  }

  get slidesStyle() {
    return htmlSafe(`height: ${this.slideHeight}px`);
  }

  // Akward things happen when the screen is resized.
  // Without this event listener user may be unable to scroll to the bottom on
  // mobile or tablets.
  constructor() {
    super(...arguments);

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    if (this.companies) {
      const i = this.shownSlide;
      const slides = document.querySelectorAll('#slides .slide');
      const height = slides[i].offsetHeight;

      this.slideHeight = height;
    }
  }
}
