import { Component, OnInit } from '@angular/core';
import { ExamAPIService } from '../../Services/exam-api.service';
import { IExam } from '../../Models/iexam';
import { ExamDetailsComponent } from '../../Components/exam-details/exam-details.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ExamDetailsComponent, NgIf],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  data!: IExam[];
  subjectId!: number;
  constructor(
    private _exam: ExamAPIService,
    private _activate: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this._activate.paramMap.subscribe((E) => {
    //   this.subjectId = Number(E.get('subjectId') || 0);
    localStorage.clear();
    const subjectId2 =
      Number(this._activate.snapshot.paramMap.get('subjectId')) || 1;

    if (subjectId2 > 0) {
      this.subjectId = subjectId2;
      this._exam.getAll(subjectId2).subscribe((x) => {
        this.data = x.data;
        // console.log(x.data);
      });
    }
    // });
  }
}
