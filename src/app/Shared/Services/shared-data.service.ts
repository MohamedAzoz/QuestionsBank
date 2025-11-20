import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  public degree: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public numberOfQuestions: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}
}
