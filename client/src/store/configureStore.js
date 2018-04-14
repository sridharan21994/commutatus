import { createStore }  from "redux";
import rootReducer from "../reducers/rootReducer.js";

export default function configureStore(initialState){
return createStore(
    rootReducer,
    initialState
)
}