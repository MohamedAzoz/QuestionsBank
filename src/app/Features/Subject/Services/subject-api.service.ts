import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubject } from '../Models/isubject';
import { environment } from '../../../../environments/environment.development';
import { IResult } from '../../../Core/Models/iresult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectAPIService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<IResult<ISubject[]>> {
    return this._http.get<IResult<ISubject[]>>(`${environment.apiUrl}/Subjects`);
  }
}
