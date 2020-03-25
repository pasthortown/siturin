import { TourGuideModule } from './tourguide.module';

describe('TourGuideModule', () => {
   let blackPageModule: TourGuideModule;

   beforeEach(() => {
      blackPageModule = new TourGuideModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});