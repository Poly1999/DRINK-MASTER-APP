import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './SharedLayout.css';

const SharedLayout = () => {
  return (
    <div className='layout'>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
