import { InactivationRequestAttachmentModule } from './inactivationrequestattachment.module';

describe('InactivationRequestAttachmentModule', () => {
   let blackPageModule: InactivationRequestAttachmentModule;

   beforeEach(() => {
      blackPageModule = new InactivationRequestAttachmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});