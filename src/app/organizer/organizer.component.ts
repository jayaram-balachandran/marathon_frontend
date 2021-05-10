import { Component, OnInit, DoCheck } from '@angular/core';
import { Participant } from '../participant';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { Organizer } from '../organizer';
import { OrganizerService } from '../organizer.service';
import { Control } from '../control';
import { ThrowStmt } from '@angular/compiler';

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
  filterDate = '';
  public filterParticipants: Participant[];
  public initialParticipants: Participant[];

  constructor(
    private _router: Router,
    private _registrationService: RegistrationService,
    private _organizerService: OrganizerService
  ) {}

  ngOnInit(): void {
    this.getParData();
  }

  ngDoCheck(): void {
    this.participants = this.initialParticipants;
    console.log('selected date', this.filterDate, this.participants);
    this.filterParticipants = this.participants?.filter((part) => {
      return part.creation_dt.includes(this.filterDate);
    });
    console.log('filter', this.filterParticipants);
    this.participants = this.filterParticipants;
  }

  getParData() {
    this._registrationService.getParData().subscribe(
      (data: Participant[]) => {
        console.log('Participant', data);
        this.initialParticipants = data;
        this.participants = this.initialParticipants;
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
