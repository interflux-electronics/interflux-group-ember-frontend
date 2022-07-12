import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PagesHomepageActivitiesComponent extends Component {
  @tracked showChemistry = false;
  @tracked showMachines = false;
  @tracked showKnowhow = false;
}
