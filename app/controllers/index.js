import Controller from '@ember/controller';

export default class IndexController extends Controller {
  get companies() {
    return this.model.companies || [];
  }

  get group() {
    return this.companies.findBy('businessName', 'Interflux Group');
  }

  get managers() {
    if (!this.group) {
      return [];
    }

    return this.group.members.map((member) => {
      const { title, person } = member;

      return { title, person };
    });
  }
}
