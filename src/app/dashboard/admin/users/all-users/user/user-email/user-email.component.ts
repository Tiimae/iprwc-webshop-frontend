import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss']
})
export class UserEmailComponent implements OnInit {

  @Input() email : string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
