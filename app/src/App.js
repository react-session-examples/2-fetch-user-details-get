import React, { useEffect, useState } from 'react'

// Components.
import { ErrorHandler } from '@app/components'

function App() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setLoginResult] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        setTimeout(() => {
          setUserDetails(json);
        }, 5000); // 2000 milliseconds = 2 seconds
      });
    console.log('page loaded'); // Mount Phase
  }, []);

  return (
    <>
      <ErrorHandler>
        <h1>Welcome to Simple Login Screen</h1>
        <input type="text" name="username" onChange={event => {
          setUsername(event.target.value);
        }} placeholder="User name" value={userName} />
        <input type="password" name="password" placeholder="Password" onChange={event => {
          setPassword(event.target.value);
        }} value={password} />
        <input type="submit" value="Login" onClick={event => {
          if (userName === 'demo' && password === 'demo') {
            setLoginResult('Success');
          } else {
            setLoginResult('Invalid Login');
          }
        }} />

        <div>
          {userName && `Your username is ${userName}`}<br />
          {password && `Your passwod is ${password}`}<br />
          <h3>{result}</h3>
        </div>
        {userDetails == null && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #ccc',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p>Loading user details...</p>
        </div>
        )}
        {userDetails != null && (<div>
          <h2>User details</h2>
          <ul>
            <li>User ID: {userDetails.userId}</li>
            <li>ID: {userDetails.id}</li>
            <li>Title: {userDetails.title}</li>
            <li>Is this Completed: {userDetails.completed}</li>
          </ul>
        </div>)}
      </ErrorHandler>
    </>
  )
}

export default App
