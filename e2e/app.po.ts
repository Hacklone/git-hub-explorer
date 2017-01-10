import { browser, element, by } from 'protractor';

export class GitHubExplorerPage {
  navigateToAsync() {
    return browser.get('/');
  }

  async searchForRepositoryAsync(repositoryName: string) {
    const input = element(by.css('app-search-box input'));

    await input.sendKeys(repositoryName);

    const repositories = element(by.css('app-repository-card'));

    await browser.wait(() => repositories.isPresent());
  }

  getRepositoriesNameAsync() {
    return element(by.css('app-repository-card h6')).getText();
  }
}
