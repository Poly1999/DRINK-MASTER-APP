import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Logo from '../Logo/Logo';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = e => {
    e.preventDefault();
    if (!email) return;
    toast.success(`${email} subscribed successufully`);
    setEmail();
  };
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* left side */}
        <div className='footer-left'>
          <Logo />

          <div className='footer-social'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noreferrer'
              className='social-link'
            >
              <img src={facebook} alt='facebook' />
            </a>

            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
              className='social-link'
            >
              <img src={instagram} alt='instagram' />
            </a>

            <a
              href='https://youtube.com'
              target='_blank'
              rel='noreferrer'
              className='social-link'
            >
              <img src={youtube} alt='youtube' />
            </a>
          </div>
        </div>

        {/* center */}
        <nav className='footer-nav'>
          <Link to='/drinks' className='footer-nav-link'>
            Drinks
          </Link>
          <Link to='/add' className='footer-nav-link'>
            Add drinks
          </Link>
          <Link to='/my' className='footer-nav-link'>
            My drinks
          </Link>
          <Link to='/favorite' className='footer-nav-link'>
            Favorites
          </Link>
        </nav>

        {/* right side */}
        <div className='footer-subscribe'>
          <p className='footer-subscribe-text'>
            Subscribe up to our newsletter. Be in touch with latest news and
            special offers, etc.
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              className='footer-input'
              type='email'
              placeholder='Enter the email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type='submit' className='footer-btn'>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* bottom side */}
      <div className='footer-bottom'>
        <p className='footer-copy'>©2026 Drink Master. All rights reserved.</p>
        <div className='footer-links'>
          <a href='/privacy' className='footer-bottom-links'>
            Privacy Policy
          </a>
          <a href='/terms' className='footer-bottom-links'>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
