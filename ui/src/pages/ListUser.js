import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Trash from '@material-ui/icons/Delete';
import Title from './Title';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ListUser() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('role') !== 'ADMIN') {
      alert('Only admin can view this page');
      history.push('/dashboard');
    }

    axios.get('http://localhost:4000/api/listUser', {
        headers: {
            authorization: `bearer ${localStorage.getItem("token")}`}
    }).then(({ data: { data } }) => {
        setRows(data);
    }).catch((error) => {
        alert(error)
    })
  }, []) 

  const handleDelete = (id) => {

    axios.delete('http://localhost:4000/api/deleteUser/'+id, {
      headers: {
          authorization: `bearer ${localStorage.getItem("token")}`}
  }).then(() => {
      setRows((data) => {
        alert("Entry Deleted...")
        return data.filter(({_id}) => {
          return _id !== id
        })
      });
  }).catch((error) => {
      alert(error)
  })
  }

  return (
    <React.Fragment>
      <Title>User List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User FirstName</TableCell>
            <TableCell>User LastName</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>User Password</TableCell>
            <TableCell>User Phone</TableCell>
            <TableCell>User State</TableCell>
            <TableCell>User Pincode</TableCell>
            <TableCell>User Role</TableCell>
            <TableCell>User Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({usr_firstname,usr_lastname,usr_email,usr_password,usr_mobile,usr_state,usr_postalcode,usr_role,_id}) => (
            <TableRow key={_id}>
              <TableCell>{usr_firstname}</TableCell>
              <TableCell>{usr_lastname}</TableCell>
              <TableCell>{usr_email}</TableCell>
              <TableCell>{usr_password}</TableCell>
              <TableCell>{usr_mobile}</TableCell>
              <TableCell>{usr_state}</TableCell>
              <TableCell>{usr_postalcode}</TableCell>
              <TableCell>{usr_role}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(_id)}>
                  <Trash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
