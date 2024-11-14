import "./globals.css"; // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title className="text-xl">My Blog</title>
      </head>
      <body className="flex flex-col min-h-screen p-2 sm:p-5 max-w-4xl mx-auto">
        <header className="mx-2 sm:mx-5 flex justify-between items-center border-b-2 py-2">
          <a href="../" className="hover:underline">
            <div className="text-lg font-bold">Moskas&apos; Blog</div>
          </a>
          <div className="space-x-2 sm:space-x-4">
            <a href="../" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
            <a href="/resume" className="hover:underline">
              Resume
            </a>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="mx-2 sm:mx-5 flex justify-between border-t-2 py-2">
          <span className="space-x-2 sm:space-x-5">
            <a className="hover:underline" href="feed">
              rss
            </a>
            <a className="hover:underline" href="https://github.com/Moskas">
              git
            </a>
            <a className="hover:underline" href="https://fosstodon.org/@Moskas">
              mas
            </a>
            <a
              className="hover:underline"
              href="https://twitter.com/@moskas_dev"
            >
              twi
            </a>
          </span>
          <p>Moskas {new Date().getFullYear()} </p>
        </footer>
      </body>
    </html>
  );
}
