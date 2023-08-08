import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


declare const gtag: Function; // <------------Important: the declartion for gtag is required!

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Beneficios CEE';
  loadingDataImg: boolean = false;



  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {

    router.events.subscribe(event => {
      this.navigationInterceptor(event);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
      })
    })

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join(' > ');
        titleService.setTitle(title);
      }
    });
  }



  ngOnInit(): void {
  }





  getTitle(state: any, parent:any): any {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }



  navigationInterceptor(event: any): void {

    //Triggered When the navigation starts
    if (event instanceof NavigationStart) {
      this.loadingDataImg = true;
    }
    //Triggered When the navigation ends
    if (event instanceof NavigationEnd) {
      this.loadingDataImg = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loadingDataImg = false;
    }
    //Triggered When the error occurrs while navigation
    if (event instanceof NavigationError) {
      this.loadingDataImg = false;
    }
  }




}
