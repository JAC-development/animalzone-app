import { Menu, NavMobiile } from '@components/Menu';

export default function adminLayout({ children }) {
  return (
    <main className="lg:flex">
      <Menu />
      <NavMobiile />
      {children}
    </main>
  );
}
