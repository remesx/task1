import { combineReducers } from 'redux'

const loadingError = (state = false, action) => {
    switch(action.type) {
        case "LOADING_ERROR":
            return action.hasErrored;
        default:
            return state;
    }
  }


const getUsernames = (state = [], action) =>{
    switch(action.type){
        case "FETCH_USERNAMES":
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    loadingError,
    getUsernames,
    
})