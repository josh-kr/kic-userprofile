import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Page<T> {
  data?: {
    cars: Array<T>
  };
  meta?: {
    page: {
      offset: number;
      size: number;
    },
    totalElements: number;
    totalPages: number;
  };
  errors?: {
    code: string;
    datetime: {
      value: string;
      timezone: string;
    };
    path: string;
    reason: string;
    resourceId: string;
    rootCauses: []
  };
}

export function queryPaginated<T>(http: HttpClient, baseUrl: string, urlOrFilter?: string | object): Observable<Page<T>> {
  let params = new HttpParams();
  let url = baseUrl;

  if (typeof urlOrFilter === 'string') {
    // we were given a page URL, use it
    url = urlOrFilter;
  } else if (typeof urlOrFilter === 'object') {
    console.log('pagingate object', urlOrFilter);
    // we were given filtering criteria, build the query string
    Object.keys(urlOrFilter).sort().forEach(key => {
      console.log('has', key);
      const value = urlOrFilter[key];
      // if (value.hasOwnProperty('page')) {
      if (!!Object.keys(urlOrFilter[key]).length) {
      console.log('has own prop');
      Object.keys(value).sort().forEach(subKey => {
        console.log(value[subKey]);
        const subValue = value[subKey];
        params = params.set(`${key}.${subKey}`, subValue.toString());
      });
    } else if (value !== null) {
      params = params.set(key, value.toString());
    }
  });
}

return http.get<Page<T>>(url, {
  params: params
});
}
