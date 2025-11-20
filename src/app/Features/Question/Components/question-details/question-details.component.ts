import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../Models/iquestion';
import { QuestionAPIService } from '../../Services/question-api.service';
import { NgClass } from '@angular/common';
import { IOption } from '../../Models/ioption';
import { SharedDataService } from '../../../../Shared/Services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './question-details.component.html',
  styleUrl: './question-details.component.scss',
})
export class QuestionDetailsComponent implements OnInit {
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

  // next() {
  //   this.IsTrue = false;
  //   this.IsCorrectOption = false;
  //   this.IsSelected = false;
  //   this.IsFalse = false;
  //   this._active.paramMap.subscribe((E) => {
  //     let questionId: number = Number(E.get('questionId') || 1);

  //     let value: IQuestion = this.questions.find(
  //       (x) => x.questionId == questionId+1
  //     )!;
  //     this.Redirect(value.questionId);
  //     this._questApi.question.next(value);
  //     this.IsEndQuestion =
  //       this.questions.indexOf(value) == this.questions.length - 1;
  //   });
  // }

  next() {
    // 1. إعادة تعيين الحالة المرئية
    this.IsTrue = false;
    this.IsNotCorrectOption = false;
    this.IsSelected = false;
    this.IsFalse = false;
    // 2. البحث عن الموقع الحالي
    const currentIndex = this.questions.findIndex(
      (q) => q.questionId === this.question.questionId
    ); // استخدم .id للمقارنة

    // 3. التحقق من النهاية
    if (currentIndex < 0 || currentIndex === this.questions.length - 1) {
      this.IsEndQuestion = true;
      // this.endTest();
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

  // دالة محسنة للحصول على الـ IDs من الـ snapshot
  Redirect(nextQuestionId: number) {
    // استخدام snapshot آمن وسريع للحصول على القيم الحالية من المسار
    const subjectId =
      Number(this._active.snapshot.paramMap.get('subjectId')) || 1;
    const examId = Number(this._active.snapshot.paramMap.get('examId')) || 1;

    // console.log(subjectId, ' / ', examId, ' / ', nextQuestionId);

    // التنقل إلى المسار الجديد
    this._router.navigate([
      '/subject',
      subjectId,
      'exam',
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
    // localStorage.setItem('degree', `${num}`);
  }
}
