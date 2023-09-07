import { createStore, combineReducers } from "redux";


const allReducers = combineReducers({});
const store = createStore(allReducers);
function abc(state = "abc", action) {
  switch (action.type) {
  }
}

/// Actions
function action() {
  type: "AADD";
}
export default store;
