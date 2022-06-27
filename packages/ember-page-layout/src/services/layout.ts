import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Layout extends Service {
    @tracked sidebarTree: string[] = [];
    @tracked headerTree: string[] = [];
    @tracked footerTree: string[] = [];

    get currentSidebar() {
        return this.sidebarTree[this.sidebarTree.length - 1];
    }

    get currentHeader() {
        return this.headerTree[this.headerTree.length - 1];
    }

    get currentFooter() {
        return this.footerTree[this.footerTree.length - 1];
    }
}
