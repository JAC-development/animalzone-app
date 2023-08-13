import { Menu, NavMobiile } from '@components/Menu';

export default function userLayout({ children }) {
  return (
    <main className="lg:flex">
      <Menu />
      <NavMobiile />
      {children}
    </main>
  );
}
