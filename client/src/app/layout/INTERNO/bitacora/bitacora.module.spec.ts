import { BitacoraPageModule } from './bitacora.module';

describe('BitacoraPageModule', () => {
  let blackPageModule: BitacoraPageModule;

  beforeEach(() => {
    blackPageModule = new BitacoraPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
