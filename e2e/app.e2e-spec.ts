import { GitHubExplorerPage } from './app.po';

describe('git-hub-explorer App', function() {
  let page: GitHubExplorerPage;

  beforeEach(() => {
    page = new GitHubExplorerPage();
  });

  it('should search for repositories', async () => {
    await page.navigateToAsync();

    await page.searchForRepositoryAsync('bootstrap');

    const loadedRepositories = await page.getRepositoriesNameAsync();

    expect(loadedRepositories).toBeTruthy();

    expect(loadedRepositories.indexOf('bootstrap')).not.toEqual(-1);
  });

  // TODO: Write more tests
});
