import React, { useState } from 'react';
import Progress from 'react-progressbar';

const Loading = props => {
  const [width, setState] = useState(10);
  var s = props.title;
  const [text, setState2] = useState('/' + s + ' Loading ...');
  // let text="Loading /home ...";
  var id = setTimeout(() => {
    frame();
  }, 10);
  var flag = 0;
  function frame() {
    if (width < 100 && flag == 0) {
      setState(width + 1);
      console.log(width);
      // setState(0);
    } else {
      flag++;
      setState2('/' + s + ' Accessed');
      console.log(text);
      // setState(0);
      // document.getElementById('head').innerhtml
    }
  }

  return (
    <>
      <Progress height='35px' completed={width}>
        <span id='head' className='loading-text'>
          {text}
        </span>
      </Progress>
    </>
  );
};

export default Loading;
