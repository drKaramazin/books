import { ConfigService } from './services/config.service';
import { BackendService } from './services/backend.service';

export function booksInitializer(
  config: ConfigService,
  backend: BackendService,
): () => Promise<any> {

  return (): Promise<any> => new Promise((resolve, reject) => {
    config.load().then(() => {
      backend.init();
      resolve();
    }).catch(err => reject(err));
  });

}
