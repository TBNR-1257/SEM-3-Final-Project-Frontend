import { Button, Modal, Input, FileInput } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "@/pages/api/posts";
import Swal from "sweetalert2";

export default function EditAssignment({ visible, setVisible, post }) {
  const [updatedPost, setUpdatedPost] = useState({
    id: post._id,
    title: post.title,
    content: post.content,
    image: post.image,
    video: post.video,
  });

  const [image, setImage] = useState();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updatePost, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onChangeHandler = (e) =>
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });

  const imageHandler = (e) => setImage(e.target.files[0]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ updatedPost, image });
    setVisible(false);
  };

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">Edit Post</Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Post Title"
                name="title"
                onChange={onChangeHandler}
                value={updatedPost.title}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Content"
                name="content"
                onChange={onChangeHandler}
                value={updatedPost.content}
              />
            </div>
            <div>
              <FileInput
                className="w-full"
                name="image"
                bordered
                onChange={imageHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Video"
                name="video"
                onChange={onChangeHandler}
                value={updatedPost.video}
              />
            </div>

            <Button
              type="button"
              color="error"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button color="success">Confirm</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
