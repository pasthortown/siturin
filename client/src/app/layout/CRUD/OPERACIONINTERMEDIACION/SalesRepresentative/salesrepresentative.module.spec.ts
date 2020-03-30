import { SalesRepresentativeModule } from './salesrepresentative.module';

describe('SalesRepresentativeModule', () => {
   let blackPageModule: SalesRepresentativeModule;

   beforeEach(() => {
      blackPageModule = new SalesRepresentativeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});