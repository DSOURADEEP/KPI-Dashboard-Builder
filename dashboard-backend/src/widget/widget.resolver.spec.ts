import { Test, TestingModule } from '@nestjs/testing';
import { WidgetResolver } from './widget.resolver';

describe('WidgetResolver', () => {
  let resolver: WidgetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WidgetResolver],
    }).compile();

    resolver = module.get<WidgetResolver>(WidgetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
