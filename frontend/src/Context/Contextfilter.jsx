const { createContext, useState, useEffect } = require("react");
const filterContext=createContext({State:{
    page:1,_sort:null,_order:"ALL",price_gte:null,price_lte:null,priceLow:null,priceHigh:null
},setState:()=>{}})
export function FilterContextProvider({children}){
    const [State,setState]=useState({page:1,_sort:null,_order:"All",price_gte:null,price_lte:null,priceLow:null,priceHigh:null})
    function AddFilters(data){
        console.log(State,"data in context api")
        return setState({...data})
    }
    useEffect(() => {
      
    }, [])
    
    return <filterContext.Provider value={{
        State,setState,AddFilters
    }}>
            {children}
    </filterContext.Provider>
}
export default filterContext;