import { Component, Input, OnInit } from '@angular/core';
import { IOption } from '../../../Question/Models/ioption';
import { IQuestion } from '../../../Question/Models/iquestion';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { QuestionAPIService } from '../../../Question/Services/question-api.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.scss'
})
export class TestDetailsComponent implements OnInit {
  @Input({ required: true }) questions!: IQuestion[];
  question!: IQuestion;

  IsTrue: boolean = false;
  IsFalse: boolean = false;
  IsSelected: boolean = false;
  IsNotCorrectOption: boolean = false;

  
  SelectOptionId!: number;

  IsEndQuestion: boolean = false;
  constructor(
    private _questApi: QuestionAPIService,
    private _shared: SharedDataService,
    private _router: Router,
    private _active: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._questApi.question.subscribe((x) => {
      if (x) {
        this.question = x;
        this.IsTrue = false;
        this.IsNotCorrectOption = false;
        this.IsSelected = false;
        this.IsFalse = false;
         // قم بفحص ما إذا كان السؤال الحالي هو الأخير عند التحديث
        this.IsEndQuestion =
          this.questions.indexOf(this.question) === this.questions.length - 1;
      }
    });
  }

  next() {
    // 1. إعادة تعيين الحالة المرئية
    this.IsTrue = false;
    this.IsNotCorrectOption = false;
    this.IsSelected = false;
    this.IsFalse = false;
    // 2. البحث عن الموقع الحالي
    const currentIndex = this.questions.findIndex(
      (q) => q.questionId === this.question.questionId
    ); 
    if (currentIndex < 0 || currentIndex === this.questions.length - 1) {
      this.IsEndQuestion = true;
      return;
    }

    // 4. تحديد السؤال التالي
    const nextQuestion = this.questions[currentIndex + 1];

    if (nextQuestion) {
      // 5. تحديث Shared Service بالسؤال التالي
      this._questApi.question.next(nextQuestion);

      // 6. التنقل إلى الـ URL الجديد (باستخدام الدالة المحسنة)
      this.Redirect(nextQuestion.questionId);
    }
    this.IsEndQuestion =
      this.questions.indexOf(nextQuestion) == this.questions.length - 1;
  }

  Redirect(nextQuestionId: number) {
    // استخدام snapshot آمن وسريع للحصول على القيم الحالية من المسار
    const subjectId =
      Number(this._active.snapshot.paramMap.get('subjectId')) || 1;
    const examId = Number(this._active.snapshot.paramMap.get('examId')) || 1;

    // التنقل إلى المسار الجديد
    this._router.navigate([
      '/subject',
      subjectId,
      'test',
      examId,
      nextQuestionId,
    ]);
  }

  endTest() {
    this._router.navigate(['/result']);
  }

  back() {
    let value: IQuestion = this.questions.find(
      (x) =>
        this.questions.indexOf(x) == this.questions.indexOf(this.question) - 1
    )!;
    this._questApi.question.next(value);
  }

  select(option: IOption) {
    this.IsSelected = true;
    this.SelectOptionId = option.optionId;
    if (option.optionId == this.question.optionAswerId) {
      this.IsTrue = true;
      this.addDegree();
    } else {
      this.IsFalse = true;
      this.IsNotCorrectOption = true;
    }
  }
  addDegree() {
    const num = this._shared.degree.getValue() + 1;
    this._shared.degree.next(num);
  }
}

