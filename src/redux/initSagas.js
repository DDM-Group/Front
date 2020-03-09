import * as sagas from "./sagas";

export const initSagas = sagaMiddleware => {
  return Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};