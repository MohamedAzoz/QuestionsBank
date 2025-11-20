import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IExam } from '../../Models/iexam';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ExamDetailsComponent implements OnInit {
  @Input({ required: true }) exams!: IExam[];
  @Input({ required: true }) subjectId!: number;
  
    questionId: number=0;
    constructor(
      private _activate: ActivatedRoute
    ) {}
    ngOnInit(): void {
      const questionId2 = Number(this._activate.snapshot.paramMap.get('questionId')) || 1;
        if (questionId2 > 0) {
          this.questionId=questionId2
        }
    }
  }

