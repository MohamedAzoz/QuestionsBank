import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor() {}
  grade(degree: number, numOfQuest: number) {
    const GPA = (degree / numOfQuest) * 100;
    return GPA;
  }
}
