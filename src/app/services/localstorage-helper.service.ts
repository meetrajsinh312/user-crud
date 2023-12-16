import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageHelperService {

  constructor() { }

  setItem(key: string, obj: Object | Object[]) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
  
}
