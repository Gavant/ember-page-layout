import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Router from '@ember/routing/router-service';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Layout from 'services/layout';

export interface PageSidebarArgs {
    id?: string;
    empty?: boolean;
    document?: Document;
}

export interface PageSidebarSignature {
    Args: PageSidebarArgs;
    Blocks: { default: []; initial: [] };
}

export default class PageSidebar extends Component<PageSidebarSignature> {
    @service declare router: Router;
    @service declare layout: Layout;
    @tracked uniqueId: string | null = null;

    constructor(owner: any, args: PageSidebarArgs) {
        super(owner, args);
        const uniqueId = guidFor(this);
        this.uniqueId = uniqueId;
        scheduleOnce('afterRender', this, this.addItem, uniqueId);
    }

    @action
    addItem(item: string) {
        this.layout.sidebarTree = [...this.layout.sidebarTree, item];
    }

    get show() {
        return this.uniqueId === this.layout.currentSidebar;
    }

    get id() {
        return this.args.id ?? 'application-sidebar';
    }

    get empty() {
        return this.args.empty ?? false;
    }

    get document() {
        return this.args.document ?? (getOwner(this) as any).lookup('service:-document');
    }

    willDestroy(): void {
        super.willDestroy();
        this.layout.sidebarTree = [...this.layout.sidebarTree.filter((id) => id !== this.uniqueId)];
    }
}
