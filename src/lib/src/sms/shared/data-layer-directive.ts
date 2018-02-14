import { Directive, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { CoreApiService, CoreApiSelector, CoreApiSelectorParams } from '../../shared';

export class DataLayerDirective {
    @Input() endpoint: string;
    @Input() filters: Object;
    @Input() fields: string[];
    @Input() include: string[];
    @Input() orderBy: string;
    @Input() page: number;
    @Input() pageSize: number;
    @Output() result = new EventEmitter();

    constructor() {

    }

    get selector() {
        return new CoreApiSelector({
            endpoint: this.endpoint,
            filters: this.filters,
            fields: this.fields,
            include: this.include,
            orderBy: this.orderBy,
            page: this.page,
            pageSize: this.pageSize
        });
    }

    getSelector(params?: CoreApiSelectorParams){
        return new CoreApiSelector({
            endpoint: params.endpoint || this.endpoint,
            filters: params.filters || this.filters,
            fields: params.fields || this.fields,
            include: params.include || this.include,
            orderBy: params.orderBy || this.orderBy,
            page: params.page || this.page,
            pageSize: params.pageSize || this.pageSize
        });
    }
}