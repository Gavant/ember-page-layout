import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | page/header', function (hooks) {
    setupRenderingTest(hooks);

    test('Header Renders and has correct text', async function (assert) {
        await render(hbs`
            <Page::Header::Container />
            <Page::Header>Test</Page::Header>
        `);

        assert.dom('#application-header').hasText('Test');
    });

    test('Overriding text works', async function (assert) {
        await render(hbs`
            <Page::Header::Container />
            <Page::Header>Test</Page::Header>
            <Page::Header>Test1</Page::Header>
        `);

        assert.dom('#application-header').hasText('Test1');
    });

    test('Text is set back to initial value after component removal', async function (assert) {
        this.set('showTest1', true);
        await render(hbs`
            <Page::Header::Container />
            <Page::Header>Test</Page::Header>
            {{#if this.showTest1}}
                <Page::Header>Test1</Page::Header>
            {{/if}}
        `);

        assert.dom('#application-header').hasText('Test1');

        this.set('showTest1', false);

        assert.dom('#application-header').hasText('Test');
    });
});
