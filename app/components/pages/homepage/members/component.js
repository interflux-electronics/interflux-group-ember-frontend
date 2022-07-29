import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class PagesHomepageMembersComponent extends Component {
  @service window;

  @tracked shownSlide = 0;
  @tracked shownContent = 0;
  @tracked slideHeight = 300;

  get shownCompany() {
    return this.companies ? this.companies.mapBy('id')[this.shownSlide] : null;
  }

  get companies() {
    if (this.args.companies) {
      return [
        'Interflux Electronics',
        'Interflux Singapore',
        'Interflux China, Beijing',
        'Interflux China, Shanghai',
        'Interflux China, Shenzhen',
        'Interflux China, Suzhou',
        'Interflux Sweden',
        'Interflux Norway',
        'Interflux Denmark',
        'Interflux Estonia',
        'Interflux Poland',
        'Interflux France',
        'Interflux Australia',
        'Interflux Mexico'
      ].map((name) => {
        return this.args.companies.findBy('businessName', name);
      });
    } else {
      return null;
    }
  }

  @action
  onInsert() {
    if (this.companies) {
      this.showCompany(0);
    }
  }

  @action
  showCompany(i) {
    const n = this.companies.length;
    const ii = i < 0 ? 0 : i < n ? i : n - 1;
    const height = document.querySelectorAll('#slides .slide')[ii].offsetHeight;
    this.shownSlide = ii;
    this.shownContent = null;
    this.slideHeight = height;
    this.showContentSoon(ii);
  }

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

  get stageStyle() {
    const offset = this.shownSlide * -1 * 400; // 300px logo + 100px gap

    return htmlSafe(`left: ${offset}px`);
  }
}
