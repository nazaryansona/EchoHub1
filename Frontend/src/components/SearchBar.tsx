import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import style from "../styles/SearchBar.module.css";

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <InputGroup flex="1" startElement={<LuSearch color="white" />}>
      <Input
        className={style.input}
        placeholder="Search posts"
        onChange={(e) => onSearch(e.target.value)}
        _placeholder={{ color: "gray.400", opacity: 1 }}
      />
    </InputGroup>
  );
};

export default SearchBar;
