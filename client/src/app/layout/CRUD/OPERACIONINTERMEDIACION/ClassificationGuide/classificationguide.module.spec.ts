import { ClassificationGuideModule } from './classificationguide.module';

describe('ClassificationGuideModule', () => {
   let blackPageModule: ClassificationGuideModule;

   beforeEach(() => {
      blackPageModule = new ClassificationGuideModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});