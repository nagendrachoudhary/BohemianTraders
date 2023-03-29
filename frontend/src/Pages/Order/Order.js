import { Box, useDisclosure,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter, Text, Image, Grid, GridItem, Button, color, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { accountsUrl } from '../../Deployed-server-url/deployed-server-url';
export default function Order() {
    const [Order, setOrder] = useState(null)
    const [Id, setId] = useState(null)
    const [userid, setuserid] = useState(null)
    let { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    useEffect(() => {
        fetch(`${accountsUrl}?login=true`).then((el) => {
            el.json().then((data) => {
                setOrder(data[0].orders)
                setuserid(data[0].id)
            });
        })
    }, [])
    function Cancel(Id){
          onClose()
        let data = Order.splice(Id, 1);
        let orders = Order
        fetch(`${accountsUrl}/${userid}`, {
            method: "PATCH",
            body: JSON.stringify({ orders }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        setOrder(orders)
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
            {Order ? <Box>
                {Order.map(function (el, i) {
                    return (
                        <GridItem alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'space-between'} ml={'50'} mr={'50'}>
                            <Image mt={'40px'} w={'100px'} src={el.img.item1} />
                            <Box>
                                <Text>
                                    {el.brand}
                                </Text>
                                <Text>
                                    {el.name.toUpperCase()}
                                </Text>
                                <Text color={'red.400'}>
                                    {el.sizes.toUpperCase()}
                                </Text>
                            </Box>
                            <Text>US${el.price}</Text>
                            <Button colorScheme='red' onClick={()=>{onOpen();setId(i)}}>Cancel</Button>
                        </GridItem>
                    )


                })}
            </Box> : 'NO data found</'}
        </div>
    )
}
