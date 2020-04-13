import { ClienteInternoCoordinadorModule } from './cliente-interno-coordinador.module';

describe('ClienteInternoCoordinadorModule', () => {
  let blackPageModule: ClienteInternoCoordinadorModule;

  beforeEach(() => {
    blackPageModule = new ClienteInternoCoordinadorModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
