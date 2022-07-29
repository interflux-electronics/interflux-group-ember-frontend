import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LeftNavComponent extends Component {
  @action
  onInsert(aside) {
    const link1 = aside.querySelector('li:nth-child(1) a');
    const link2 = aside.querySelector('li:nth-child(2) a');
    const link3 = aside.querySelector('li:nth-child(3) a');
    const link4 = aside.querySelector('li:nth-child(4) a');

    const section1 = document.querySelector('section#hero');
    const section2 = document.querySelector('section#locations');

    const distanceFromTop = (el) => {
      let d = 0;
      if (el.offsetParent) {
        do {
          d += el.offsetTop;
          el = el.offsetParent;
        } while (el);
      }
      return d >= 0 ? d : 0;
    };

    const assert = (link) => {
      const d1 = distanceFromTop(section1);
      const d2 = distanceFromTop(section2);
      const d3 = distanceFromTop(link);
      const h1 = section1.offsetHeight;
      const h2 = section2.offsetHeight;
      const y1 = d1 - d3;
      const y2 = d1 + h1 - d3;
      const y3 = d2 - d3;
      const y4 = d2 + h2 - d3;
      const scroll = window.scrollY;
      const overSection1 = scroll > y1 && scroll < y2;
      const overSection2 = scroll > y3 && scroll < y4;

      if (overSection1 || overSection2) {
        link.classList.add('white');
      } else {
        link.classList.remove('white');
      }
    };

    const onScroll = () => {
      assert(link1);
      assert(link2);
      assert(link3);
      assert(link4);
    };

    if (section1 && section2) {
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
  }
}
