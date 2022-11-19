import React from 'react';
import axios from 'axios';

const RandomQuotes = () => {
  const options = {
    method: 'POST',
    url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c78b23ab3emsh9417fe91a36eebap10fb38jsn072f5de820f4',
      'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
    },
    data: '{"key1":"value","key2":"value"}',
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return <div className="mt-6"></div>;
};

export default RandomQuotes;
