import { Component, OnInit } from '@angular/core';
import { QuestionAPIService } from '../../Services/question-api.service';
import { IQuestion } from '../../Models/iquestion';
import { QuestionDetailsComponent } from '../../Components/question-details/question-details.component';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [QuestionDetailsComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  data!: IQuestion[];
  constructor(
    private _question: QuestionAPIService,
    private _activate: ActivatedRoute,
    private _shared: SharedDataService
  ) {}
  ngOnInit(): void {
    const examId = Number(this._activate.snapshot.paramMap.get('examId')) || 1;
    const questionId =
      Number(this._activate.snapshot.paramMap.get('questionId')) || 1;
    if (examId > 0) {
      this._question.getAll(examId).subscribe((x) => {
        this._question.question.next(x.data.at(questionId - 1)!);
        this._shared.numberOfQuestions.next(x.data.length);
        this.data = x.data;
      });
    }
  }
}
