export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IGeo {
    lat: number;
    lng: number;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}

export interface IBaseResponse {
    code: string;
    description: string;
}

export interface IResponse<T>{
    code?: string;
    description?: string;
    data: T;
    total?: number;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany
}

