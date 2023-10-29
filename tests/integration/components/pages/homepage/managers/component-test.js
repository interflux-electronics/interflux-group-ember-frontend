import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Integration | Component | pages/homepage/managers', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    setBreakpoint(['desktop', 'widescreen']);

    this.set('managers', [
      {
        title: 'CEO',
        person: {
          firstName: 'Daniel',
          lastName: 'Werkhoven'
        }
      },
      {
        title: 'COO',
        person: {
          firstName: 'Annick',
          lastName: 'Peeters'
        }
      },
      {
        title: 'COO',
        person: {
          firstName: 'Steven',
          lastName: 'Teliszewski'
        }
      },
      {
        title: 'CFO',
        person: {
          firstName: 'Katrien',
          lastName: 'Van Hyfte'
        }
      }
    ]);

    await render(
      hbs`<Pages::Homepage::Managers @managers={{this.managers}} />`
    );

    const headings = this.element.querySelectorAll('li strong');
    const expected = [
      'Daniel Werkhoven',
      'Annick Peeters',
      'Steven Teliszewski',
      'Katrien Van Hyfte'
    ];

    assert.strictEqual(headings.length, 4);
    assert.strictEqual(headings[0].innerText, expected[0]);
    assert.strictEqual(headings[1].innerText, expected[1]);
    assert.strictEqual(headings[2].innerText, expected[2]);
    assert.strictEqual(headings[3].innerText, expected[3]);
  });
});
