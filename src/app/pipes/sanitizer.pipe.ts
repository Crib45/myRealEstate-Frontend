import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
