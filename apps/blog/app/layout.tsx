import { BeakerIcon } from "@heroicons/react/solid";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>

      <body>{children}</body>
    </html>
  );
}
