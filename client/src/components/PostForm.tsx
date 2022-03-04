import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { create } from "../features/post/postSlice";
import { Post, ReturnType } from "../types";
import useInput from "../hooks/useInput";

function PostForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput("");
  const [content, onChangeContent] = useInput("");
  const [error, setError] = useState<string>("");

  const onFinish = async () => {
    setError("");

    if (!title) {
      setError("제목을 입력해주세요");
      return;
    }

    if (!content) {
      setError("내용을 입력해주세요");
      return;
    }

    const post = (await (
      await dispatch(create({ title, content }))
    ).payload) as ReturnType<Post>;

    if (post.success) {
      navigate("/");
    }
  };

  return (
    <Base>
      <Error>{error}</Error>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input placeholder="Title" value={title} onChange={onChangeTitle} />
        </Form.Item>
        <Form.Item>
          <StyledTextArea
            placeholder="Content"
            value={content}
            onChange={onChangeContent}
          />
        </Form.Item>
        <StyledFormItem>
          <Button type="primary" htmlType="submit">
            글쓰기
          </Button>
        </StyledFormItem>
      </Form>
    </Base>
  );
}

export default PostForm;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 760px;
  height: calc(100vh - 100px);
  margin: auto;

  @media (max-width: 800px) {
    padding: 0 16px;
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  resize: none;
  height: 200px !important;
`;

const Error = styled.p`
  color: red;
`;

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
`;
