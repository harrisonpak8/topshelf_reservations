// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [method, setMethod] = useState('GET');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    let url = '/api/index';
    let options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (method === 'GET') {
      url = `/api/index?name=${name}&age=${age}`;
    } 
    
    else if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify({ name, age, city });
    } 
    
    else if (method === 'DELETE') {
      url = `/api/index?name=${name}&age=${age}`;
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setMessage(data.message);
    } 
    catch (error) {
      setMessage('Error occurred while making the request.');
    }
  };

  return (
    <div>
      <h1>API Request Method Selector</h1>
      <div>
        <label>
          Select HTTP Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
      </div>
      <div>
        {method === 'POST' || method === 'PUT' ? (
          <label>
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
        ) : null}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h2>Response:</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
