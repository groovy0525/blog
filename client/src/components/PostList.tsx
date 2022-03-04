import { useEffect } from "react";
import { List } from "antd";
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

  useEffect(() => {
    if (!posts) {
      dispatch(find());
    }
  }, [dispatch, posts]);

  useEffect(() => {
    let fetching = false;
    const onScroll = async () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;

      if (!fetching && scrollTop + innerHeight >= scrollHeight - 60) {
        fetching = true;
        await dispatch(find());
        fetching = false;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

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
                <DateInfo>{date.time ? date.time : date.date}</DateInfo>
              </StyledLink>
            </List.Item>
          );
        }}
      />
    </Base>
  );
}

export default PostList;

const Base = styled.div`
  max-width: 1024px;
  height: calc(100vh - 350px);
  margin: 30px auto 0;
  padding: 0 30px;

  .ant-list-items {
    padding-bottom: 80px;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  h4 {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
