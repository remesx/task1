import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./actions";


const AutoCompleteInput = () =>{
    const dispatch = useDispatch()
    
    const users = useSelector(state => state.getUsernames);
    const error = useSelector(state => state.loadingError);
    
    const [inputValue, setInputValue] = useState('')
    const [suggest, setSuggest] = useState(false)
    const [active, setActive] = useState()
    const [suggestList, setSuggestList] = useState(users)

    useEffect( () =>{
        dispatch(fetchUsers())  
    }, [])
    
    
    
    useEffect( () =>{
        let newSuggestList = users.filter( element => element.toLowerCase().startsWith(inputValue.toLowerCase()))
        setSuggestList(newSuggestList)
        if(inputValue === ""){
            setActive(-1)
            setSuggest(false)
          }
    },[inputValue])

    const handleSuggestionOnClick = (item) =>{
        setInputValue(item)
        setActive(-1)
        setSuggest(false)
      }
    
      
    const handleInputChange = (e) =>{ 
        setInputValue(e.target.value)
        setSuggest(true)
      }

    const handleKeyDown = (e) =>{
        if (e.keyCode === 38){
          return active === 0 ? setActive(suggestList.length -1) : setActive(active - 1)
        }
        else if (e.keyCode === 40){
          return active !== suggestList.length - 1? setActive(active + 1) : setActive(0)
        }
        else if (e.keyCode === 13){
            setInputValue(suggestList[active])
            setActive(-1)
            setSuggest(false)
          }
    };

    return <div style={{ width: "200px", margin: "auto", top: "200px" }}>
        <input 
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{ width: "192px" }}
       />
       {suggest && !error && <ul style={{ listStyleType: "none", paddingLeft: "0px", marginTop: "1px",   }}>
                {suggestList.map( (item, index) => {
                    return index === active ? <li key={index} style={{backgroundColor: "lightgrey", paddingTop: "3px", border: "1px solid", borderTop: "none"}} onClick={ () => handleSuggestionOnClick(item)}>{item}</li> : <li key={index} style={{paddingTop: "3px", border: "1px solid", borderTop: "none"}} onClick={ () => handleSuggestionOnClick(item)}>{item}</li>
                })}
            </ul>
        }
        {error && <div>Failed to get data</div>}
    </div>
    
}



  export default AutoCompleteInput