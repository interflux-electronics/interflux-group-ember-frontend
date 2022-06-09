import Route from '@ember/routing/route';

export default class MemberRoute extends Route {
  model(params) {
    return {
      member: params.slug,
    };
  }
}
