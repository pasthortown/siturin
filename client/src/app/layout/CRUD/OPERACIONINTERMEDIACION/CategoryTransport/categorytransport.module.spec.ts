import { CategoryTransportModule } from './categorytransport.module';

describe('CategoryTransportModule', () => {
   let blackPageModule: CategoryTransportModule;

   beforeEach(() => {
      blackPageModule = new CategoryTransportModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});