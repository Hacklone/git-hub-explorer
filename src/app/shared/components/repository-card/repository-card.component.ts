import { Component, OnInit, Input } from '@angular/core';
import { RepositoryMetadata } from '../../services/github/repository-metadata.model';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public repository: RepositoryMetadata;
}
