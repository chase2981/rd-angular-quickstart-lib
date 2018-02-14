import { Directive, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CoreApiSelector, CoreApiService, TextMsgItApiService, CoreApiSelectorParams } from '../../shared';

@Directive({
  selector: '[rdSmsSent]',
  exportAs: 'rdSmsSent'
})
export class SmsSentDirective {

  endpoint: string = '/smsSent';

  constructor(private coreApiSvc: CoreApiService, private txtApi: TextMsgItApiService) { }

  ngOnInit() {

  }

  get(params?: CoreApiSelectorParams){
    let selector = new CoreApiSelector({
      endpoint: this.endpoint,
      filters: params.filters,
      include: params.include,
      orderBy: params.orderBy,
      page: params.page,
      pageSize: params.pageSize
    });
    return this.txtApi.get(selector.stringify());
  }

}
