import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | pages/homepage/members/slide',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Pages::Homepage::Members::Slide />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <Pages::Homepage::Members::Slide>
        template block text
      </Pages::Homepage::Members::Slide>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  }
);
