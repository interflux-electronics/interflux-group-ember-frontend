import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LeftNavComponent extends Component {
  @tracked scrollY = 0;
}
