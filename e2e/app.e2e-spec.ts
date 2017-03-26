import { StoreappPage } from './app.po';

describe('storeapp App', () => {
  let page: StoreappPage;

  beforeEach(() => {
    page = new StoreappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
