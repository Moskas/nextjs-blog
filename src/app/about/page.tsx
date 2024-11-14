export default function Home() {
  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="border-b-2 my-2 text-2xl">About Me</h1>
      <p>
        I&apos;m Moskas, a hobbyist computer programmer from Poland. The website
        has no particular topic other than being mostly tech related. It&apos;s
        mainly a place for me to write some thoughts or list my programming or
        rhythm game projects.
      </p>
      <h1 className="text-2xl border-b-2 my-2">Contact</h1>
      <ol>
        <li>
          Github:{" "}
          <a
            className="text-cyan-200 underline"
            href="https://github.com/Moskas"
          >
            Moskas
          </a>
        </li>
        <li>
          Fediverse:{" "}
          <a
            className="text-cyan-200 underline"
            href="https://fosstodon.org/@Moskas"
          >
            Moskas
          </a>
        </li>
      </ol>
    </main>
  );
}
