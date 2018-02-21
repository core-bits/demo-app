import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ITask, ITaskGroup, IOSPlatform } from "app/xtelth/shared/services/xtelth-objects"
import { Http } from "@angular/http";
import { SpinnerService } from "app/core/spinner/spinner.service";
import { UserProfileService } from "app/core/user-profile.service";
import { ParamUtil, ContentType } from "app/core/iparam";
import { IResponse, IBaseResponse } from "app/core/user.model";
import { LAYOUT_CONFIG } from "app/layout/shared/services/config";

@Injectable()
export class TaskService {
    private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.XTELTH_DEVELOPMENT + "rest/api/";
    constructor(private http: Http, private currentUser: UserProfileService,
        private spinnerService: SpinnerService, private paramUtil: ParamUtil,
        private contentType: ContentType) { }

    getTaskList(): Observable<IResponse<ITask[]>> {
        this.spinnerService.show();
        return this.http.get(this.PATH + "task/list").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
            .finally(() => this.spinnerService.hide());
    }

    getTaskGroupList(): Observable<IResponse<ITask[]>> {
        this.spinnerService.show();
        return this.http.get(this.PATH + "task/group-list").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
            .finally(() => this.spinnerService.hide());
    }

     getOSPlatformList(): Observable<IResponse<IOSPlatform[]>> {
        this.spinnerService.show();
        return this.http.get(this.PATH + "asset/os-platforms").map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
            .finally(() => this.spinnerService.hide());
    }

    createTaskGroup(task: ITaskGroup): Observable<IBaseResponse> {
        this.spinnerService.show();
        return this.http.post(this.PATH + "task/create-group", task).map((response) => {
            return response.json();
        }).catch(this.paramUtil.handleError)
            .finally(() => this.spinnerService.hide());
    }
}