import { ActivityTransportTypeModule } from './activitytransporttype.module';

describe('ActivityTransportTypeModule', () => {
   let blackPageModule: ActivityTransportTypeModule;

   beforeEach(() => {
      blackPageModule = new ActivityTransportTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});