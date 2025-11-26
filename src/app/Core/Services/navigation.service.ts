import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnInit {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  private previousRouteParams: any = {};

  constructor(private router: Router) {}

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public getPreviousParams() {
    return this.previousRouteParams;
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;

        let route = events[0].state.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.previousRouteParams = route.params;

        console.log('Previous URL:', this.previousUrl);
        console.log('Previous Params:', this.previousRouteParams);
      });
  }
}
