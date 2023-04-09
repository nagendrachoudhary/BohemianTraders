import { GET_PRODUCTS_ERROR, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCCESS } from "./prodActionTypes"
import {productsUrl} from "../../Deployed-server-url/deployed-server-url"
import  axios  from 'axios';
export const getProductsLoading=()=>({
    type:GET_PRODUCTS_LOADING
})
export const getProductsSuccess=(data)=>({
    type:GET_PRODUCTS_SUCCCESS,
    payload:data
})
export const getProductsError=()=>({
    type:GET_PRODUCTS_ERROR
})

export const getUrl=(baseUrl,_sort,_order,price_gte,price_lte,priceLow,priceHigh)=>(dispatch)=>{
   return `${baseUrl}&sort=${_sort}&price_gte=${price_gte}&price_lte=${price_lte}&order=${_order}`
}


export const getProducts= (page=1,sort,_order,price_gte,price_lte)=>(dispatch)=>{
    let apiUrl= dispatch( getUrl(`${productsUrl}/?page=${page}`,sort,_order,price_gte,price_lte))
    dispatch(getProductsLoading())
    fetch(apiUrl) 
    .then((res)=>res.json())
    .then((res)=>{
        console.log("res after getProducts-->",res)
        dispatch(getProductsSuccess(res))})
    .catch(()=>dispatch(getProductsError()))
}
