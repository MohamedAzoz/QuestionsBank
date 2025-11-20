import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../Services/result.service';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgClass],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  result!: number;
  degree!: number;
  numberOfQuestions!: number;
  constructor(
    private _result: ResultService,
    private _shared: SharedDataService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    let mark: number = 0;
    this._shared.degree.subscribe((x) => (mark = x));
    this.degree = mark;

    let Length: number = 0;
    this._shared.numberOfQuestions.subscribe((x) => (Length = x));

    this.numberOfQuestions = Length;

    const value = this._result.grade(this.degree, this.numberOfQuestions);

    this.result = parseInt(`${value}`);
    if (!value && !Length && !mark) {
      this._router.navigate(['']);
    }
  }
}
