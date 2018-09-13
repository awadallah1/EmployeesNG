
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";
// @ts-ignore
import * as myJson  from "../../assets/Counteries.json" ;

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  constructor(private http:Http) { }

getCountries(){
  
  // return this.http.get('assets/Countries.json')
  // .pipe(map(result=>result.json()))
  const word:any = myJson.default;
  return word
}

getCountry(){
   return this.http.get('https://battuta.medunes.net/api/country/all/?key=5b2879011d53887e04bfb74019f2ca5a')
  .pipe(map(result=>result.json()))
}

getCity(code:string){
  return this.http.get(`https://battuta.medunes.net/api/region/${code}/all/?key=5b2879011d53887e04bfb74019f2ca5a`)
 .pipe(map(result=>result.json()))
}







}
