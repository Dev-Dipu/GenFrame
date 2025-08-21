import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import api from "../utils/AxiosInstance";
import Loader from "../components/Loader"; // 👈 loader import

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    api
      .get("/posts")
      .then(({ data }) => {
        setPosts(data?.data.reverse());
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // 👈 loading complete
  }, []);

  if (loading) {
    return <Loader />; // 👈 jab tak posts nahi aate loader dikhao
  }

  return (
    <div className="bg-[#0b0b0b] text-neutral-200 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post, i) => (
          <PostCard key={i} post={post} index={i} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
