import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ISubject } from '../../Models/isubject';
import { ExamAPIService } from '../../../Exam/Services/exam-api.service';
import { IExam } from '../../../Exam/Models/iexam';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.scss'
})
export class SubjectDetailsComponent {//implements OnInit{
  @Input({required:true}) subjects!:ISubject[];

}

