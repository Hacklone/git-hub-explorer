/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GithubService } from './github.service';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { RepositoryMetadata } from './repository-metadata.model';

describe('GithubService', () => {
  let httpMock: Http;
  let service: GithubService;
  let getRepositoryMetadataObservable: Subject<any>;

  beforeEach(() => {
    getRepositoryMetadataObservable = new Subject<any>();

    TestBed.configureTestingModule({
      providers: [
        GithubService,
        {
          provide: Http,
          useValue: {
            get: jasmine.createSpy('Http.get()').and.returnValue(getRepositoryMetadataObservable)
          }
        }
      ]
    });

    httpMock = TestBed.get(Http);
    service = TestBed.get(GithubService);
  });

  describe('searchRepositoryMetadataAsync(repositorySearch)', () => {
    it('should call the correct url', async () => {
      const repoName = 'some Repo';
      const urlEncodedRepoName = encodeURIComponent(repoName);

      await service.searchRepositoriesMetadataAsync(repoName);

      expect(httpMock.get).toHaveBeenCalledWith(`https://api.github.com/search/repositories?q=${urlEncodedRepoName}`);
    });

    it('should return the parsed result on success', async () => {
      const expectedResult: RepositoryMetadata = {
        id: 2126244,
        name: 'twbs/bootstrap',
        url: 'https://api.github.com/repos/twbs/bootstrap',
        description: 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
        forksCount: 47907,
        stargazersCount: 105516,
        openIssuesCount: 241
      };

      const result = await service.searchRepositoriesMetadataAsync('some repo');

      /* tslint:disable */
      getRepositoryMetadataObservable.next(JSON.stringify({
        'total_count': 78677,
        'incomplete_results': false,
        'items': [
          {
            'id': 2126244,
            'name': 'bootstrap',
            'full_name': 'twbs/bootstrap',
            'owner': {
              'login': 'twbs',
              'id': 2918581,
              'avatar_url': 'https://avatars.githubusercontent.com/u/2918581?v=3',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/twbs',
              'html_url': 'https://github.com/twbs',
              'followers_url': 'https://api.github.com/users/twbs/followers',
              'following_url': 'https://api.github.com/users/twbs/following{/other_user}',
              'gists_url': 'https://api.github.com/users/twbs/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/twbs/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/twbs/subscriptions',
              'organizations_url': 'https://api.github.com/users/twbs/orgs',
              'repos_url': 'https://api.github.com/users/twbs/repos',
              'events_url': 'https://api.github.com/users/twbs/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/twbs/received_events',
              'type': 'Organization',
              'site_admin': false
            },
            'private': false,
            'html_url': 'https://github.com/twbs/bootstrap',
            'description': 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
            'fork': false,
            'url': 'https://api.github.com/repos/twbs/bootstrap',
            'forks_url': 'https://api.github.com/repos/twbs/bootstrap/forks',
            'keys_url': 'https://api.github.com/repos/twbs/bootstrap/keys{/key_id}',
            'collaborators_url': 'https://api.github.com/repos/twbs/bootstrap/collaborators{/collaborator}',
            'teams_url': 'https://api.github.com/repos/twbs/bootstrap/teams',
            'hooks_url': 'https://api.github.com/repos/twbs/bootstrap/hooks',
            'issue_events_url': 'https://api.github.com/repos/twbs/bootstrap/issues/events{/number}',
            'events_url': 'https://api.github.com/repos/twbs/bootstrap/events',
            'assignees_url': 'https://api.github.com/repos/twbs/bootstrap/assignees{/user}',
            'branches_url': 'https://api.github.com/repos/twbs/bootstrap/branches{/branch}',
            'tags_url': 'https://api.github.com/repos/twbs/bootstrap/tags',
            'blobs_url': 'https://api.github.com/repos/twbs/bootstrap/git/blobs{/sha}',
            'git_tags_url': 'https://api.github.com/repos/twbs/bootstrap/git/tags{/sha}',
            'git_refs_url': 'https://api.github.com/repos/twbs/bootstrap/git/refs{/sha}',
            'trees_url': 'https://api.github.com/repos/twbs/bootstrap/git/trees{/sha}',
            'statuses_url': 'https://api.github.com/repos/twbs/bootstrap/statuses/{sha}',
            'languages_url': 'https://api.github.com/repos/twbs/bootstrap/languages',
            'stargazers_url': 'https://api.github.com/repos/twbs/bootstrap/stargazers',
            'contributors_url': 'https://api.github.com/repos/twbs/bootstrap/contributors',
            'subscribers_url': 'https://api.github.com/repos/twbs/bootstrap/subscribers',
            'subscription_url': 'https://api.github.com/repos/twbs/bootstrap/subscription',
            'commits_url': 'https://api.github.com/repos/twbs/bootstrap/commits{/sha}',
            'git_commits_url': 'https://api.github.com/repos/twbs/bootstrap/git/commits{/sha}',
            'comments_url': 'https://api.github.com/repos/twbs/bootstrap/comments{/number}',
            'issue_comment_url': 'https://api.github.com/repos/twbs/bootstrap/issues/comments{/number}',
            'contents_url': 'https://api.github.com/repos/twbs/bootstrap/contents/{+path}',
            'compare_url': 'https://api.github.com/repos/twbs/bootstrap/compare/{base}...{head}',
            'merges_url': 'https://api.github.com/repos/twbs/bootstrap/merges',
            'archive_url': 'https://api.github.com/repos/twbs/bootstrap/{archive_format}{/ref}',
            'downloads_url': 'https://api.github.com/repos/twbs/bootstrap/downloads',
            'issues_url': 'https://api.github.com/repos/twbs/bootstrap/issues{/number}',
            'pulls_url': 'https://api.github.com/repos/twbs/bootstrap/pulls{/number}',
            'milestones_url': 'https://api.github.com/repos/twbs/bootstrap/milestones{/number}',
            'notifications_url': 'https://api.github.com/repos/twbs/bootstrap/notifications{?since,all,participating}',
            'labels_url': 'https://api.github.com/repos/twbs/bootstrap/labels{/name}',
            'releases_url': 'https://api.github.com/repos/twbs/bootstrap/releases{/id}',
            'deployments_url': 'https://api.github.com/repos/twbs/bootstrap/deployments',
            'created_at': '2011-07-29T21:19:00Z',
            'updated_at': '2017-01-08T21:06:16Z',
            'pushed_at': '2017-01-08T19:50:33Z',
            'git_url': 'git://github.com/twbs/bootstrap.git',
            'ssh_url': 'git@github.com:twbs/bootstrap.git',
            'clone_url': 'https://github.com/twbs/bootstrap.git',
            'svn_url': 'https://github.com/twbs/bootstrap',
            'homepage': 'http://getbootstrap.com',
            'size': 95389,
            'stargazers_count': 105516,
            'watchers_count': 105516,
            'language': 'JavaScript',
            'has_issues': true,
            'has_downloads': true,
            'has_wiki': false,
            'has_pages': true,
            'forks_count': 47907,
            'mirror_url': null,
            'open_issues_count': 241,
            'forks': 47907,
            'open_issues': 241,
            'watchers': 105516,
            'default_branch': 'v4-dev',
            'score': 136.79369
          }
        ]
      }));
      /* tslint:enable */

      expect(result).toEqual(expectedResult);
    });

    it('should throw if call fails', async () => {
      const expectedError = new Error('some error');
      let thrownError = null;

      try {
        await service.searchRepositoriesMetadataAsync('some repo');

        getRepositoryMetadataObservable.thrownError(expectedError);
      } catch (e) {
        thrownError = e;
      }

      expect(thrownError).toEqual(expectedError);
    });
  });

  // TODO: Write tests for getRepositoryMetadataByFullNameAsync() and getRepositoryIssuesByFullNameAsync()
});
