import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import EditForm from "../components/EditForm";
import { findOne } from "../features/post/postSlice";

function DetailPage() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(findOne(postId));
    }
  }, [dispatch, postId]);

  return <EditForm postId={postId} />;
}

export default DetailPage;
