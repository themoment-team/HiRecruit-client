import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Input as commonInput } from 'components/common/Input';
import { PostCode } from 'components/common/Postcode';
import { Button as commonBtn } from 'components/common/Button';

import pallete from 'shared/Pallete';

import { onSubmit, InputListType } from './container';

const FormWrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${pallete.scheme.white};
  border-radius: 10px;
`;

const Form = styled.form`
  max-width: 28rem;
  padding: 2rem;
`;

const FormHeader = styled.div`
  width: 100%;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.75rem;
  color: ${pallete.scheme.paragraph};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Button = styled(commonBtn)`
  width: 6rem;
  height: 2.75rem;
`;

const ProfileImage = styled.div`
  width: 17.25rem;
  height: 8rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.75rem;
  overflow: hidden;
  background-color: ${pallete.scheme.gray};
`;

const Input = styled(commonInput)`
  outline: none;
  border: 2px solid ${pallete.scheme.blue};
  margin: 1rem 0;
  &::placeholder {
    transition: unset;
  }
  &:focus {
    outline: none;
  }
`;

const SubmitInput = styled.input`
  width: 100%;
  border-radius: 1.5rem;
  font-weight: 500;
  color: ${pallete.scheme.white};
  padding: 0.75rem;
  margin-top: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  background-color: ${pallete.scheme.blue};
  border: none;
  cursor: pointer;
`;

export const CompanyFormComponent: React.FC = () => {
  const { register, handleSubmit } = useForm<InputListType>();
  const [address, setAddress] = useState<string>('');
  const [previewCompanyImgUri, setPreviewCompanyImgUri] = useState<string>('');

  const [isPostCode, setIsPostCode] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>회사 등록</FormHeader>
        <Input
          placeholder="회사명"
          {...register('companyName')}
          type="name"
          maxLength={100}
        />
        <Input
          placeholder="회사 홈페이지 링크"
          {...register('homepageUri')}
          type="email"
          maxLength={100}
        />
        <ButtonWrapper>
          <Input
            placeholder="회사 이미지 링크"
            {...register('companyImgUri')}
            type="text"
            maxLength={100}
            onChange={e => {
              setPreviewCompanyImgUri(e.target.value);
            }}
          />
          <Button type="button" onClick={() => setIsPreview(prev => !prev)}>
            미리보기
          </Button>
        </ButtonWrapper>
        {isPreview && (
          <ProfileImage>
            <img src={previewCompanyImgUri} alt="회사 이미지" height="100%" />
          </ProfileImage>
        )}
        <Input
          placeholder="회사 도로명 주소"
          {...register('companyLocation')}
          type="address"
          value={address}
          onClick={() => setIsPostCode(true)}
        />
        {isPostCode && (
          <PostCode key="key1" set={setAddress} setVisible={setIsPostCode} />
        )}
        <SubmitInput type="submit" value={'완료'} />
      </Form>
    </FormWrapper>
  );
};
