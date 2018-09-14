
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";
// @ts-ignore
import * as countries from "../../assets/JSONS/Counteries.json";
// @ts-ignore
import * as cities from "../../assets/JSONS/Cities.json";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: Http) { }

  getCountries() {

    // return this.http.get('assets/Countries.json')
    // .pipe(map(result=>result.json()))
    const _countries: any = countries.default;
    return _countries;
  }

  getCities() {
    const _cities: any = cities.default;
    return _cities;
  }



  // getCountry(){
  //    return this.http.get('https://battuta.medunes.net/api/country/all/?key=5b2879011d53887e04bfb74019f2ca5a')
  //   .pipe(map(result=>result.json()))
  // }

  // getCity(code:string){
  //   return this.http.get(`https://battuta.medunes.net/api/region/${code}/all/?key=5b2879011d53887e04bfb74019f2ca5a`)
  //  .pipe(map(result=>result.json()))
  // }







}
