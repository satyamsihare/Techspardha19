import React from 'react';

const Back = ({ history }) => {

  return (
    <>
      <p className='back' onClick={() => {
        document.getElementById('audio').pause();
        history.history.goBack()}}>
        ../
      </p>
    </>
  );
};

export default Back;
