import { NormativaModule } from './normativa.module';

describe('NormativaModule', () => {
  let blackPageModule: NormativaModule;

  beforeEach(() => {
    blackPageModule = new NormativaModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
