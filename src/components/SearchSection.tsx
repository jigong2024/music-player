import { Search } from "lucide-react";
import React from "react";
import styled from "styled-components";

const SearchSection = () => {
  return (
    <InputContainer>
      <Input placeholder="노래제목이나 가수를 검색하세요..." />
      <SubmitBtn>
        <Search color="#3ed9c9" />
      </SubmitBtn>
    </InputContainer>
  );
};

export default SearchSection;

export const InputContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  width: 80%;
  margin: 10px auto;
  font-size: x-large;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 15px 20px;
  width: 100%;
  border: 2px solid #3ed9c9;
  border-radius: 8px;
`;

export const SubmitBtn = styled.div`
  position: absolute;
  right: 1%;
  top: 0;
  padding: 10px;
  cursor: pointer;
`;
