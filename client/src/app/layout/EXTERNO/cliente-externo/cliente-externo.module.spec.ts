import { ClienteExternoModule } from './cliente-externo.module';

describe('ClienteExternoModule', () => {
  let blackPageModule: ClienteExternoModule;

  beforeEach(() => {
    blackPageModule = new ClienteExternoModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
