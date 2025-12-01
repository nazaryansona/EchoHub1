import { GridItem, Image } from "@chakra-ui/react";
import style from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import ProfilePic from "../components/ProfilePic";
import monkey from "../assets/monkey.png";
import SearchBar from "../components/SearchBar";
import NotifModal from "../components/NotifModal";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const hideNavRoutes = ["/feed", "/profile", "/profile/add-post"];
  const hideNav = hideNavRoutes.includes(pathname);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <GridItem className={style.header}>
        <div>
          <Image className={style.logo} src={Logo} />
        </div>
        {hideNav && (
          <div className={style.iconContainer}>
            <SearchBar />
            <IoIosNotifications className={style.icon} onClick={handleClick} />
            <Link to="/profile/add-post">
              <FaPlus className={style.icon} />
            </Link>
            <Link to="/feed">
              <FaHome className={style.icon} />
            </Link>
            <Link to="/profile">
              <ProfilePic
                color="#269D28"
                emoji={monkey}
                width="40px"
                height="40px"
                emojiWidth="20px"
                emojiHeight="20px"
              />
            </Link>
          </div>
        )}
      </GridItem>
      <NotifModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
