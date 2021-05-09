import { Component, OnInit } from '@angular/core';
import { Participant } from '../participant';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Organizer } from '../organizer';
import { OrganizerService } from '../organizer.service';
import { Control } from '../control';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
})
export class OrganizerComponent implements OnInit {
  participantModel = new Participant();
  organizerModel = new Organizer();
  public participants: Participant[];
  public organizer: Organizer[];
  controlModel = new Control();
  public control: Control;
  constructor(
    private _router: Router,
    private _registrationService: RegistrationService,
    private _organizerService: OrganizerService
  ) {}

  ngOnInit(): void {
    this.getParData();
  }

  getParData() {
    this._registrationService.getParData().subscribe(
      (data: Participant[]) => {
        console.log('Participant', data);
        this.participants = data;
      },
      (error) => console.log(error)
    );
  }

  saveEvent() {
    this._organizerService
      .saveEvent(JSON.stringify(this.controlModel))
      .subscribe(
        (data) => {
          console.log('Update data', data);
          // this._router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
