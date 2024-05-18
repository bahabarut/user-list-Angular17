export interface UserModel extends BaseModel {
    age: number;
    gender: string;
    email: string;
    phone: string,
    company: CompanyModel;
}

export interface CompanyModel extends BaseModel {
    location: string;
}
interface BaseModel {
    id: number;
    name: string;
}