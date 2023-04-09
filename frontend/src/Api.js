import axios from "axios";
import { accountsUrl, cart, productsUrl, SingleproductUrl } from './Deployed-server-url/deployed-server-url';
let token=JSON.parse(localStorage.getItem("token"))
axios.defaults.headers.common['auth']=token
export  function LoginApi(email,password){
   return axios.post(`${accountsUrl}/login`,{
        email,password
    })
}
export  function getLoginuser(){
    return axios.post(`${accountsUrl}/auth`)
}
export function SingleproductApi(id){
    return axios.get(`${SingleproductUrl}/${id}`)
}
export function AddProductInCart(id,size){
    return axios.post(`${cart}/${id}/${size}`)
}
export function GetDataInCart(){
    return axios.get(`${cart}`)
}
export function PatchDataInCart(id,operation){
    return axios.patch(`${cart}/${id}/${operation}`)
}
export function GetAllOrder(){
    return axios.get(`${accountsUrl}/order`)
}
export function SendOrder(data){
    return axios.post(`${accountsUrl}/order`,{data})
}
export function AllProduct(){
    // return axios.get(`${accountsUrl}/${size}/${price}/${other}`)
}
export function cancelOrder(id){
    return axios.delete(`${accountsUrl}/order/${id}`)
}