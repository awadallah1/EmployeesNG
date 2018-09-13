import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";
import * as myJson  from '../../assets/Counteries.json';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  constructor(private http:Http) { }

getCountries(){
  const word:any = myJson.default;
  // console.log(word); // output 'testing'
  // return this.http.get('assets/Countries.json')
  // .pipe(map(result=>result.json()))
  return word
}




}
