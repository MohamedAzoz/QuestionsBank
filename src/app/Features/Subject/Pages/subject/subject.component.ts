import { Component, OnInit } from '@angular/core';
import { ISubject } from '../../Models/isubject';
import { SubjectAPIService } from '../../Services/subject-api.service';
import { SubjectDetailsComponent } from "../../Components/subject-details/subject-details.component";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [SubjectDetailsComponent, NgIf],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit {
  subjects!: ISubject[];
  constructor(private _api: SubjectAPIService) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._api.getAll().subscribe((data) => {
      this.subjects = data.data;
    });
  }
}
