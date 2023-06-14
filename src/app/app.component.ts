import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from './scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.scrollService.isLegalNoticeVisible$.subscribe(visible => {
        if (visible) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
