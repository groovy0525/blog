import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../app/hooks";
import { remove } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

interface RemoveModalProps {
  id: string;
  isDisabled: boolean;
}

function RemoveModal({ id, isDisabled }: RemoveModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showDeleteConfirm = () => {
    confirm({
      title: "해당 글을 삭제 하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const result = (await (
          await dispatch(remove(id))
        ).payload) as { success: boolean };

        if (result.success) {
          navigate("/");
        }
      },
    });
  };

  return (
    <Button
      onClick={showDeleteConfirm}
      disabled={isDisabled}
      type="primary"
      danger
    >
      삭제
    </Button>
  );
}

export default RemoveModal;
