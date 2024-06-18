import React, { useEffect, useState } from 'react'
import "./NewUser.css"

import { Button, Alert } from '@mui/material'

function NewUser () {

  let [username, setUsername] = useState("")
  let [fullname, setFullname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [phone, setPhone] = useState("")
  let [address, setAddress] = useState("")
  let [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault()

    let userInfo = {
      username,
      fullname,
      email,
      password,
      phone,
      address
    }

    fetch('https://mersad-panel-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setAlert({ show: true, severity: 'success', message: 'User successfully added!' });
          setUsername('');
          setFullname('');
          setEmail('');
          setPassword('');
          setPhone('');
          setAddress('');
        } else {
          setAlert({ show: true, severity: 'error', message: 'Error adding user data!' });
        }
      })
      .catch(() => {
        setAlert({ show: true, severity: 'error', message: 'Network error (Use VPN)' });
      });
  }

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, severity: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  
  return (
    <>
        <div className="new_user_wrapper">
              <h2>New User</h2>
              {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
            <form autoComplete='off' onSubmit={handleSubmit}>  
              
                <div className="input_wrapper">
                  <label htmlFor="username">Username</label>
                  <input type="text" id='username' required onChange={e => setUsername(e.target.value)} value={username}/>
                </div>

                <div className="input_wrapper">
                  <label htmlFor="fullname">Fullname</label>
                  <input type="text" id='fullname' required onChange={e => setFullname(e.target.value)} value={fullname}/>
                </div>

                <div className="input_wrapper">
                  <label htmlFor="email">Email</label>
                  <input type="text" id='email' required onChange={e => setEmail(e.target.value)} value={email}/>
                </div>

                <div className="input_wrapper">
                  <label htmlFor="password">Password</label>
                  <input type="text" id='password' required onChange={e => setPassword(e.target.value)} value={password}/>
                </div>

                <div className="input_wrapper">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id='phone' required onChange={e => setPhone(e.target.value)} value={phone}/>
                </div>

                <div className="input_wrapper">
                  <label htmlFor="address">Address</label>
                  <input type="text" id='address' required onChange={e => setAddress(e.target.value)} value={address}/>
                </div>

                <Button className='new_user_button' type="submit" variant="contained">Add New User</Button>

            </form>
        </div>
    </>
  )
}

export default NewUser