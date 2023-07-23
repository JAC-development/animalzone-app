'use cient';
import './globals.css';
import { ProviderAuth } from 'hooks/useAuth';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderAuth>{children}</ProviderAuth>
      </body>
    </html>
  );
}
