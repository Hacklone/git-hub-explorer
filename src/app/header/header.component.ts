import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _routerEventsSubscription: Subscription;

  constructor(private _router: Router) { }

  public isCollapsedMode: boolean = false;

  ngOnInit() {
    this._routerEventsSubscription = this._router.events.subscribe(event => {
      this.isCollapsedMode = event.url !== '/';
    });
  }

  ngOnDestroy() {
    this._routerEventsSubscription.unsubscribe();
  }
}
