import { getAllPosts, listTags } from "@/lib/posts";
import { summary } from "@/lib/summary";

export default function HomePage() {
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach((post) => {
    const year = post.date.split(" ")[2];
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold py-4">My Travels</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="transition duration-300 ease-in-out hover:scale-105">
          <img
            src="https://moskas.github.io/IMG/Travels/Poland/PXL1.jpg"
            alt=""
          />
          <h1>Warsaw</h1>
        </div>

        <div className="transition duration-300 ease-in-out hover:scale-105">
          <img
            src="https://moskas.github.io/IMG/Travels/Germany/PXL1.jpg"
            alt=""
          />
          <h1 className="">Berlin</h1>
        </div>

        <div className="transition duration-300 ease-in-out hover:scale-105">
          <img src="https://moskas.github.io/IMG/Travels/USA/PXL1.jpg" alt="" />
          <h1>San Diego</h1>
        </div>
        <div className="transition duration-300 ease-in-out hover:scale-105">
          <img
            src="https://moskas.github.io/IMG/Travels/Czechia/PXL1.jpg"
            alt=""
          />
          <h1>Prague</h1>
        </div>
      </div>
    </div>
  );
}
