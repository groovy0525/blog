import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import RemoveModal from "./RemoveModal";
import useInput from "../hooks/useInput";
import { findOne, update } from "../features/post/postSlice";
import { Post, ReturnType } from "../types";

interface EditFormProps {
  postId: string | undefined;
}

function EditForm({ postId }: EditFormProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.data.user);
  const post = useAppSelector((state: RootState) => state.post.data.post);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, onChangeContent, setContent] = useInput("");
  const [error, setError] = useState<string>("");

  const handleEdit = () => {
    setIsEdit(prev => !prev);
  };

  const onFinish = async () => {
    if (isEdit) {
      setError("");

      if (!title) {
        setError("제목을 입력해주세요");
        return;
      }

      if (!content) {
        setError("내용을 입력해주세요");
        return;
      }

      if (postId) {
        const post = (await (
          await dispatch(update({ postId, data: { title, content } }))
        ).payload) as ReturnType<Post>;

        if (post.success) {
          dispatch(findOne(postId));
          setIsEdit(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!isEdit && post) {
      setError("");
      setTitle(post?.title);
      setContent(post?.content);
    }
  }, [post, setTitle, setContent, isEdit]);

  if (!post) return null;

  const { createdAt, updatedAt, user: postUser } = post;
  const auth = postUser.id !== user?.id;

  return (
    <Base>
      <Error>{error}</Error>
      {!isEdit && (
        <Info>
          <span>작성일: {createdAt.slice(0, 16)}</span>
          <span>수정일: {updatedAt.slice(0, 10)}</span>
        </Info>
      )}
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            placeholder="Title"
            value={title}
            readOnly={isEdit ? false : true}
            onChange={onChangeTitle}
          />
        </Form.Item>
        <Form.Item>
          <StyledTextArea
            placeholder="Content"
            value={content}
            readOnly={isEdit ? false : true}
            onChange={onChangeContent}
          />
        </Form.Item>
        {isEdit ? (
          <Form.Item>
            <ButtonBox>
              <Button type="primary" htmlType="submit" key="submit">
                수정 완료
              </Button>
              <Button type="default" htmlType="button" onClick={handleEdit}>
                취소
              </Button>
            </ButtonBox>
          </Form.Item>
        ) : (
          <Form.Item>
            <ButtonBox>
              <Button
                type="primary"
                disabled={auth}
                htmlType="button"
                onClick={handleEdit}
                key="edit"
              >
                수정
              </Button>
              <RemoveModal id={postId as string} isDisabled={auth} />
            </ButtonBox>
          </Form.Item>
        )}
      </Form>
    </Base>
  );
}

export default EditForm;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 760px;
  height: calc(100vh - 100px);
  margin: auto;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const StyledTextArea = styled(Input.TextArea)`
  resize: none;
  height: 200px !important;
`;

const ButtonBox = styled.div`
  text-align: right;

  .ant-btn:nth-of-type(2) {
    margin-left: 4px;
  }
`;

const Error = styled.p`
  color: red;
`;
