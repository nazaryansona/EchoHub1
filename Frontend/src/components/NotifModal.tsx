import { Box, Text } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import styles from "../styles/NotifModal.module.css";
import ProfilePic from "./ProfilePic";
import monkey from "../assets/monkey.png";

interface NotifModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifModal = ({ isOpen, onClose }: NotifModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <IoClose size={20} className={styles.closeButton} onClick={onClose} />
        <Box fontWeight="semibold" fontSize="lg">
          <Box color={"white"}>Notifications</Box>
          <Box display="flex" alignItems="center" mb={3}>
            <Box>
              <ProfilePic
                color="#269D28"
                emoji={monkey}
                width="50px"
                height="50px"
                emojiWidth="30px"
                emojiHeight="30px"
              />
            </Box>
            <Box
              ml={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text color={"white"}>Username</Text>
              <Text color={"white"}>Commented on your post</Text>
            </Box>
          </Box>
          <Box color={"white"}>You have no notifications</Box>
        </Box>
      </div>
    </div>
  );
};

export default NotifModal;
