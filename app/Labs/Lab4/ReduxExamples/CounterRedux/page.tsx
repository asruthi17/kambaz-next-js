"use client";
import { useSelector, useDispatch, Provider } from "react-redux";
import { increment, decrement } from "./counterReducer";
import store from "../../store";

function CounterReduxComponent() {
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button onClick={() => dispatch(increment())} className="btn btn-success me-2" id="wd-counter-redux-increment-click">
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} className="btn btn-danger" id="wd-counter-redux-decrement-click">
        Decrement
      </button>
      <hr />
    </div>
  );
}

export default function CounterRedux() {
  return (
    <Provider store={store}>
      <CounterReduxComponent />
    </Provider>
  );
}