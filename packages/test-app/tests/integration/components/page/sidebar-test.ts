import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | page/sidebar', function (hooks) {
    setupRenderingTest(hooks);

    test('Sidebar Renders and has correct text', async function (assert) {
        await render(hbs`
            <Page::Sidebar::Container />
            <Page::Sidebar>Test</Page::Sidebar>
        `);

        assert.dom('#application-sidebar').hasText('Test');
    });

    test('Overriding text works', async function (assert) {
        await render(hbs`
            <Page::Sidebar::Container />
            <Page::Sidebar>Test</Page::Sidebar>
            <Page::Sidebar>Test1</Page::Sidebar>
        `);

        assert.dom('#application-sidebar').hasText('Test1');
    });

    test('Text is set back to initial value after component removal', async function (assert) {
        this.set('showTest1', true);
        await render(hbs`
            <Page::Sidebar::Container />
            <Page::Sidebar>Test</Page::Sidebar>
            {{#if this.showTest1}}
                <Page::Sidebar>Test1</Page::Sidebar>
            {{/if}}
        `);

        assert.dom('#application-sidebar').hasText('Test1');

        this.set('showTest1', false);

        assert.dom('#application-sidebar').hasText('Test');
    });
});
