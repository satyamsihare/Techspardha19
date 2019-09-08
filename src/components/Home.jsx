import React, { useState, useEffect } from 'react';
import Baffle from 'baffle-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [obfuscate, setObfuscate] = useState({
    obs: true
  });

  useEffect(() => {
    setTimeout(() => {
      setObfuscate({
        ...obfuscate,
        obs: false
      });
    }, 200);
  }, []);

  const list = ['/events', '/sponsors', '/faqs', '/login', '/contact'];
  const homeList = list.map((item, index) => (
    <li key={index}>
      <Link to={item}>
        <Baffle speed={150} obfuscate={obfuscate.obs} revealDelay={300}>
          {item}
        </Baffle>
      </Link>
    </li>
  ));

  return (
    <>
      <div className='container'>
        <div className='Menu'>
          <div className='title-main'>
            <Baffle speed={150} obfuscate={obfuscate.obs}>
              TECHSPARDHA/2019
            </Baffle>
          </div>
          <ul>{homeList}</ul>
        </div>
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </>
  );
};

export default Home;
