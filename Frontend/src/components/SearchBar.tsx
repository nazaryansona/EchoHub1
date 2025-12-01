import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import style from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <InputGroup flex="1" startElement={<LuSearch color="white" />}>
      <Input
        className={style.input}
        placeholder="Search contacts"
        _placeholder={{ color: "gray.400", opacity: 1 }}
      />
    </InputGroup>
  );
};

export default SearchBar;
