import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Integration | Component | pages/homepage/members', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    setBreakpoint(['desktop', 'widescreen']);

    await render(hbs`<Pages::Homepage::Members />`);

    assert.dom('h2').exists();
    assert.dom('h2').hasText('Members');
  });
});
