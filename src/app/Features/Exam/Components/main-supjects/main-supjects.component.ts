import { Component, Input, OnInit } from '@angular/core';
import { IExam } from '../../Models/iexam';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-supjects',
  standalone: true,
  imports: [],
  templateUrl: './main-supjects.component.html',
  styleUrl: './main-supjects.component.scss'
})
export class MainSupjectsComponent implements OnInit {
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