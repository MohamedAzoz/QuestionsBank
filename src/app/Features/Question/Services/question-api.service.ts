import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from '../../../Core/Models/iresult';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IQuestion } from '../Models/iquestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionAPIService {
  public question: BehaviorSubject<IQuestion | null> =
    new BehaviorSubject<IQuestion | null>(null);
  constructor(private _http: HttpClient) {}

  getAll(examId: number): Observable<IResult<IQuestion[]>> {
    return this._http.get<IResult<IQuestion[]>>(
      `${environment.apiUrl}/Question?examId=${examId}`
    );
  }
  getById(id: number): Observable<IResult<IQuestion>> {
    return this._http.get<IResult<IQuestion>>(
      `${environment.apiUrl}/Question/${id}`
    );
  }
}
