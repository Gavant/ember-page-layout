import Component from '@glimmer/component';

interface PageSidebarContainerArgs {
    id: string;
}

export default class PageSidebarContainer extends Component<PageSidebarContainerArgs> {
    get id() {
        return this.args.id ?? 'application-sidebar';
    }
}
