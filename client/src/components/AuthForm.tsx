import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { logIn, register } from "../features/auth/authSlice";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { Auth, ReturnType } from "../types";

enum AuthType {
  register = "회원 가입",
  login = "로그인",
}

interface AuthProps {
  type: "register" | "login";
}

function AuthForm({ type }: AuthProps) {
  const dispatch = useAppDispatch();
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [error, setError] = useState<string>("");

  const onFinish = async () => {
    setError("");

    if (!username) {
      setError("아이디를 입력해 주세요");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해 주세요");
      return;
    }

    if (type === "login") {
      const result = (await (
        await dispatch(logIn({ username, password }))
      ).payload) as ReturnType<Auth>;

      const { success, statusCode } = result;

      if (!success) {
        if (statusCode === 401) {
          setError("아이디, 비밀번호를 확인해 주세요.");
          return;
        }
      }
    }

    if (type === "register") {
      if (password !== passwordConfirm) {
        setError("비밀 번호와 비밀 번호 확인이 다릅니다.");
        return;
      }

      const result = (await (
        await dispatch(register({ username, password }))
      ).payload) as ReturnType<Auth>;

      const { success, statusCode } = result;

      if (!success) {
        if (statusCode === 409) {
          setError("이미 존재하는 아이디 입니다.");
          return;
        }
      }
    }
  };

  return (
    <Base>
      <StyledForm onFinish={onFinish}>
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={onChangeUsername}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Item>
        {type === "register" && (
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Re-Enter Password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </Form.Item>
        )}
        <Error>{error}</Error>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            {AuthType[type]}
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </Base>
  );
}

export default AuthForm;

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
`;

const StyledForm = styled(Form)`
  max-width: 360px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const Error = styled.p`
  color: red;
`;
