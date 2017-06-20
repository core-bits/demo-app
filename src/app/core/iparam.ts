import { Injectable } from '@angular/core';

export interface IParam {
  keyValue: IParamKeyValuePair[];
  rowPerPage?: string;
  currentPageNumber?: string;
}

export interface IParamKeyValuePair {
  key: string;
  value: string;
  sortOrder?: string;
}

@Injectable()
export class ParamUtil {

  buildQueryParams(context: string, param: IParam, sortfield?: string, sortorder?: string, page?: number, limit?: number): string {
    let isSort, isPaging, isParam: boolean = false;
    let path: string = "";
    if (sortfield && sortorder) {
      path += "_sort=" + sortfield + "&_order=" + sortorder;
    }

    if (page > 0 && limit > 0) {
      const paging = "_page=" + page + "&_limit=" + limit;
      path += path.length > 0 ? "&" + paging : "_page=" + page + "?" + paging;
    }

    if (param && param.keyValue && param.keyValue.length > 0) {
      let query: string = "";
      param.keyValue.forEach((item: IParamKeyValuePair) => {
        query += item.key + "=" + item.value + "&";
      });
      path = path.substring(0, path.length - 1);
      path += path.length > 0 ? "&" + query : "?" + query;
    }

    if (path.length > 0) {
      context = context.indexOf('?') === -1 ? context.concat("?") : context;
      context += path;
    } else {
      context = context.indexOf('?') === -1 ? context : context.replace("?", "");
    }

    return context;
  }


}