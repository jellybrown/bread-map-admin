import React from 'react';

import type { BakeryMenuEntity } from '@/apis';
import { Button, Input, Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';

import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  idx: number;
  menu: Omit<BakeryMenuEntity, 'image'> & { image: File | string | null };
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => void;
};

const MenuItem = ({ idx, menu, onChangeMenuInput, onRemoveMenu, onChangeMenuImg }: Props) => {
  const { inputRef, onClickTriggerFile, getSrc } = useFileInput();

  return (
    <Container>
      <LeftContainer>
        <CustomRow>
          <label>메뉴명</label>
          <Input name={'name'} value={menu.name} type={'plain'} onChangeInput={e => onChangeMenuInput({ currIdx: idx, name: 'name', value: e.target.value })} />
        </CustomRow>
        <CustomRow>
          <label>가격</label>
          <Input
            name={'price'}
            value={menu.price.toLocaleString()}
            type={'plain'}
            onChangeInput={e => onChangeMenuInput({ currIdx: idx, name: 'price', value: e.target.value })}
          />
        </CustomRow>
        <BtnWrapper>
          <Button text={'메뉴 삭제'} type={'gray'} btnSize={'small'} onClickBtn={() => onRemoveMenu(idx)} />
          <Button text={'이미지 변경'} type={'lightOrange'} btnSize={'small'} onClickBtn={onClickTriggerFile} />
          <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={e => onChangeMenuImg({ currIdx: idx, e })} />
        </BtnWrapper>
      </LeftContainer>
      <div>
        <Preview widthRem={16} heightRem={16} src={getSrc(menu.image)} onClickTriggerFile={onClickTriggerFile} />
      </div>
    </Container>
  );
};

export default MenuItem;

const Container = styled.div`
  padding: 1rem 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 7rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;

  button:first-of-type {
    margin-right: 10px;
  }
  // height: 30px;
`;

const CustomRow = styled(Row)`
  > label {
    font-size: 1.35rem;
    font-weight: 500;
    margin-left: 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

// display: flex;
// align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};

// > label {
//   width: 12rem;
//   font-size: 1.5rem;
//   font-weight: 700;
// }

// &:not(:last-child) {
//   margin-bottom: 2.5rem;
// }

// &:not(label) {
//   flex: 1;
// }
