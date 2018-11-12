import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { UrlSnapshot } from './reducer';

export class CustomRouterStateSerializer
  implements RouterStateSerializer<UrlSnapshot> {
  serialize(routerState: RouterStateSnapshot): UrlSnapshot {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, data, queryParams };
  }
}

export const provider = {
  provide: RouterStateSerializer,
  useClass: CustomRouterStateSerializer,
};
