import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";

function AddButton() {
  return (
    <Base to="write">
      <FormOutlined />
    </Base>
  );
}

export default AddButton;

const Base = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10%;
  right: 14%;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  border-color: #1890ff;
  background: #1890ff;
  color: #fff;
  font-size: 14px;
  z-index: 5;
`;
