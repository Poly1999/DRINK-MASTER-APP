import { useState } from 'react';
import './ThemeToggler.css';

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-theme');
  };
  return (
    <button
      className={`theme-toggler ${isDark ? 'dark' : 'light'}`}
      onClick={toggle}
    >
      <span className='theme-toggler-circle' />
    </button>
  );
};

export default ThemeToggler;
