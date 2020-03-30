import { GuideTypeModule } from './guidetype.module';

describe('GuideTypeModule', () => {
   let blackPageModule: GuideTypeModule;

   beforeEach(() => {
      blackPageModule = new GuideTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});