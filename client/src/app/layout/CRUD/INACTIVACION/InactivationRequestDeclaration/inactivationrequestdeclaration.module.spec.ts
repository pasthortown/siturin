import { InactivationRequestDeclarationModule } from './inactivationrequestdeclaration.module';

describe('InactivationRequestDeclarationModule', () => {
   let blackPageModule: InactivationRequestDeclarationModule;

   beforeEach(() => {
      blackPageModule = new InactivationRequestDeclarationModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});