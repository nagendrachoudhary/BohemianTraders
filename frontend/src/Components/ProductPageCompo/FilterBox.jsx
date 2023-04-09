import { background,Text, Box, Button, Grid,HStack,Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import {Accordion,AccordionItem,AccordionButton,AccordionPanel } from '@chakra-ui/react'
import {MinusIcon,AddIcon} from "@chakra-ui/icons"
import styles from "../../Pages/Products/styles.module.css"
import { getProducts } from '../../Redux/ProductPageRedux/prodActions'
import { useDispatch } from 'react-redux'
import filterContext from '../../Context/Contextfilter'

const sizes= ["2XS","XS","S","M","L","XL","2XL"]
const FilterBox = () => {
 const {State,setState,AddFilters}= useContext(filterContext)
  const [Size,setSize]= useState([]);
  const [Price, setPrice]=useState({
    Min:0,
    Max:Number.MAX_SAFE_INTEGER
  });
  const dispatch=useDispatch();
  useEffect(() => {
    let id=setTimeout(() => {
      dispatch(getProducts(State.page,Size,State._order,Price.Min,Price.Max,null,null,null,null))
    },1000);
    return ()=>{clearTimeout(id)}
    },[Size,Price,State])

function priceChange(e){
  let id=setTimeout(() => {
     setPrice({...Price,[e.target.name]:e.target.value})
   }, 1000);
}
  return (
    <Box  >
    <Accordion allowMultiple >
    <AccordionItem w={{basic:'45vw',md:'260px'}}   >
    {({ isExpanded }) => (
      <Box>
        <h2>
          <AccordionButton  >
            <Box flex='1' textAlign='left' className={styles.filterHeadStyle}>
              SIZE
            </Box>
            {isExpanded ? (
              <MinusIcon fontSize='12px' color={'#4d4d4d'} />
            ) : (
              <AddIcon fontSize='12px' color={'#4d4d4d'} />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Grid templateColumns={'repeat(2,1fr)'} gap={{basic:"3px",md:'6px'}} flexWrap={'wrap'} >
             {
              sizes.map((ele)=>{
                return (
                  <Box>
                   <input type="checkbox" id="sizeChoice" name="size" onChange={(event)=>{
                    if(event.target.checked){
                      setSize([...Size,event.target.value])
                    }
                    else{
                      let arr=[...Size]
                      let data=arr.filter((el,i)=>{
                        if(el!=event.target.value){
                          return el
                        }
                      })
                      setSize((size)=>[...data])
                    }
                   
                   }} value={ele} style={{marginRight:"5px"}} />
                   <label for="sizeChoice">{ele}</label>
                  </Box>
                )
              })
             }
          </Grid>
        </AccordionPanel>
      </Box>
    )}
  </AccordionItem>

  
     
    <AccordionItem w={{base:'45vw',md:'260px'}} >
      {({ isExpanded }) => (
        <Box>
          <h2>
            <AccordionButton w={{base:'38vw',md:'260px'}} >
              <Box flex='1' textAlign='left' className={styles.filterHeadStyle}  >
               PRICE
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='12px' color={'#4d4d4d'} />
              ) : (
                <AddIcon fontSize='12px' color={'#4d4d4d'} />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className={styles.filterBodyStyle} >

            <HStack flexDirection={{base:'column',md:'row'}} >
              <NumberInput size={{base:'sm',md:'md'}}  defaultValue={'Min'} min={0} variant='ghost' >
                <NumberInputField placeholder='Min.' Name="Min" onChange={priceChange} fontSize={'14px'} />
                <NumberInputStepper>
                  <NumberIncrementStepper color={'gray'} border='none' fontSize='.8em' />
                  <NumberDecrementStepper color={'gray'} border='none' fontSize='.8em' />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput size={{base:'sm',md:'md'}}  defaultValue={'nothing'} min={0} variant='ghost' >
                <NumberInputField placeholder='Max.' Name="Max" onChange={priceChange} fontSize={'14px'} />
                <NumberInputStepper>
                  <NumberIncrementStepper color={'gray'} border='none' fontSize='.8em'/>
                  <NumberDecrementStepper color={'gray'} border='none' fontSize='.8em'/>
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Box cursor={'pointer'} m={'5px'} onClick={()=>{
              
            }}>UPDATE</Box>
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  
    <AccordionItem w={{basic:'45vw',md:'265px'}}>
    {({ isExpanded }) => (
      <Box>
        <h2>
          <AccordionButton  >
            <Box flex='1' textAlign='left' className={styles.filterHeadStyle}>
             OTHER
            </Box>
            {isExpanded ? (
              <MinusIcon fontSize='12px' color={'#4d4d4d'} />
            ) : (
              <AddIcon fontSize='12px' color={'#4d4d4d'} />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} className={styles.filterBodyStyle} >
          <Box m={'5px'} >
          <input type="checkbox" id="otherChoice1" name="size" value={true} style={{marginRight:"5px"}} />
          <label for="otherChoice1">{'IS FEATURED'}</label>
         </Box>
          <Box m={'5px'}>
          <input type="checkbox" id="otherChoice2" name="size" value={true} style={{marginRight:"5px"}} />
          <label for="otherChoice2">{'IN STOCK'}</label>
         </Box>

        </AccordionPanel>
      </Box>
    )}
  </AccordionItem>
        
</Accordion>

</Box>
  )
}

export default FilterBox