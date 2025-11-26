import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { ResultService } from '../../Services/result.service';

@Component({
  selector: 'app-result-tast',
  standalone: true,
  imports: [NgClass,RouterLink],
  templateUrl: './result-tast.component.html',
  styleUrl: './result-tast.component.scss',
})
export class ResultTastComponent implements OnInit {
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
    let mark2 = parseInt(localStorage.getItem('degree') ?? '0');
    this.degree = mark > mark2 ? mark : mark2;

    let Length: number = 0;
    this._shared.numberOfQuestions.subscribe((x) => (Length = x));

    this.numberOfQuestions = Length;

    const value = this._result.grade(this.degree, this.numberOfQuestions);

    this.result = value;
    if (!value && !Length && !mark) {
      this.Redirect();
    }
  }

  NewTest() {
    this._router.navigate([]);
  }

  Redirect(location: string = '') {
    this._router.navigate([location]);
    localStorage.clear();
  }
}
