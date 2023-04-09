import { Box, useDisclosure,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter, Text, Image, Grid, GridItem, Button, color, Divider, Toast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { accountsUrl } from '../../Deployed-server-url/deployed-server-url';
import { GetAllOrder, cancelOrder } from '../../Api';
export default function Order() {
    const [Order, setOrder] = useState([])
    const [Id, setId] = useState(null)
    const [userid, setuserid] = useState(null)
    let { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    useEffect(() => {
       GetAllOrder().then((res)=>{
        console.log(res.data)
        setOrder(res.data)
       })
    }, [])
    if(Order.length==0){
        return <h2>order please</h2>
    }
    function Cancel(Id){
          onClose()
         cancelOrder(Id).then(()=>{
            GetAllOrder().then((res)=>{
                setOrder(res.data)
                
            })
         })
    }
    return (
        <div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Cancel Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red'  onClick={()=>{Cancel(Id)}}ml={3}>
                                Cancel Product
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {Order.length>0 ? <Box>
                {Order.map(function (el, i) {
                    return (
                        <GridItem alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'space-between'} ml={'50'} mr={'50'}>
                            <Image mt={'40px'} w={'100px'} src={el.img} />
                            <Box>
                                <Text>
                                    {el.brand}
                                </Text>
                                <Text>
                                    {el.name}
                                </Text>
                                <Text color={'red.400'}>
                                    {el.size}
                                </Text>
                            </Box>
                            <Text>US${el.price}</Text>
                            <Button colorScheme='red' onClick={()=>{onOpen();setId((Id)=>el._id)}}>Cancel</Button>
                        </GridItem>
                    )


                })}
            </Box> : 'NO data found</'}
        </div>
    )
}
