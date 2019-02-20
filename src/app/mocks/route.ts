import { Subject } from 'rxjs';

declare const jasmine: any;

const url = new Subject();

export class MockRoute {
  snapshot = jasmine.createSpyObj('snapshot', ['firstChild']);
  url = url;
  constructor() {
    this.snapshot.firstChild.data = new Subject();
  }
}
