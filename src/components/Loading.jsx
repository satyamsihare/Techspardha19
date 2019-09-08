import React, { useState } from 'react';
import Progress from 'react-progressbar';

const Loading = () => {
  return (
    <>
      <Progress height='35px' completed={30}>
        <span className='loading-text'> Loading /home ...</span>
      </Progress>
    </>
  );
};

export default Loading;
