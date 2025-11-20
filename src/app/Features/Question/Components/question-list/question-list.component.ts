import { Component, Input } from '@angular/core';
import { IQuestion } from '../../Models/iquestion';
import { QuestionAPIService } from '../../Services/question-api.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
  @Input({ required: true }) questions!: IQuestion[];
  constructor(private _questApi: QuestionAPIService) {}
  go(id: number) {
    const value = this.questions.find((x) => x.questionId == id)!;
    this._questApi.question.next(value);
  }
}
