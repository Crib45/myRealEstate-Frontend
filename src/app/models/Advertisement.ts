export class Advertisement {
    public title: string = '';
    public description: string ='';
    public price?: number;
    public estate?: any;
    public finished: boolean = false;
    public published: boolean = true;
    public createdAt?: number;
    public expireDate?: number;
    constructor(){}
}