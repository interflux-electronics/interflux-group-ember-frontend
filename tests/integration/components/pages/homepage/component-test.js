import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Integration | Component | pages/homepage', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows the hero on desktop & widescreen', async function (assert) {
    setBreakpoint(['desktop', 'widescreen']);

    await render(hbs`<Pages::Homepage />`);

    assert.dom('section#hero').exists();
    assert.dom('h1').exists();
    assert
      .dom('h1')
      .hasText(
        'Chemistry, machines and know-how for electronics manufacturers'
      );
  });

  test('it shows no hero on mobile and tablet', async function (assert) {
    setBreakpoint(['mobile', 'tablet']);

    this.set('members', [
      {
        businessName: 'Interflux Electronics'
      }
    ]);

    await render(hbs`<Pages::Homepage @members={{this.members}} />`);

    assert.dom('section#hero').doesNotExist();
    assert.dom('section#members').exists();
  });
});
