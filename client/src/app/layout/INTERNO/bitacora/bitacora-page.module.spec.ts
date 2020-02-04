import { BitacoraPageModule } from './bitacora-page.module';

describe('BitacoraPageModule', () => {
  let blackPageModule: BitacoraPageModule;

  beforeEach(() => {
    blackPageModule = new BitacoraPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
