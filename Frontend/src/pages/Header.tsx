import { GridItem, Image } from "@chakra-ui/react";
import style from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import ProfilePic from "../components/ProfilePic";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import NotifModal from "@/components/NotifModal";
import SearchBar from "@/components/SearchBar";

import monkey from "../assets/monkey.png";
import dolphin from "../assets/dolphin.png";
import fox from "../assets/fox.png";
import koala from "../assets/koala.png";
import mouse from "../assets/mouse.png";
import unicorn from "../assets/unicorn.png";
const emojiImages: Record<string, string> = {
  monkey,
  dolphin,
  fox,
  koala,
  mouse,
  unicorn,
};

const Header = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{
    color: string;
    emoji: string;
    id: string;
  } | null>(null);
  const { pathname } = useLocation();
  const hideNavRoutes = ["/feed", "/profile", "/profile/add-post"];
  const hideNav = hideNavRoutes.includes(pathname);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <GridItem className={style.header}>
        <div>
          <Image className={style.logo} src={Logo} />
        </div>
        {hideNav && (
          <div className={style.iconContainer}>
            <SearchBar onSearch={onSearch} />
            <IoIosNotifications className={style.icon} onClick={handleClick} />
            <Link to="/profile/add-post">
              <FaPlus className={style.icon} />
            </Link>
            <Link to="/feed">
              <FaHome className={style.icon} />
            </Link>
            <Link to="/profile">
              {user && (
                <ProfilePic
                  color={user.color}
                  emoji={emojiImages[user.emoji]}
                  width="40px"
                  height="40px"
                  emojiWidth="30px"
                  emojiHeight="30px"
                  padding="10px"
                />
              )}
            </Link>
          </div>
        )}
      </GridItem>
      <NotifModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
