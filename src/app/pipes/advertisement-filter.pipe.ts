import { Pipe, PipeTransform } from '@angular/core';
import { AdvertisementDTO } from '../models/AdvertisementDTO';

@Pipe({
  name: 'advertisementFilter'
})
export class AdvertisementFilterPipe implements PipeTransform {

  transform(value: AdvertisementDTO[], maxPrice: number, title: string, minSize: number, maxSize:number ): AdvertisementDTO[] {
    let filteredArray: AdvertisementDTO[] = value.filter(element => {
      if(maxPrice && element.advertisement.price && element.advertisement.price > maxPrice) {
        return false;
      }
      return true;
    });
    filteredArray = filteredArray.filter(element => {
      if(title && !element.advertisement.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }
      return true;
    });
    filteredArray = filteredArray.filter(element => {
      if(minSize && element.advertisement.estate && element.advertisement.estate.size && element.advertisement.estate.size < minSize) {
        return false;
      }
      return true;
    });

    filteredArray = filteredArray.filter(element => {
      if(maxSize && element.advertisement.estate && element.advertisement.estate.size && element.advertisement.estate.size > maxSize) {
        return false;
      }
      return true;
    });

    return filteredArray;
  }

}
