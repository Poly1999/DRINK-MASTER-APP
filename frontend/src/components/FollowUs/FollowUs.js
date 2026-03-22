import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import './FollowUs.css';

const FollowUs = () => {
  return (
    <div className='follow-us'>
      <h3 className='follow-us-title'>Follow Us</h3>
      <div className='follow-us-links'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noreferrer'
          className='follow-us-link'
        >
          <img src={facebook} alt='facebook' />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noreferrer'
          className='follow-us-link'
        >
          <img src={instagram} alt='instagram' />
        </a>
        <a
          href='https://youtube.com'
          target='_blank'
          rel='noreferrer'
          className='follow-us-link'
        >
          <img src={youtube} alt='youtube' />
        </a>
      </div>
    </div>
  );
};

export default FollowUs;
