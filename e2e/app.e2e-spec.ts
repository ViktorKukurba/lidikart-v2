import { LidikArtV2Page } from './app.po';

describe('lidik-art-v2 App', () => {
  let page: LidikArtV2Page;

  beforeEach(() => {
    page = new LidikArtV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
