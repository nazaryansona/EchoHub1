import { useState, useEffect } from "react";
import { Button, Input, Stack, Text, HStack } from "@chakra-ui/react";

interface Comment {
  id: number;
  text: string;
}

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");

  // Simula traer datos del backend
  useEffect(() => {
    const fakeComments = [
      { id: 1, text: "Nice post!" },
      { id: 2, text: "I love this!" },
    ];
    setComments(fakeComments);
  }, [postId]);

  const addComment = () => {
    if (!input.trim()) return;

    const newComment = {
      id: Date.now(),
      text: input,
    };

    setComments([...comments, newComment]);
    setInput("");
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <Stack p={4} border="1px solid gray" borderRadius="8px" mt={4}>
      {comments.map((c) => (
        <HStack key={c.id} justify="space-between">
          <Text color="white">{c.text}</Text>
          <Button
            size="xs"
            colorScheme="red"
            onClick={() => deleteComment(c.id)}
          >
            Delete
          </Button>
        </HStack>
      ))}

      <HStack mt={3}>
        <Input
          placeholder="Write a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="green" onClick={addComment}>
          Add
        </Button>
      </HStack>
    </Stack>
  );
};

export default CommentSection;
