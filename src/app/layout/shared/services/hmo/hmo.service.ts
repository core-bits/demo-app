import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LAYOUT_CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../../../../core/user.model';

export interface IHMO {
    id: number;
    hmoNumber: string;
    name: string;
    email: string;
    telephoneNumber: string;
    address: string;
    website: string;
    description: string;
}

export interface IHospital {
    id: number;
    hostpitalNumber: string;
    name: string;
    description: string;
    address: string;
    telephoneNumber: string;
    emailAddress: string;
    websiteAddress: string;
    contactPhoneNumber: string;
    contactEmail: string;
}

export interface ICompany {
    id: number;
    companyNumber: string;
    name: string;
    description: string;
    telephoneNumber: string;
    email: string;
    websiteAddress: string;
    contactPhoneNumber: string;
    contactEmail: string;
}

export interface IPlan {
    id: number;
    name: string;
    description: string;
}

export class CommonService {
    headers: Headers = new Headers(LAYOUT_CONFIG.REQUEST_TYPE);
    options: RequestOptions = new RequestOptions({ headers: this.headers })
}

@Injectable()
export class HMOService extends CommonService {
    private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT + "/api/hmo/";
    constructor(private http: Http) {
        super();
    }

    getHMOList(): Observable<IResponse<IHMO[]>> {
        return this.http.get(this.PATH + "getAllHMO").map(this.mapToIHMO).catch(this.handleError);
    }

    getHMOHospitalList(hmoNumber: string): Observable<IResponse<IHospital>> {
        return this.http.get(this.PATH + "getHmoHospital/" + hmoNumber).map(this.mapToIHospital).catch(this.handleError);
    }

    getHMOCompanyList(hmoNumber: string): Observable<ICompany[]> {
        return this.http.get(this.PATH + "getHmoCompanies/" + hmoNumber).map(this.mapToICompany).catch(this.handleError);
    }

    getHMOPlanList(hmoNumber: string): Observable<IPlan[]> {
        return this.http.get(this.PATH + "getHmoPlans/" + hmoNumber).map(this.mapToIPlan).catch(this.handleError);
    }

    createNewHMO(hmo: IHMO): Observable<IResponse<IHMO>> {        
        return this.http.post(this.PATH + "create", hmo, this.options).map(this.mapToIHMO).catch(this.handleError);
    }

    assignCompanyToHMO(hmoNumber: string, companyNumber: string) {
        return this.http.post(this.PATH + "assignCompanyToHMO", {hmoNumber: hmoNumber, companyNumber: companyNumber}, this.options)
    }

    private mapToIHMO(response: Response): IResponse<IHMO[]> {
        let body: any = response.json();
        return {
            code: body.statusCode,
            description: body.statusMessage,
            data: body.hmoList,
            total: body.total
        };
    }

    private mapToIHospital(response: Response): IResponse<IHospital[]> {
        let body: any = response.json();
        return {
            code: body.statusCode,
            description: body.statusMessage,
            data: body.hmoList,
            total: body.total || body.hmoList.length
        };
    }

    private mapToICompany(response: Response): IResponse<ICompany[]> {
        let body: any = response.json();
        return {
            code: body.statusCode,
            description: body.statusMessage,
            data: body.hmoList,
            total: body.total || body.hmoList.length
        };
    }

    private mapToIPlan(response: Response): IResponse<IPlan> {
        let body: any = response.json();
        return {
            code: body.statusCode,
            description: body.statusMessage,
            data: body.hmoList,
            total: body.total || body.hmoList.length
        };
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}