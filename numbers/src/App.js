import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NumbersList = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8008/numbers', {
          params: {
            url: [
              'http://104.211.219.98/numbers/primes',
              'http://abc.com/fibo',
            ],
          },
        });

        setNumbers(response.data);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Numbers List</h1>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumbersList;