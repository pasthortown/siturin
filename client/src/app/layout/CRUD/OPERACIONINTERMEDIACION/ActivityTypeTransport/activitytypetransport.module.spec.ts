import { ActivityTypeTransportModule } from './activitytypetransport.module';

describe('ActivityTypeTransportModule', () => {
   let blackPageModule: ActivityTypeTransportModule;

   beforeEach(() => {
      blackPageModule = new ActivityTypeTransportModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});