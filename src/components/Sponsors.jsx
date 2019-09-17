import React,{ useEffect, useState, useContext } from 'react';
import Back from './Back';
import Loading from './Loading';
import axios from 'axios';
import Context from '../contextStore/Context';
import { Link } from 'react-router-dom';
const Sponsors = props => {
  // document.body.style.overflow = 'hidden';
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    sponsors: []
  });
  useEffect(() => {
    const getSponsors = async () => {
      try {
        const res = await axios.get(
            'https://us-central1-techspardha-87928.cloudfunctions.net/api/sponsors'
        );
        setState({
          ...istate,
          sponsors: res.data.data.paisa
        });
      } catch (error) {
        dispatch({
          type: 'ADD_ERROR',
          payload: { msg: 'Error Occured: Try refreshing' }
        });
        setTimeout(() => {
          dispatch({
            type: 'REMOVE_ERRORS'
          });
        }, 3000);
      }
    };
    getSponsors();
  }, []);
  
function titleSponsor(sponsor,index){
  if(index==0)
  {
    return "titleSponsor";
  }
  else
  {
    return "spnsrImgAndTitleSection";
  }
}

  console.log(istate);
  return (
    <>
      <Loading title='sponsors' />
      <div className='c-container'>
        <Back history={props} />
        <h1>Sponsors</h1>
        <div className="sponsor">
          {istate.sponsors
            .map((sponsor, index) => (
              <div key={index} className={titleSponsor(sponsor,index)}>
                <span className="spsrTitle">{sponsor.sponsorSection}</span><span className="verticalLine"></span>
                  {sponsor.sponsors.map((url,index2) => (
                    <span className="spnsrImageDiv"><img key={index2} className="sponsorImage" src={url.imageUrl} target={url.targetUrl}>
                    </img>&nbsp;<img src="1.png" className="sponsorImage"/>&nbsp;<img src="2.png" className="sponsorImage"/>&nbsp;<img src="3.png" className="sponsorImage"/>&nbsp;<img src="4.svg" className="sponsorImage"/>&nbsp;</span>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sponsors;
