import Component from '@glimmer/component';

interface PageFooterContainerArgs {
    id: string;
}

export default class PageFooterContainer extends Component<PageFooterContainerArgs> {
    get id() {
        return this.args.id ?? 'application-footer';
    }
}
