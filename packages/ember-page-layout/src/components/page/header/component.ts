import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Layout from 'services/layout';

export interface PageHeaderArgs {
    id?: string;
    empty?: boolean;
    document?: Document;
}

export interface PageHeaderSignature {
    Args: PageHeaderArgs;
    Blocks: { default: []; initial: [] };
}
export default class PageHeader extends Component<PageHeaderSignature> {
    @service declare layout: Layout;
    @tracked uniqueId: string | null = null;

    constructor(owner: any, args: PageHeaderArgs) {
        super(owner, args);
        const uniqueId = guidFor(this);
        this.uniqueId = uniqueId;
        scheduleOnce('afterRender', this, this.addItem, uniqueId);
    }

    get show() {
        console.log(this.uniqueId === this.layout.currentHeader);
        return this.uniqueId === this.layout.currentHeader;
    }

    get id() {
        return this.args.id ?? 'application-header';
    }

    get empty() {
        return this.args.empty ?? false;
    }

    get document() {
        return this.args.document ?? (getOwner(this) as any).lookup('service:-document');
    }

    @action
    addItem(uniqueId: string) {
        this.layout.headerTree = [...this.layout.headerTree, uniqueId];
    }

    willDestroy(): void {
        super.willDestroy();
        this.layout.headerTree = [...this.layout.headerTree.filter((id: string) => id !== this.uniqueId)];
    }
}
