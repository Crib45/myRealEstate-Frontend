export class Advertisement {
    public id?: Number;
    public title: string = '';
    public description: string ='';
    public price?: number;
    public estate?: any;
    public finished: boolean = false;
    public published: boolean = false;
    public createdAt?: Number;
    public expireDate?: Number;
    constructor(){}
}