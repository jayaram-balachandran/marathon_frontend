import { Component, OnInit } from '@angular/core';
import { Participant } from '../participant';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Organizer } from '../organizer';
import { OrganizerService } from '../organizer.service';
import { Control } from '../control';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  participantModel = new Participant();
  // organizerModel = new Organizer();
  public participant: Participant;
  showSuccess: boolean;
  public organizer: Organizer[];
  // controlModel = new Control();
  public control: Control[];

  constructor(
    private _router: Router,
    private _registrationService: RegistrationService,
    private _organizerService: OrganizerService
  ) {}

  ngOnInit(): void {
    this.showSuccess = false;
    this.getOrgData();
    this.getDisData();
  }

  getOrgData() {
    this._organizerService.getMarathonData().subscribe(
      (data: Organizer[]) => {
        console.log('Organizer', data);
        this.organizer = data;
      },
      (error) => console.log(error)
    );
  }

  getDisData() {
    this._organizerService.getDisplayData().subscribe(
      (data: Control[]) => {
        console.log('Control', data);
        this.control = data;
      },
      (error) => console.log(error)
    );
  }

  saveParticipant() {
    this._registrationService
      .registerParticipant(JSON.stringify(this.participantModel))
      .subscribe(
        (data) => {
          console.log('Update data', data);
          this.showSuccess = true;
          // this._router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
