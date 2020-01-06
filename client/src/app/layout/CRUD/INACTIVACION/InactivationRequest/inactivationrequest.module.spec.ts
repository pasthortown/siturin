import { InactivationRequestModule } from './inactivationrequest.module';

describe('InactivationRequestModule', () => {
   let blackPageModule: InactivationRequestModule;

   beforeEach(() => {
      blackPageModule = new InactivationRequestModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});