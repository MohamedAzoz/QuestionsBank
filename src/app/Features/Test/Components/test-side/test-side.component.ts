import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../../Question/Models/iquestion';
import { QuestionAPIService } from '../../../Question/Services/question-api.service';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { TestApiService } from '../../Services/test-api.service';

@Component({
  selector: 'app-test-side',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './test-side.component.html',
  styleUrl: './test-side.component.scss',
})
export class TestSideComponent implements OnInit {
  timeLeft: number = 60 * 30 * 1000; // 30 minutes
  IsFreezed: boolean = false;
  IsSelected: boolean = false;
  selectedMap: { [id: number]: boolean } = {};
  @Input({ required: true }) questions!: IQuestion[];
  constructor(
    private _questApi: QuestionAPIService,
    private _testApi: TestApiService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.Timer();

    this._testApi.selectedMap.subscribe((map) => {
      this.selectedMap = map;
    });
  }
  go(id: number) {
    const value = this.questions.find((x) => x.questionId == id)!;
    this._questApi.question.next(value);
  }
  submit() {
    this._router.navigate(['/result']);
  }

  Timer() {
    let time = 60 * 30; // 30 minutes
    const timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        this.submit();
      }
      time--;
      this.IsFreezed = time >= 29 * 60;
      this.timeLeft = time * 1000;
    }, 1000);
  }
}
