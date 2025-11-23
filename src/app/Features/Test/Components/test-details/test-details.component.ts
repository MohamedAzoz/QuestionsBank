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
  styleUrl: './test-details.component.scss',
})
export class TestDetailsComponent implements OnInit {
  @Input({ required: true }) questions!: IQuestion[];
  question!: IQuestion;

  IsSelected: boolean = false;

  SelectedID: number = 0;
  QuestionIndex: number = 0;

  IsEndQuestion: boolean = false;
  IsStartQuestion: boolean = false;
  QuestionIsFound: boolean = false;
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
        this.IsSelected = false;
        // قم بفحص ما إذا كان السؤال الحالي هو الأخير عند التحديث
        this.QuestionIndex = this.questions.indexOf(this.question);
        this.IsEndQuestion =
          this.questions.indexOf(this.question) === this.questions.length - 1;
        this.IsStartQuestion =
          this.questions.indexOf(this.question) <= this.questions.length - 1;

        const optionValue = localStorage.getItem(`${this.question.questionId}`);
        this.SelectedID = optionValue ? parseInt(optionValue) : 0;
        this.QuestionIsFound = this.SelectedID > 0;
      }
    });
  }

  next() {
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

      const optionValue = localStorage.getItem(`${this.question.questionId}`);
      this.SelectedID = optionValue ? parseInt(optionValue) : 0;
      this.QuestionIsFound = this.SelectedID > 0;
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
    // 2. البحث عن الموقع الحالي
    const currentIndex = this.questions.findIndex(
      (q) => q.questionId === this.question.questionId
    );
    if (currentIndex < 0 || currentIndex > this.questions.length - 1) {
      this.IsStartQuestion = true;
      return;
    }
    // 4. تحديد السؤال التالي
    const previousOption = this.questions[currentIndex - 1];
    if (previousOption) {
      // 5. تحديث Shared Service بالسؤال التالي
      this._questApi.question.next(previousOption);
      const optionValue = localStorage.getItem(`${this.question.questionId}`);
      this.SelectedID = optionValue ? parseInt(optionValue) : 0;
      this.QuestionIsFound = this.SelectedID > 0;
      // 6. التنقل إلى الـ URL الجديد (باستخدام الدالة المحسنة)
      this.Redirect(previousOption.questionId);
    }
    this.IsStartQuestion = this.questions.indexOf(previousOption) == 0;
  }

  select(option: IOption) {
    const questionKey = `${this.question.questionId}`;
    const optionValue = option.optionId;
    const previousOptionStored = localStorage.getItem(questionKey);
    const optionStored = previousOptionStored
      ? parseInt(previousOptionStored)
      : null;

    const IsNewOption = option.optionId === this.question.optionAswerId;
    const wasOldOption = optionStored === this.question.optionAswerId;
    if (IsNewOption && !wasOldOption) {
      this.addDegree();
    } else if (!IsNewOption && wasOldOption) {
      this.removeDegree();
    }
    this.SelectedID = optionValue;
    this.IsSelected = true;
    localStorage.setItem(questionKey, `${optionValue}`);
  }

  addDegree() {
    const num = this._shared.degree.getValue() + 1;
    if (num <= this.questions.length) {
      this._shared.degree.next(num);
      localStorage.setItem('degree', `${num}`);
    }
  }
  removeDegree() {
    const num = this._shared.degree.getValue() - 1;
    if (num >= 0) {
      this._shared.degree.next(num);
      localStorage.setItem('degree', `${num}`);
    }
  }
}
