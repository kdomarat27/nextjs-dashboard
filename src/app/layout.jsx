export const metadata = {
  title: 'Financial Dashboard',
  description: 'Financial dashboard app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
