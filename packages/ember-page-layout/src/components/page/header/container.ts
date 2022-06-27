import Component from '@glimmer/component';

interface PageHeaderContainerArgs {
    id: string;
}

export default class PageHeaderContainer extends Component<PageHeaderContainerArgs> {
    get id() {
        return this.args.id ?? 'application-header';
    }
}
