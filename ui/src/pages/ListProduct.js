import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from '@material-ui/core/CircularProgress';
import Trash from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
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

export default function ListProduct() {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/product/listProduct', {
        headers: {
            authorization: `bearer ${localStorage.getItem("token")}`}
    }).then(({ data: { data } }) => {
        setRows(data);
    }).catch((error) => {
        alert(error)
    }).finally(() => {
      setLoading(false);
    })
  }, []) 

  const handleDelete = (id) => {
    setDeleting(id)
    axios.delete('http://localhost:4000/api/product/deleteProduct/'+id, {
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
  }).finally(() => {
    setDeleting(null)
  })
  }

  return (
    <React.Fragment>
      <Title>Product List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell>Product Brand</TableCell>
            <TableCell>Product Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? <TableRow><TableCell colSpan={4} align="center"><Loader /></TableCell></TableRow> : rows.map(({pdt_name,pdt_price,pdt_brand,_id}) => (
            <TableRow key={_id}>
              <TableCell>{pdt_name}</TableCell>
              <TableCell>{pdt_price}</TableCell>
              <TableCell>{pdt_brand}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(_id)} disabled = {deleting === _id}>
                  {deleting === _id ? <Loader size={24} /> : <Trash />}
                </IconButton>
                <IconButton onClick={() => history.push(`/update-product/${_id}`)}>
                  <UpdateIcon />
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
