import { TransportTypeModule } from './transporttype.module';

describe('TransportTypeModule', () => {
   let blackPageModule: TransportTypeModule;

   beforeEach(() => {
      blackPageModule = new TransportTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});