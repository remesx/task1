import Axios from "axios"


export const fetchUsers = () =>{
    return async (dispatch, getState) =>{
        try {
        const response = await Axios.get('https://jsonplaceholder.typicode.com/users')
        
        const usernames = response.data.map( item=>{
          return item.username
        })
        
        dispatch({
            type: "FETCH_USERNAMES",
            payload: usernames
        })
        } catch (error) {
        
        return dispatch({
            type: "LOADING_ERROR",
            hasErrored: true
        }) 
    
        
      }
    }
}
