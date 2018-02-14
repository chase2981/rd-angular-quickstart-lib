import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'jssha';

import { AuthService } from './shared';
import { TextMsgItAuthServiceConfig } from './text-msg-it-auth-service-config';


@Injectable()
export class TextMsgItAuthService extends AuthService {

    constructor(config: TextMsgItAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
