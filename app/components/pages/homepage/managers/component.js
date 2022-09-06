import Component from '@glimmer/component';

export default class PagesHomepageManagersComponent extends Component {
  get members() {
    return [
      {
        title: 'Founder, Director & CEO',
        person: {
          firstName: 'Daniel',
          lastName: 'Werkhoven',
          avatarPath: 'images/people/daniel-werkhoven-1',
          avatarVariations: '@250x250.jpg,@250x250.png,@250x250.webp'
        }
      },
      {
        title: 'Chief Operating Officer',
        person: {
          firstName: 'Annick',
          lastName: 'Peeters',
          avatarPath: 'images/people/annick-peeters-2',
          avatarVariations: '@250x250.jpg,@250x250.png,@250x250.webp'
        }
      },
      {
        title: 'Chief Operating Officer',
        person: {
          firstName: 'Steven',
          lastName: 'Teliszewski',
          avatarPath: 'images/people/steven-teliszewski',
          avatarVariations: '@160x160.jpg'
        }
      }
    ];
  }
}
