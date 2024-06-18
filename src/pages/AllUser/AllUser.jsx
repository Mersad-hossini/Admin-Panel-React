import React, { useEffect, useState } from 'react'
import "./AllUser.css"
import { DataGrid } from '@mui/x-data-grid';
import {Button, Alert} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../component/Loading/Loading';
import ModalInput from '../../component/Modal/ModalInput';

function AllUser () {
  // State
  let [getUsers, setGetUsers] = useState([])
  let [loading, setLoading] = useState(true)
  let [username, setUsername] = useState("")
  let [fullname, setFullname] = useState("")
  let [email, setEmail] = useState("")
  let [phone, setPhone] = useState("")
  let [address, setAddress] = useState("")

  
  let [userID, setUserID] = useState("")

    // For Real time show us users
  let [getData, setGetData] = useState(false)

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (params) => {
    setUserID(params.id)
    setOpen(true)
    setUsername(params.username)
    setFullname(params.fullname)
    setEmail(params.email)
    setPhone(params.phone)
    setAddress(params.address)
  };
  const handleClose = () => setOpen(false);

  // Get Users Api
  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await fetch('https://mersad-panel-default-rtdb.firebaseio.com/users.json');
        let data = await response.json();
        if(data) {
          let formattedData = Object.entries(data).map(([id, userData]) => ({
            id, // Unique ID
            ...userData
          }));
          setGetUsers(formattedData);
        } else {
          setGetUsers([])
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setGetUsers([])
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getData]);

  // Delete User
  const deleteHandler = async (userId) => {
    await fetch(`https://mersad-panel-default-rtdb.firebaseio.com/users/${userId}.json`, {
      method:"DELETE"
    })
    setGetData(prev => !prev)
  }

  // Update user Info
  const submitHandler = async (e) => {
    e.preventDefault()

    let userInfo = {
      username,
      fullname,
      email,
      phone,
      address
    }

    await fetch(`https://mersad-panel-default-rtdb.firebaseio.com/users/${userID}.json`, {
      method: 'PUT',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      setGetData(prev => !prev)
      handleClose()
  }

  // Make columns [field, headerName, width, renderCell] to use Table
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'user',
      headerName: 'UserName',
      width: 130,
      renderCell: (params) => {
          return (
                <div className="userList">
                    {params.row.username}
                </div>
          )
      }
    },
    {
      field: 'fullname',
      headerName: 'FullName',
      width: 180
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 100
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
          return (
              <div className='actions_icon'>
                <button className='user_list_edit' onClick={() => handleOpen(params.row)}>Edit</button>
                <DeleteIcon className="user_list_delete" onClick={() => {deleteHandler(params.row.id)}} />
              </div>
          )
      }
    },
  ]

  return (
    <>
      <div className="user_list">
        {loading ? (
            <Loading />
        ) : getUsers.length === 0 ? (
          <Alert severity='error' className='user_alert' >No users available.</Alert>
        ) : (
          <>
            <DataGrid
              rows={getUsers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[2, 4 , 5, 10, 15]}
              checkboxSelection
              style={{fontSize:'16px', fontWeight:"400"}}
              />
          </>
        )}
      </div>

        <ModalInput open={open} onClose={handleClose}>
          <form autoComplete='off' onSubmit={submitHandler}>
            <div className="update_user">
              <input type="text" placeholder='User Name' value={username} onChange={e => setUsername(e.target.value)} required/>
            </div>

            <div className="update_user">
              <input type="text" placeholder='Full Name' value={fullname} onChange={e => setFullname(e.target.value)} required/>
            </div>

            <div className="update_user">
              <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/>
            </div>

            <div className="update_user">
              <input type="text" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} required/>
            </div>

            <div className="update_user">
              <input type="text" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} required/>
            </div>

            <Button style={{width:'500px'}} type="submit" variant="contained">Update</Button>
          </form>
        </ModalInput>
    </>
  )
}

export default AllUser