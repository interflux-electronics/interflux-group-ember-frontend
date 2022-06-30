import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | pages/homepage/members/singapore',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`<Pages::Homepage::Members::Singapore />`);

      assert.dom('h3').exists();
      assert.dom('h3').hasText('Interflux Singapore');
    });
  }
);
