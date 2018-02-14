import { Observable } from 'rxjs/Rx';

import { CoreApiSelector, TextMsgItApiService } from '../../shared';

export interface ApiDirective {
  endpoint: string;
  get(selector: CoreApiSelector): Observable<any>;
}