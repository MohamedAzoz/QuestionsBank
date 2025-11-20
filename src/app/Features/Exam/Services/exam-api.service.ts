import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IResult } from '../../../Core/Models/iresult';
import { IExam } from '../Models/iexam';

@Injectable({
  providedIn: 'root',
})
export class ExamAPIService {
  constructor(private _http: HttpClient) {}

  getAll(id:number): Observable<IResult<IExam[]>> {
    return this._http.get<IResult<IExam[]>>(`${environment.apiUrl}/Exam/GetAll${id}`);
  }
}
