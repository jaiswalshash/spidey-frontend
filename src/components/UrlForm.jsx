import React, { useState } from 'react';
import axios from 'axios';

function UrlForm() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/data', { url });
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error: Unable to fetch data');
    }
  };

  const handleSitemap = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/getSitemap', { url });
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error: Unable to fetch data');
    }
  }

  const handleBrokenLinks = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/brokenLinks', { url });
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error: Unable to fetch data');
    }
  } 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL : 
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSitemap}>Generate Sitemap</button>
        <button type="button" onClick={handleBrokenLinks}>Get Broken Links</button>
        
      </form>
      {response && (
        <div>
          <h2>Response Is:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UrlForm;
