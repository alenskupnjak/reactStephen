import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  console.log(language.value);

  

  useEffect(() => {
    const search = async () => {
      const { data} = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
          },
        },
      );
      console.log(data);
    };

    search();
  }, [language, text]);

  return <div />;
};

export default Convert;
