import type { LoadingState } from './loading.slice';
import type { AuthorityState } from './authority.slice';
import type { AccessState } from './access.slice';

export { default as loadingReducer, loadingSaga } from './loading.slice';
export { default as authorityReducer, authoritySaga } from './authority.slice';
export { default as accessReducer, accessSaga } from './access.slice';

export interface State {
  loading: LoadingState;
  authority: AuthorityState;
  access: AccessState;
}
