import React from 'react';
import Typist from 'react-typist';
import Back from './Back';
import Loading from './Loading';
// import Typewriter from 'typewriter-effect';
const About = props => {
  return (
    <>
      <Loading title='about' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/about</h1>
        <div className='container'>
          <Typist
            startDelay={0}
            avgTypingDelay={0}
            stdTypingDelay={0}
            cursor={{ show: false }}
          >
            <p className='about'>
              Techspardha is the annual techno-managerial festival of National
              Institute of Technology, Kurukshetra. It started in 1995 as
              "Technospect" (later changed to Literati). The year 2013 marked
              the Golden Jubilee of NIT Kurukshetra, thus it was renamed as
              Techspardha. Etymologically, the word ‘Techspardha’ is composed of
              two words, ‘Tech’ in English is a contraction of technology and
              ‘Spardha’ in Hindi means competition.[citation needed] Techspardha
              is known for hosting a variety of events that include
              competitions, exhibitions, guest lectures as well as workshops.
            </p>
            <br />
            <p className='about'>
              Students are provided with an opportunity to showcase their skills
              and talents in a wide spectrum of events which test not only the
              technical know-how, but also managerial and soft skills. The
              events are aimed to encourage students to come out of textbooks
              and apply their knowledge in a real-life setup.
            </p>
          </Typist>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default About;
