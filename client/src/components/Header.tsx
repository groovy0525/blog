import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { logOut } from "../features/auth/authSlice";

function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.data.user);

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Base>
        <Title>
          <Link to="/">Noah's Board</Link>
        </Title>
        {user ? (
          <ButtonBox>
            <span>{user.username}</span>
            <StyledButton type="primary" onClick={onLogOut}>
              로그아웃
            </StyledButton>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <StyledLink to="login">로그인</StyledLink>
            <StyledLink to="register">회원 가입</StyledLink>
          </ButtonBox>
        )}
      </Base>
      <Space />
    </>
  );
}

export default Header;

const Base = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  padding: 0 30px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  z-index: 10;
`;

const Title = styled.h1`
  margin: 0;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  > span {
    margin-right: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;

const StyledButton = styled(Button)`
  line-height: 24px;
`;

const StyledLink = styled(Link)`
  height: 32px;
  padding: 4px 15px;
  border-radius: 2px;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  font-size: 14px;
  line-height: 24px;

  & + & {
    margin-left: 10px;
  }
`;

const Space = styled.div`
  height: 100px;
`;
