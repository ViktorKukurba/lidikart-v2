import { Subject } from 'rxjs';

declare const jasmine: any;

export class MockRouter {
  private subject = new Subject();
  public events = this.subject.asObservable();
  //noinspection TypeScriptUnresolvedFunction
  navigate = jasmine.createSpy('navigate');
}
