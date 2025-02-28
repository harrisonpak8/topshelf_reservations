import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch('/api/index?name=Arindam');
      const data = await res.json();
      setMessage(data.message); // Set the response message
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>{message || 'Loading...'}</h1>
    </div>
  );
}