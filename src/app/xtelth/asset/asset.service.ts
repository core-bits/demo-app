import { Injectable } from "@angular/core";
import { LAYOUT_CONFIG } from "app/layout/shared/services/config";
import { Http } from "@angular/http";
import { UserProfileService } from "app/core/user-profile.service";
import { ParamUtil, ContentType } from "app/core/iparam";
import { SpinnerService } from "app/core/spinner/spinner.service";
import { IResponse } from "app/core/user.model";
import { Observable } from "rxjs/Observable";
import { IAsset, IOSPlatform } from "app/xtelth/shared/services/xtelth-objects";

@Injectable()
export class AssetService {
    private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.XTELTH_DEVELOPMENT + "rest/api/";
    constructor(private http: Http, private currentUser: UserProfileService,
        private spinnerService: SpinnerService, private paramUtil: ParamUtil,
        private contentType: ContentType) { }

    getAssetList(): Observable<IResponse<IAsset[]>> {
        this.spinnerService.show();
        return this.http.get(this.PATH + "asset/list").map((response) => {
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
}