import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _isLegalNoticeVisible = new BehaviorSubject(false);

  isLegalNoticeVisible$ = this._isLegalNoticeVisible.asObservable();

  showLegalNotice() {
    this._isLegalNoticeVisible.next(true);
  }

  hideLegalNotice() {
    this._isLegalNoticeVisible.next(false);
  }
}
