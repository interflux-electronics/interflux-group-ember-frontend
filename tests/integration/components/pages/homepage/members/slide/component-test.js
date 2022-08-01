import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | pages/homepage/members/slide',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      this.set('company', {
        id: '123',
        businessName: 'Interflux Test',
        country: {
          get: (key) => {
            return this[key];
          },
          id: 'BE'
        }
      });

      await render(
        hbs`<Pages::Homepage::Members::Slide @company={{this.company}} />`
      );

      assert.dom('.slide').exists();
    });
  }
);
