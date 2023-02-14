// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/using-glint/ember/authoring-addons
import type PageHeaderContainer from './components/page/header/container';
import type PageFooterContainer from './components/page/footer/container';
import type PageSidebarContainer from './components/page/sidebar/container';
import type PageHeader from './components/page/header';
import type PageFooter from './components/page/footer';
import type PageSidebar from './components/page/sidebar';

declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'Page::Header::Container': typeof PageHeaderContainer;
        'Page::Footer::Container': typeof PageFooterContainer;
        'Page::Sidebar::Container': typeof PageSidebarContainer;
        'Page::Header': typeof PageHeader;
        'Page::Footer': typeof PageFooter;
        'Page::Sidebar': typeof PageSidebar;
    }
}
