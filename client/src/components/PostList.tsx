import { useEffect } from "react";
import { Button, List } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { find } from "../features/post/postSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getDate from "../lib/date";

function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(
    (state: RootState) => state.post.data.posts.posts
  );

  const onClick = () => {
    dispatch(find());
  };

  useEffect(() => {
    if (!posts) {
      dispatch(find());
    }
  }, [dispatch, posts]);

  if (!posts) return null;

  return (
    <Base>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={post => {
          const date = getDate(post.createdAt);

          return (
            <List.Item>
              <StyledLink to={post._id}>
                <List.Item.Meta title={post.title} />
                <Author>글쓴이: {post.user.username}</Author>
                <DateInfo>{date.time ? date.time : date}</DateInfo>
              </StyledLink>
            </List.Item>
          );
        }}
      />
      <Button onClick={onClick}>More...</Button>
    </Base>
  );
}

export default PostList;

const Base = styled.div`
  max-width: 1024px;
  margin: 30px auto;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Author = styled.h5`
  margin: 0;
`;

const DateInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 0;

  > span:nth-of-type(2) {
    margin-left: 20px;
  }
`;
