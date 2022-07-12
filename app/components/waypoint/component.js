import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WaypointComponent extends Component {
  @tracked waypoint;
  @tracked viewed = false;

  @action
  onInsert(element) {
    this.waypoint = element;

    const assertInView = () => {
      if (this.viewed) {
        return;
      }
      const waypointY = this.distanceFromTop(this.waypoint);
      const viewportBottom = window.scrollY + window.innerHeight;
      const inView = waypointY < viewportBottom;
      if (inView) {
        this.viewed = true;
        this.args.onFirstView(true);
        window.removeEventListener('scroll', assertInView);
      }
    };

    window.addEventListener('scroll', assertInView);
  }

  distanceFromTop = (element) => {
    let distance = 0;
    if (element.offsetParent) {
      do {
        distance += element.offsetTop;
        element = element.offsetParent;
      } while (element);
    }
    return distance >= 0 ? distance : 0;
  };
}
