import { Injectable } from "@angular/core";
import { LAYOUT_CONFIG } from "app/layout/shared/services/config";
import { UserProfileService } from "app/core/user-profile.service";
import { Http } from "@angular/http";
import { SpinnerService } from "app/core/spinner/spinner.service";
import { ParamUtil, ContentType } from "app/core/iparam";
import { IResponse } from "app/core/user.model";
import { Observable } from "rxjs/Observable";
import { IHacker, IXpyExecution, IXpyExecutionLog, ITask, IAsset } from "app/xtelth/shared/services/xtelth-objects";

@Injectable()
export class XpyExecutionService{
    private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.XTELTH_DEVELOPMENT + "rest/api/";
    constructor(private http : Http, private currentUser: UserProfileService,
        private spinnerService: SpinnerService, private paramUtil: ParamUtil,
        private contentType: ContentType){}

    getHackerList(): Observable<IResponse<IHacker[]>>{
        this.spinnerService.show();
        return this.http.get(this.PATH + "hacker/list").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
        .finally(() => this.spinnerService.hide());
    }

    getXpyExecutionList(hackerId: number): Observable<IResponse<IXpyExecution[]>>{
        this.spinnerService.show();
        return this.http.get(this.PATH + "hacker/xpy-log/" + hackerId).map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
        .finally(() => this.spinnerService.hide());
    }

    getXpyExecutionLogList(xpyLogId: number): Observable<IResponse<IXpyExecutionLog[]>>{
        this.spinnerService.show();
        return this.http.get(this.PATH + "hacker/xpy-inspection-log/" + xpyLogId).map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
        .finally(() => this.spinnerService.hide());
    }

    getTaskGroup(): Observable<IResponse<ITask[]>>{
        this.spinnerService.show();
        return this.http.get(this.PATH + "task/group").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
        .finally(() => this.spinnerService.hide());
    }

    getAssetList(): Observable<IResponse<IAsset[]>>{
        this.spinnerService.show();
        return this.http.get(this.PATH + "asset/list").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
        .finally(() => this.spinnerService.hide());
    }
}