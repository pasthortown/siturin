import { ClienteInternoTecnicoFinancieroModule } from './cliente-interno-tecnico-financiero.module';

describe('ClienteInternoTecnicoFinancieroModule', () => {
  let blackPageModule: ClienteInternoTecnicoFinancieroModule;

  beforeEach(() => {
    blackPageModule = new ClienteInternoTecnicoFinancieroModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
