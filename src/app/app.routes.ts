import { Routes } from '@angular/router';
import { SubjectComponent } from './Features/Subject/Pages/subject/subject.component';

export const routes: Routes = [
  { path: '', component: SubjectComponent },
  {
    path: 'subject/:subjectId',
    loadComponent: () =>
      import('./Features/Exam/Pages/exam/exam.component').then(
        (C) => C.ExamComponent
      ),
  },
  {
    path: 'subject/:subjectId/exam/:examId/:questionId',
    loadComponent: () =>
      import('./Features/Question/Pages/question/question.component').then(
        (C) => C.QuestionComponent
      ),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./Features/Result/Pages/result/result.component').then(
        (C) => C.ResultComponent
      ),
  },
];
