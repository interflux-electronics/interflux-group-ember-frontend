import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PagesHomepageActivitiesComponent extends Component {
  @service window;

  @action
  onInsert(ul) {
    window.onscroll = () => {
      this.assertInView(ul, '#chemistry');
      this.assertInView(ul, '#machines');
      this.assertInView(ul, '#know-how');
    };
  }

  assertInView(ul, selector) {
    const li = ul.querySelector(selector);
    if (li.classList.contains('in-view')) {
      return;
    }
    const img = li.querySelector('img');
    const imageBottom = this.topOf(img) + img.clientHeight;
    const viewportBottom = window.scrollY + window.innerHeight;
    const inView = imageBottom < viewportBottom;
    if (inView) {
      li.classList.add('in-view');
    }
  }

  topOf = (elem) => {
    let location = 0;
    if (elem.offsetParent) {
      do {
        location += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return location >= 0 ? location : 0;
  };
}
