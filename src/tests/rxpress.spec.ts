const HttpMock = require('node-mocks-http');
import { Observable, Subscription } from 'rxjs';
import { ServerResponse, IncomingMessage } from 'http';
import { EventEmitter } from 'events';

import Rxpress from '../rxpress.ts';

describe('rxpress', () => {
  it('should be a function with arity 1', () => {
    // Assert
    expect(Rxpress).toBeInstanceOf(Function);
    expect(Rxpress).toHaveLength(1);
  });

  it('should return an object of functions', () => {
    // Arrange
    const server = HttpMock.createMocks();

    // Act
    const app = Rxpress(server);

    // Assert
    expect(app).toBeInstanceOf(Object);
    expect(app).toHaveProperty('getRequest$');
    expect(app).toHaveProperty('useExpressMiddleware');
    expect(app).toHaveProperty('get');
  });

  describe('.getRequest$', () => {
    const app = Rxpress(HttpMock.createMocks());

    it('should be a function with arity 0', () => {
      // Assert
      expect(app.getRequest$).toBeInstanceOf(Function);
      expect(app.getRequest$).toHaveLength(0);
    });

    it('should return an Observable', () => {
      // Assert
      expect(app.getRequest$()).toBeInstanceOf(Observable);
    });
  });

  describe('.useExpressMiddleware', () => {
    const app = Rxpress(new EventEmitter());

    it('should be a function with arity 1', () => {
      // Assert
      expect(app.useExpressMiddleware).toBeInstanceOf(Function);
      expect(app.useExpressMiddleware).toHaveLength(1);
    });

    it('should return a Subscription', () => {
      // Assert
      expect(app.useExpressMiddleware(() => null)).toBeInstanceOf(Subscription);
    });
  });

  describe('.get', () => {
    const app = Rxpress(new EventEmitter());

    it('should be a function with arity 2', () => {
      // Assert
      expect(app.get).toBeInstanceOf(Function);
      expect(app.get).toHaveLength(2);
    });

    it('should return a subscription', () => {
      // Assert
      expect(app.get('/', () => null)).toBeInstanceOf(Subscription);
    });
  });
});
