import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';

export default class PagesHomepageMembersComponent extends Component {
  @tracked shownIndex = 0;

  get shownCompany() {
    return this.companies ? this.companies.mapBy('id')[this.shownIndex] : null;
  }

  get companies() {
    if (this.args.companies) {
      return this.args.companies.sortBy('rank');
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
    const id = this.companies.mapBy('id')[ii];
    console.log('showCompany', i, ii, id);
    this.shownIndex = ii;
  }

  @action
  prevCompany() {
    this.showCompany(this.shownIndex - 1);
  }

  @action
  nextCompany() {
    this.showCompany(this.shownIndex + 1);
  }

  // transition: function * ({ insertedSprites, keptSprites, removedSprites }) {
  // eslint-disable-next-line require-yield
  *transition({ insertedSprites, keptSprites, removedSprites }) {
    for (let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth - 600 });
      move(sprite, { easing: easeOut });
      fadeIn(sprite);
    }

    for (let sprite of keptSprites) {
      move(sprite);
    }

    for (let sprite of removedSprites) {
      sprite.endAtPixel({ x: 0 });
      move(sprite, { easing: easeIn });
      fadeOut(sprite);
    }
  }
}
