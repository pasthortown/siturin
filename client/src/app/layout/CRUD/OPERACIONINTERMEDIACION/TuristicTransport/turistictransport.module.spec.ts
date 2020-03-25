import { TuristicTransportModule } from './turistictransport.module';

describe('TuristicTransportModule', () => {
   let blackPageModule: TuristicTransportModule;

   beforeEach(() => {
      blackPageModule = new TuristicTransportModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});