import React, { useState, useEffect, useContext } from 'react';
import { Box, Menu, IconButton, MenuButton, MenuList, Grid, Text, Tabs, Image, Tab, TabList, TabPanel, TabPanels, GridItem, MenuItem } from '@chakra-ui/react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons'
import { accountsUrl } from '../../Deployed-server-url/deployed-server-url';
import AuthContext from '../../Context/Auth';
function Account(props) {
    const [State, setState] = useState('ACCOUNT')
    const navigate = useNavigate()
    const [winWidth, setWinWidth] = useState(window.innerWidth)
    const {user,logout}=useContext(AuthContext)
    console.log(user)
    const [ID, setID] = useState(user)
    const detectSize = () => { setWinWidth(window.innerWidth) }
    useEffect(() => {
        window.addEventListener('resize', detectSize)
        
        return (() => {
            window.removeEventListener('resize', detectSize)
        })
    }, [winWidth])
    useEffect(() => {
        navigate('orders')
    }, [])
    function SingOut() {
        logout();
    }
    
    
    return (
        <Box border={'1px solid red'}>
            <Box>
                <Text textAlign={'left'}>HOME  /  YOUR ACCOUNT  /  {State}</Text>
                {winWidth > 760 ? <Text mt={'30px'} textAlign={'left'} fontSize={'48px'} color={'black 300'} fontWeight={'20'}>{State}</Text> : null}
            </Box>
            <Grid >
                <Tabs textAlign={['left', 'center']}>
                    {winWidth > 760 ? <TabList >
                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(8, 1fr)']} textAlign={['left', 'center']}>
                            <GridItem>

                                <Tab > <Link onClick={(e) => { setState(e.target.innerText) }} to={'orders'}>Orders</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'returns'}>Returns</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'messages'}>Messages</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'addresses'}>Addresses</Link></Tab>
                            </GridItem>

                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'wishlist'}>Wish List</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'recentlyviewed'}>Recently Viewed</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'accountsettings'}>Account Settings</Link></Tab>
                            </GridItem>
                            <GridItem>

                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link onClick={() => {
                                    SingOut()
                                }}>Sign Out</Link></Tab>
                            </GridItem>
                        </Grid>
                    </TabList> : <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <MenuItem command='⌘T'>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'orders'}>Orders</Link></Tab>
                            </MenuItem>
                            <MenuItem>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'returns'}>Returns</Link></Tab>
                            </MenuItem>
                            <MenuItem >
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'messages'}>Messages</Link></Tab>
                            </MenuItem>
                            <MenuItem>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'addresses'}>Addresses</Link></Tab>
                            </MenuItem>
                            <MenuItem>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'recentlyviewed'}>Recently Viewed</Link></Tab>
                            </MenuItem>
                            <MenuItem>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link to={'accountsettings'}>Account Settings</Link></Tab>
                            </MenuItem>
                            <MenuItem>
                                <Tab onClick={(e) => { setState(e.target.innerText) }}> <Link onClick={() => {
                                    SingOut()
                                }}>Sign Out</Link></Tab>
                            </MenuItem>
                        </MenuList>
                    </Menu>};
                </Tabs>
                <Outlet />
            </Grid>
        </Box>
    );
}


export default Account;