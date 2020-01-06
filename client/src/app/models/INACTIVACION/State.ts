import { InactivationRequest } from './InactivationRequest';

export class State {
   id: number;
   name: String;
   inactivation_requests_on_state: InactivationRequest[];
   constructor() {
      this.inactivation_requests_on_state = [];
   }
}