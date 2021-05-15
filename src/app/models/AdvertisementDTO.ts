import { Advertisement } from "./Advertisement";

export class AdvertisementDTO {
    public advertisement: Advertisement = new Advertisement();
    public favoriteAd: any;
    public advertisementPicture: any;
    public primaryPic: any;
    constructor(){}
}
