import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | page/footer', function (hooks) {
    setupRenderingTest(hooks);

    test('Footer Renders and has correct text', async function (assert) {
        await render(hbs`
            <Page::Footer::Container />
            <Page::Footer>Test</Page::Footer>
        `);

        assert.dom('#application-footer').hasText('Test');
    });

    test('Overriding text works', async function (assert) {
        await render(hbs`
            <Page::Footer::Container />
            <Page::Footer>Test</Page::Footer>
            <Page::Footer>Test1</Page::Footer>
        `);

        assert.dom('#application-footer').hasText('Test1');
    });

    test('Text is set back to initial value after component removal', async function (assert) {
        this.set('showTest1', true);
        await render(hbs`
            <Page::Footer::Container />
            <Page::Footer>Test</Page::Footer>
            {{#if this.showTest1}}
                <Page::Footer>Test1</Page::Footer>
            {{/if}}
        `);

        assert.dom('#application-footer').hasText('Test1');

        this.set('showTest1', false);

        assert.dom('#application-footer').hasText('Test');
    });
});
