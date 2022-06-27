import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Layout from '../../services/layout';

export interface PageFooterArgs {
    id?: string;
    empty?: boolean;
    document?: Document;
}

export interface PageFooterSignature {
    Args: PageFooterArgs;
    Blocks: { default: []; initial: [] };
}
export default class PageHeader extends Component<PageFooterSignature> {
    @service declare layout: Layout;
    @tracked uniqueId: string | null = null;

    constructor(owner: unknown, args: PageFooterArgs) {
        super(owner, args);
        const uniqueId = guidFor(this);
        this.uniqueId = uniqueId;
        scheduleOnce('afterRender', this, this.addItem, uniqueId);
    }

    /**
     * Add item to the appropriate service list
     *
     * @param {string} uniqueId
     * @memberof PageHeader
     */
    @action
    addItem(uniqueId: string) {
        this.layout.footerTree = [...this.layout.footerTree, uniqueId];
    }

    get show() {
        return this.uniqueId === this.layout.currentFooter;
    }

    get id() {
        return this.args.id ?? 'application-footer';
    }

    get empty() {
        return this.args.empty ?? false;
    }

    get document() {
        return this.args.document ?? (getOwner(this) as any).lookup('service:-document');
    }

    willDestroy(): void {
        super.willDestroy();
        this.layout.footerTree = [...this.layout.footerTree.filter((id: string) => id !== this.uniqueId)];
    }
}
