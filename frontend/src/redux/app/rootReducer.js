import { combineReducers } from "@reduxjs/toolkit";

import agendaReducer from "../features/agenda/agendaSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = combineReducers({
  agenda: agendaReducer,
  user: userReducer,
});

export default rootReducer;
