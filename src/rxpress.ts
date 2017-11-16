import { Server, IncomingMessage, ServerResponse } from 'http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

export default function Rxpress(server: Server): Object {
  const _paths: String[] = [];
  // const _subscribers = [];
  const _request$: Observable<{
    req: IncomingMessage;
    res: ServerResponse;
  }> = Observable.fromEvent(server, 'request', (req, res) => ({ req, res }));

  return {
    getRequest$(): Observable<{ req: IncomingMessage; res: ServerResponse }> {
      return _request$;
    },
    useExpressMiddleware(
      fn: (req: IncomingMessage, res: ServerResponse, next: Function) => void
    ): Subscription {
      return _request$.subscribe(({ req, res }) =>
        fn(req, res, err => {
          if (err) throw err;
        })
      );
    },
    get(
      path: String,
      fn: (req: IncomingMessage, res: ServerResponse) => void
    ): Subscription {
      _paths.push(path);

      return _request$
        .filter(({ req }) => req.url === path)
        .subscribe(({ req, res }) => fn(req, res));
    },
  };
}
