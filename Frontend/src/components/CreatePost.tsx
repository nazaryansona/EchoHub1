import {
  Button,
  Card,
  Field,
  Stack,
  FileUpload,
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../styles/Profile.module.css";
import api from "../api/apiClient";

interface PreviewFile {
  file: File;
  preview: string;
}

const CreatePost = () => {
  const location = useLocation();
  const isAddingPost = location.pathname.includes("/profile/add-post");
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [text, setText] = useState("");

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const previewFiles = Array.from(selectedFiles).map((file: File) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles(previewFiles);
  };

  const deleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!text && files.length === 0) return; // nothing to post

    const formData = new FormData();
    formData.append("text", text);
    if (files[0]) formData.append("image", files[0].file); // first file only, change if multiple

    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created!");
      navigate("/profile"); // go back to profile after posting
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    }
  };

  return (
    <>
      <Box className={style.subtleBox}>
        <IoMdArrowRoundBack
          onClick={() => navigate(-1)}
          className={style.iconBackArrow}
        />

        <Text color={"white"} fontSize={"md"} marginTop={"8px"}>
          {isAddingPost ? "New Post" : "My Posts"}
        </Text>
      </Box>
      <Card.Root
        maxW="sm"
        className={style.newPostContainer}
        maxH="47vh"
        overflowY="auto"
        p="4"
      >
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <FileUpload.Root>
                <FileUpload.HiddenInput onChange={handleFiles} />
                <FileUpload.Trigger asChild>
                  <Button
                    className={style.uploadFileButton}
                    size="sm"
                    color="white"
                    bg="#1e2e3d"
                    border="none"
                  >
                    <HiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>
                {/* <FileUpload.List /> */}
              </FileUpload.Root>
            </Field.Root>
            {files.length > 0 && (
              <Box mt="4">
                {files.map(({ file, preview }, index) => (
                  <Box key={index} position="relative" mb="10px">
                    <Button
                      size="xs"
                      position="absolute"
                      top="5px"
                      right="5px"
                      bg="red.500"
                      color="white"
                      borderRadius="full"
                      onClick={() => deleteFile(index)}
                    >
                      ✕
                    </Button>
                    <Box key={index} mb="10px">
                      {file.type.startsWith("image/") && (
                        <img
                          src={preview}
                          alt="preview"
                          style={{ width: "100%", borderRadius: "8px" }}
                        />
                      )}

                      {file.type.startsWith("video/") && (
                        <video
                          src={preview}
                          controls
                          style={{ width: "100%", borderRadius: "8px" }}
                        ></video>
                      )}

                      {!file.type.startsWith("image/") &&
                        !file.type.startsWith("video/") && (
                          <Text color="white">
                            📄 {file.name} (file preview not supported)
                          </Text>
                        )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Field.Root>
              <Field.Label color="white">Add text</Field.Label>
              <Textarea
                className={style.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Field.Root>
          </Stack>

          <Button className={style.postButton} onClick={handleSubmit}>
            Post
          </Button>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default CreatePost;
