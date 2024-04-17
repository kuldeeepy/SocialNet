import Foot from "../components/Foot.jsx";
import Post from "../components/Post.jsx";
import Story from "../components/Story.jsx";

function Home() {
  return (
    <>
      <div>
        <Story />
        <Post />
      </div>
      <Foot />
    </>
  );
}

export default Home;
