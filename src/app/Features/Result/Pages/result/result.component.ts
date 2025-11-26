import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../Services/result.service';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../../../../Core/Services/navigation.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  result!: number;
  degree!: number;
  numberOfQuestions!: number;
  IsTest: boolean = false;
  subjectId!: number;
  testId!: number;
  questionId!: number;
  Url!: string;

  constructor(
    private _result: ResultService,
    private _navigation: NavigationService,
    private _shared: SharedDataService,
    private _router: Router
  ) {
        const navigation = this._router.getCurrentNavigation();

    if (navigation && navigation.previousNavigation) {
      const prevUrl = navigation.previousNavigation.finalUrl?.toString()??'';
      this.extractPreviousIds(prevUrl);
  }
  }
  ngOnInit(): void {
    let mark: number = 0;
    this.degree = this._shared.degree.getValue();
    
    
    const storedDegree = parseInt(localStorage.getItem('degree') ?? '0');
    if (storedDegree > this.degree) {
        this.degree = storedDegree;
    }

    this.numberOfQuestions = this._shared.numberOfQuestions.getValue(); 

    const value = this._result.grade(this.degree, this.numberOfQuestions);

    this.result = value;

    if (!value && !mark) {
      this.Redirect();
    }
  }

  extractPreviousIds(url: string): void {
    const match = url.match(/\/subject\/(\d+)\/test\/(\d+)\/(\d+)/);

    if (match) {
      this.subjectId = Number(match[1]);
      this.testId = Number(match[2]);
      this.questionId = Number(match[3]);

      this.Url = `/subject/${this.subjectId}/test/${this.testId}/1`;
      this.IsTest = true;
    }
  }

NewTest() {
    this.Redirect(this.Url);
  }

  Redirect(location: string = '') {
    this._router.navigate([location]);
    this._shared.degree.next(0);
    this._shared.numberOfQuestions.next(0);
    localStorage.clear();
  }
}
