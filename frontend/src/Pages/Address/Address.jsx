import React, { useContext } from 'react'
import AuthContext from '../../Context/Auth'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
export default function Address() {
  let {user}=useContext(AuthContext)
  if(user==null){
    return "Loading"
  }
  return (
    <div>
      <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th></Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Name</Td>
        <Td>{user.fname}</Td>
      </Tr>
      <Tr>
        <Td>Email</Td>
        <Td>{user.email}</Td>
      </Tr>
      <Tr>
        <Td>city</Td>
        <Td>{user.address.city}</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>State</Th>
        <Th>{user.address.state}</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
    </div>
  )
}
