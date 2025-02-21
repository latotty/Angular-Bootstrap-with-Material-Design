import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[mdbCollapse]',
  exportAs: 'bs-collapse',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('expandBody', [
      state('collapsed', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('500ms ease')),
    ]),
  ],
})
export class CollapseComponent implements OnInit {
  @Input() isCollapsed = true;

  @Output() showBsCollapse: EventEmitter<any> = new EventEmitter();
  @Output() shownBsCollapse: EventEmitter<any> = new EventEmitter();
  @Output() hideBsCollapse: EventEmitter<any> = new EventEmitter();
  @Output() hiddenBsCollapse: EventEmitter<any> = new EventEmitter();
  @Output() collapsed: EventEmitter<any> = new EventEmitter();
  @Output() expanded: EventEmitter<any> = new EventEmitter();

  constructor() {}

  @HostBinding('@expandBody') expandAnimationState: string;
  @HostBinding('style.overflow')
  overflow = 'hidden';

  @HostListener('@expandBody.done', ['$event'])
  onExpandBodyDone(event: any) {
    setTimeout(() => {
      if (event.toState === 'expanded') {
        this.shownBsCollapse.emit(this);
        this.expanded.emit(this);
        this.overflow = 'visible';
      } else {
        this.hiddenBsCollapse.emit(this);
        this.collapsed.emit(this);
      }
    }, 0);
  }

  toggle() {
    this.isCollapsed ? this.show() : this.hide();
  }

  show() {
    this.expandAnimationState = 'expanded';
    this.isCollapsed = false;

    this.showBsCollapse.emit(this);
  }

  hide() {
    this.overflow = 'hidden';
    this.expandAnimationState = 'collapsed';
    this.isCollapsed = true;

    this.hideBsCollapse.emit(this);
  }

  initializeCollapseState() {
    this.isCollapsed ? this.hide() : this.show();
  }

  ngOnInit() {
    this.initializeCollapseState();
  }
}
