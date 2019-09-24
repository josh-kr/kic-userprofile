import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './models';

export function queryPaginated<T>(http: HttpClient, baseUrl: string, urlOrFilter?: string | object): Observable<Page> {
  let params = new HttpParams();
  let paramString = '';
  let url = baseUrl;

  if (typeof urlOrFilter === 'string') {
    // we were given a page URL, use it
    url = urlOrFilter;
  } else if (typeof urlOrFilter === 'object') {
    // we were given filtering criteria, build the query string
    const getChild = function (filerObject, parent?) {
      Object.keys(filerObject).forEach(key => {
        const key_value = filerObject[key];
        let obj_parent = parent || '';
        if (typeof urlOrFilter[key] === 'object') {
          obj_parent = key;
          getChild(filerObject[key], obj_parent);
        } else {
          if (obj_parent !== '') {
            paramString += `${obj_parent}.`;
          }
          paramString += `${key}=${key_value.toString()}&`;
        }
      });
    };
    getChild(urlOrFilter);
    const paramArray = paramString.split('&').slice(0, -1);
    paramArray.forEach(element => {
      const parma = element.split('=');
      params = params.set(`${parma[0]}`, parma[1].toString());
    });
  }


  return http.get<Page>(url, {
    params: params
  });
}
