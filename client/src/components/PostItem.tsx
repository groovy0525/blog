import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../types";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <Base>
      <Link to={post._id}>
        <h3>{post.title}</h3>
      </Link>
    </Base>
  );
}

export default PostItem;

const Base = styled.li`
  padding: 10px 20px;
`;
