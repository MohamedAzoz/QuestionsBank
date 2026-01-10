import { Component, OnInit } from '@angular/core';
import { TestApiService } from '../../Services/test-api.service';
import { IQuestion } from '../../../Question/Models/iquestion';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-test-review',
  standalone: true,
  imports: [NgClass],
  templateUrl: './test-review.component.html',
  styleUrl: './test-review.component.scss',
})
export class TestReviewComponent implements OnInit {
  Questions: IQuestion[] = [];
  SelectedIDs: { [id: number]: boolean } = {};
  Options: number[] = [];
  constructor(private _test: TestApiService) {}
  ngOnInit(): void {
    this._test.Questions.subscribe({
      next: (questions) => {
        this.Questions = questions;
      },
    });
    this._test.Questions.getValue().forEach((question) => {
      if (question) {
        this.Options.push(Number(localStorage.getItem(`${question}`)));
      }
    });

    this._test.selectedMap.subscribe((map) => (this.SelectedIDs = map));
  }
}
