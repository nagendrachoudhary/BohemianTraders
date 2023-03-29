import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, Image, Grid, GridItem, Button, color } from '@chakra-ui/react'
import { accountsUrl } from '../../Deployed-server-url/deployed-server-url';
import { CloseIcon } from '@chakra-ui/icons';
function WishList(props) {
    const [User, setUser] = useState([])
    const [userid, setuserid] = useState()
    const [CART, setCART] = useState()
    let subtotal = 0;
    const [winWidth, setWinWidth] = useState(window.innerWidth)

    const detectSize = () => { setWinWidth(window.innerWidth) }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return (() => {
            window.removeEventListener('resize', detectSize)
        })
    }, [winWidth])
    useEffect(() => {
        fetch(`${accountsUrl}?login=true`).then((el) => {
            el.json().then((data) => {
                setUser(data[0].wishlist)
                setuserid(data[0].id)
                setCART(data[0].cart)
            });
        })
    }, [])
    function AddDataOnCart(elm, i) {
        let data = User.splice(i, 1);
        let wishlist = [...User]
        console.log(wishlist)
        setTimeout(() => {
            fetch(`${accountsUrl}/${userid}`, {
            method: "PATCH",
            body: JSON.stringify({ wishlist }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        }, 2000);
        
        let product1 = false;
        let cart = CART
        cart.map((el) => {
            if (el.id == elm.id && el.sizes == elm.sizes) {
                product1 = true
                let quantity = el.quantity
                el.quantity = quantity + 1;
                fetch(`${accountsUrl}/${userid}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PATCH",
                    body: JSON.stringify({ cart })
                })
            }
        })

        if (product1 == false) {
            const newobj = { ...elm }
            let cart = CART
            cart.push(newobj)
            fetch(`${accountsUrl}/${userid}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({ cart })
            })
        }
        setUser(wishlist)
    }
    function DeleteInWishlist(elm, i) {
        let data = User.splice(i, 1);
        let wishlist = [...User]
        console.log(wishlist)
        fetch(`${accountsUrl}/${userid}`, {
            method: "PATCH",
            body: JSON.stringify({ wishlist }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        setUser(wishlist)
    }
    return (
        <Box>

            {User.length > 0 ? <Box>
                <Grid >
                    <GridItem >
                        <Grid alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'space-between'} ml={'50'} mr={'50'}>
                            <GridItem>

                            </GridItem>
                            <GridItem ml={'60px'}>
                                Item
                            </GridItem>
                            <GridItem>
                                Price
                            </GridItem>
                            <GridItem>

                            </GridItem>
                            <GridItem>

                            </GridItem>
                        </Grid>
                    </GridItem>
                    <hr style={{ 'border': '2px solid black' }}></hr>
                    {User.map(function (el, i) {
                        subtotal = subtotal + el.price
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
                                <Button bg={'black'} color={'white'} _hover={{ bg: "white", color: "black", border: '1px solid black' }} onClick={() => { AddDataOnCart(el, i) }}>Add TO CART</Button>
                                <CloseIcon onClick={(el) => { DeleteInWishlist(el, i) }}></CloseIcon>
                            </GridItem>
                        )


                    })}
                    <hr style={{ 'border': '2px solid black' }}></hr>
                    <Grid alignItems={'center'} ml={'50px'} mr={'50px'} display={'flex'} textAlign={'center'} justifyContent={'space-between'}>


                        <Text>
                            SUBTOTAL
                        </Text>
                        <Text>
                            US$ {subtotal}
                        </Text>



                    </Grid>
                </Grid>
            </Box> : <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />}

        </Box>
    );
}

export default WishList;