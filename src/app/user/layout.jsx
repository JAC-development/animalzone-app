import { Menu, NavMobiile } from '@components/Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function userLayout({ children }) {
  return (
    <main className="lg:flex">
      <ToastContainer />
      <Menu />
      <NavMobiile />
      {children}
    </main>
  );
}
