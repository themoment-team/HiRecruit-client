import { useForm } from 'react-hook-form';

import * as S from './Form.styles';
import { positionOptionList, onSubmit, InputListType } from './container';

export const FormComponent: React.FC = () => {
  const { register, handleSubmit } = useForm<InputListType>();

  return (
    <S.FormWrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>회원가입</S.FormHeader>
        <S.Input placeholder="이름" {...register('name')} type="name" />
        <S.Input placeholder="이메일" {...register('email')} type="email" />
        <S.SelectInput {...register('position')}>
          {positionOptionList.map((opt, i) => (
            // option의 첫번째 값은 기본값으로 빈값을 반환
            <option key={opt} value={i !== 0 ? opt : ''}>
              {opt}
            </option>
          ))}
        </S.SelectInput>
        <S.Input
          placeholder="연차"
          {...register('devYear')}
          type="number"
          defaultValue={0}
          min={0}
        />
        <S.Input
          placeholder="회사명"
          {...register('company')}
          type="company-name"
        />
        <S.Input
          placeholder="한줄 소개"
          {...register('introduction')}
          type="text"
        />
        <S.Submit type="submit" value={'완료'} />
      </S.Form>
    </S.FormWrapper>
  );
};
