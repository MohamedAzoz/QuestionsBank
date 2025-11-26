import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IResult } from '../../../Core/Models/iresult';
import { IQuestion } from '../../Question/Models/iquestion';
import { TestDto } from '../Models/test-dto';
import { IQuestionSelectes } from '../Models/iquestion-selectes';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {
  IsSelected:BehaviorSubject<IQuestionSelectes>=new BehaviorSubject<IQuestionSelectes>({optionId: 0, IsSelected: false});
  selectedMap: BehaviorSubject<{ [id: number]: boolean }> = new BehaviorSubject<{ [id: number]: boolean }>({});
  constructor(private _http: HttpClient) {}

  getTest(_TestDto:TestDto): Observable<IResult<IQuestion[]>> {
    return this._http.post<IResult<IQuestion[]>>(
      `${environment.apiUrl}/Question/Test`,_TestDto
    );
  }
}
