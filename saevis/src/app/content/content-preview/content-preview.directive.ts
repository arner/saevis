import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[app-content-preview]'
})
export class ContentPreviewDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
