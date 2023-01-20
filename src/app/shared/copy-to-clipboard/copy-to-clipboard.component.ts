import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@app/core/common-service.service';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit {
  @Input() text = ''
  showCopyConfirmation: Boolean = false;
  timeoutTimer = null;
  constructor(private commonService: CommonService) { }
  ngOnInit() {
  }

  copy() {
    this.showCopyConfirmation = false;

    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
    }

    this.commonService.copyToClipBoard(this.text);
    this.showCopyConfirmation = true;

    this.timeoutTimer = setTimeout(() => {
      this.showCopyConfirmation = false;
    }, 2000)


  }

}
