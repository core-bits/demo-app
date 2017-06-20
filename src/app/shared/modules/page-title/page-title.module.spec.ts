import { PageTitleModule } from './page-title.module';

describe('PageTitleModule', () => {
  let pageTitleModule: PageTitleModule;

  beforeEach(() => {
    pageTitleModule = new PageTitleModule();
  });

  it('should create an instance', () => {
    expect(pageTitleModule).toBeTruthy();
  });
});
