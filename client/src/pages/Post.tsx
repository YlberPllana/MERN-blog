import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import CommentsForm from "../components/CommentsForm";

interface IProps {
  _id: string;
  title: string;
  body: string;
  author: {
    [key: string]: any;
  };
  date: Date;
  published: boolean;
  imageUrl: string;
  user: any;
}

interface IComment {
  username: string;
  text: string;
  postId: string;
  date: Date;
}

function Post({
  _id,
  title,
  body,
  author,
  date,
  published,
  imageUrl,
  user,
}: IProps) {
  const postId = _id;
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    document.title = "Post | MERN Blog";

    axios
      .get(`/api/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [postId]);

  return (
    <div className="flex items-center justify-center bg-purple-100">
      <div className="text-center w-3/4 x-10 bg-white">
        <div className="my-8">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="text-sm">
            <p className="my-2">
              By <em className="text-slate-500">{author.username}</em>
            </p>
            <p>Published on {new Date(date).toLocaleString()}</p>
          </div>
        </div>
        <img className="w-4/5 m-auto" src={imageUrl} alt="background" />
        <p className="text-left mt-8 w-4/5 m-auto">{body}</p>
        <div className="my-8 w-4/5 m-auto text-left">
          <p className="border-b border-b-black mb-2 font-semibold">
            Comments ({comments ? comments.length : 0})
          </p>
          <CommentsForm
            postId={postId}
            comments={comments}
            setComments={setComments}
          />
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default Post;
