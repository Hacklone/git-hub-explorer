import { GitHubExplorerPage } from './app.po';

describe('git-hub-explorer App', function() {
  let page: GitHubExplorerPage;

  beforeEach(() => {
    page = new GitHubExplorerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
