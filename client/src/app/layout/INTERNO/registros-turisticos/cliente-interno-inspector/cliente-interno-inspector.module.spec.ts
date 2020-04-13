import { ClienteInternoInspectorModule } from './cliente-interno-inspector.module';

describe('ClienteInternoInspectorModule', () => {
  let blackPageModule: ClienteInternoInspectorModule;

  beforeEach(() => {
    blackPageModule = new ClienteInternoInspectorModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
