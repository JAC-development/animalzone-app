import { Menu, NavMobiile } from '@components/Menu';

export default function monitorLayout({ children }) {
  return (
    <main className="lg:flex">
      <Menu />
      <NavMobiile />
      {children}
    </main>
  );
}
