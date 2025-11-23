import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { QuestionDetailsComponent } from '../../../Question/Components/question-details/question-details.component';
import { IQuestion } from '../../../Question/Models/iquestion';
import { TestApiService } from '../../Services/test-api.service';
import { QuestionAPIService } from '../../../Question/Services/question-api.service';
import { TestDto } from '../../Models/test-dto';
import { TestDetailsComponent } from "../../Components/test-details/test-details.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ TestDetailsComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  data!: IQuestion[];
  constructor(
    private _test: TestApiService,
    private _question: QuestionAPIService,
    private _activate: ActivatedRoute,
    private _shared: SharedDataService
  ) {}
  ngOnInit(): void {
    const examId = Number(this._activate.snapshot.paramMap.get('examId')) || 1;
    const questionId =
      Number(this._activate.snapshot.paramMap.get('questionId')) || 1;
    if (examId > 0) {
      let test: TestDto = {
        examId: examId,
        numberOfQuestion: 10,
      };
      this._test.getTest(test).subscribe((x) => {
        this._question.question.next(x.data.at(questionId - 1)!);
        this._shared.numberOfQuestions.next(x.data.length);
        this.data = x.data;
      });
    }
  }
}
