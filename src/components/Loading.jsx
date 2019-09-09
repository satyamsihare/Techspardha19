import React from 'react';
import Progress from 'react-progressbar';

const Loading = () => {
  return (
    <>
      <Progress height='35px' completed={45}>
        <span className='loading-text'> Loading /home ...</span>
      </Progress>
    </>
  );
};

export default Loading;
