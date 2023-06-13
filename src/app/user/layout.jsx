import { Menu, NavMobiile } from '@components/Menu';

export default function userLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="lg:flex">
          <Menu />
          <NavMobiile />
          {children}
        </main>
      </body>
    </html>
  );
}
