import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { put, takeEvery } from "redux-saga/effects";

import { IDataComplete, IData, IGridParent } from "../types";
import { getData } from "./api";

function* getAction() {
  const data: IDataComplete = yield getData();
  yield put({ type: "FETCH_SUCCEEDED", payload: data });
}

function* rootSaga() {
  yield takeEvery("FETCH_REQUESTED", getAction);
}

const reducer = (
  state = {} as IDataComplete,
  action: { type: "FETCH_SUCCEEDED"; payload: IDataComplete }
) => {
  switch (action.type) {
    case "FETCH_SUCCEEDED":
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectData = (state: IDataComplete): IGridParent[] => {
  return state?.value?.map((o: IData, index: number) => {
    return {
      ID: index,
      FirstName: o.FirstName,
      LastName: o.LastName,
      Gender: o.Gender,
      Age: o.Age || "--",
      Emails: o.Emails
    };
  });
};

export const fetchData = () => ({ type: "FETCH_REQUESTED" });
