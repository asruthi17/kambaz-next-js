"use client";
import { Provider } from "react-redux";
import store from "../store";
import HelloRedux from "./HelloRedux/page";
import CounterRedux from "./CounterRedux/page";
import AddRedux from "./AddRedux/page";
import TodoList from "./todos/TodoList";

function ReduxExamplesContent() {
  return (
    <div id="wd-redux-examples">
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <ReduxExamplesContent />
    </Provider>
  );
}