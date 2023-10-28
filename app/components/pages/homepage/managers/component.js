import Component from '@glimmer/component';

export default class PagesHomepageManagersComponent extends Component {
  get members() {
    return this.args.companies
      .findBy('businessName', 'Interflux Group')
      .members.map((member) => {
        const { title, person } = member;

        return { title, person };
      });
  }
}
