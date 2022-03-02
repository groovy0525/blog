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
  outline: none;
  border: none;
  position: fixed;
  bottom: 100px;
  right: 100px;
  background-color: transparent;
  font-size: 50px;
`;
