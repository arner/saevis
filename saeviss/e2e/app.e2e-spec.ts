import { SaevisPage } from './app.po';

describe('saevis App', () => {
  let page: SaevisPage;

  beforeEach(() => {
    page = new SaevisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
