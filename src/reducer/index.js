import ModeReducer from './modeReducer'
import LogReducer from './LogReducer'

import { combineReducers } from 'redux'

const AllReducer = combineReducers({
    Mode : ModeReducer,
    Log : LogReducer,
})

export default AllReducer