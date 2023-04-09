import { Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import styles from "../../Pages/Products/styles.module.css"
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import filterContext from '../../Context/Contextfilter'

const orderTypes=["FEATURED ITEMS","NEWEST ITEMS","BEST SELLING","PRICE: ASCENDING","PRICE: DESCENDING"]


const SortBox = () => {
  const [searchParams,setSearchParams]=useState()
  const dispatch=useDispatch()
  const{State,setState,AddFilters}=useContext(filterContext)

  const handleSortChange=(e)=>{
     const {name,value}=e.target
     AddFilters({...State,_order:e.target.value})
     setSearchParams(e.target.value)
  }

  return (
    <Box p={'10px'} >
    <Box className={styles.filterHeadStyle} m={'10px'}>SORT BY</Box>
     <Box  >
      <select onChange={(e)=>{handleSortChange(e)}} >
      <option value={"All"}>All</option>
     {
       
       orderTypes.map((ele)=>{
         return(
          <option  value={ele.replace(" ",'')}>
           <Box m={'10px'}alignText={'left'} >
          <input type="checkbox" id="otherChoice1" name={ele}  style={{marginRight:"5px"}} />
          <label for="otherChoice1">{ele}</label>
          </Box>
          </option>
        )
      })
    }
       </select>
     </Box>
 </Box>

  )
}

export default SortBox