import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  grade(degree: number, numOfQuest: number) {
    const GPA = parseInt(`${(degree / numOfQuest) * 100}`);
    return GPA;
  }
}
