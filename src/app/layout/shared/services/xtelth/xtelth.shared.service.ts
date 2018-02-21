import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LAYOUT_CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../../../../core/user.model';

export interface IAsset{
    id: number;
    name: string;
    description?: string;
    ip: string;
}

export interface ITask{
    id: number;
    name: string;
    description?: string;
    group_id: number;
}

export interface ITaskParameter{
    id: number;
    value: string;
}

export class CommonService {
    headers: Headers = new Headers(LAYOUT_CONFIG.REQUEST_TYPE);
    options: RequestOptions = new RequestOptions({ headers: this.headers })
}

@Injectable()
export class HMOService extends CommonService {
    private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.XTELTH_DEVELOPMENT + "/rest/api/";
    constructor(private http: Http) {
        super();
    }

    getAssetList(): Observable<IResponse<IAsset[]>> {
        return this.http.get(this.PATH + "asset/list").map(this.mapToIAsset).catch(this.handleError);
    }

    getTaskList(): Observable<IResponse<ITask[]>> {
        return this.http.get(this.PATH + "task/list").map(this.mapToITask).catch(this.handleError);
    }

    private mapToIAsset(response: Response): IResponse<IAsset[]> {
        let body: any = response.json();
        return {
            code: body.code,
            description: body.description,
            data: body.data,
            total: body.total
        };
    }

    private mapToITask(response: Response): IResponse<ITask[]> {
        let body: any = response.json();
        return {
            code: body.code,
            description: body.description,
            data: body.data,
            total: body.total
        };
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}