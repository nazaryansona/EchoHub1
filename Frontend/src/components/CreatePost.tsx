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
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../styles/Profile.module.css";

interface PreviewFile {
  file: File;
  preview: string;
}

const CreatePost = () => {
  const location = useLocation();
  const isAddingPost = location.pathname.includes("/profile/add-post");
  const [files, setFiles] = useState<PreviewFile[]>([]);

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

  return (
    <>
      <Box className={style.subtleBox}>
        <IoMdArrowRoundBack color="white" size={"xs"} />
        <Text color={"white"} fontSize={"md"} marginTop={"8px"}>
          {isAddingPost ? "New Post" : "My Posts"}
        </Text>
      </Box>
      <Card.Root maxW="sm" className={style.newPostContainer}>
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
              <Textarea className={style.textarea} />
            </Field.Root>
          </Stack>

          <Button className={style.postButton}>Post</Button>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default CreatePost;
