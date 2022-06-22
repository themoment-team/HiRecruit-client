import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import toast from 'react-hot-toast';
import { css } from '@emotion/react';

import axiosClient from 'libs/axios/axiosClient';
import { mentorUrl } from 'libs/api/apiUrlControllers';
import pallete from 'shared/Pallete';

import * as S from './VerifyForm.styles';

interface VerifyFormProps {
  setVerifyFormVisible: Dispatch<SetStateAction<boolean>>;
}

interface InputListType {
  digit: string;
}

export const VerifyFormComponent: React.FC<VerifyFormProps> = ({
  setVerifyFormVisible,
}) => {
  const { register, handleSubmit } = useForm<InputListType>();
  const [isPostable, setIsPostable] = useState<boolean>(true);
  const [postTryCount, setPostTryCount] = useState<number>(0);

  const resendEmailDuration = 10;

  const onSubmit: SubmitHandler<InputListType> = async data => {
    axiosClient
      .patch(mentorUrl.patchVerify(data.digit))
      .then(function (response) {
        toast.success('인증이 완료되었어요');
        console.log(response);
      })
      .catch(function (error) {
        toast.error('인증에 실패하였어요');
        console.log(error);
      });
  };

  const onPostEmail = () => {
    if (isPostable) {
      setIsPostable(false);
      axiosClient
        .post(mentorUrl.postPromotionEmailProcess())
        .then(function (response) {
          setIsPostable(false);
          setPostTryCount(prev => prev + 1);
          toast.success(
            postTryCount === 1
              ? '인증번호가 전송되었어요'
              : '인증번호가 재전송되었어요',
          );
          console.log(response);
        })
        .catch(function (error) {
          setPostTryCount(prev => prev + 1);
          toast.error('인증번호 발송중에 오류가 발생했어요');
          console.log(error);
        });
    } else {
      toast.error('인증번호 재전송까지 시간이 남았어요');
    }
  };

  return (
    <S.VerifyFormWrapper>
      <S.VerifyForm onSubmit={handleSubmit(onSubmit)}>
        <S.VerifyFormHeader>멘토 등록</S.VerifyFormHeader>
        <S.EmailButtonWrapper>
          <S.Input {...register('digit')} placeholder="숫자 6자리 인증번호" />
          <S.EmailButton
            type="button"
            onClick={() => onPostEmail()}
            css={
              !isPostable &&
              css`
                background-color: ${pallete.scheme.darkgray};
              `
            }
          >
            {!isPostable && (
              <CountdownCircleTimer
                isPlaying
                duration={resendEmailDuration}
                colors={pallete.scheme.warning}
                trailColor={pallete.scheme.gray}
                strokeWidth={4}
                size={34}
                onComplete={() => setIsPostable(true)}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            )}
            {postTryCount === 0 ? '인증번호 전송' : '인증번호 재전송'}
          </S.EmailButton>
        </S.EmailButtonWrapper>
        <S.ButtonWrapper>
          <S.CancelButton
            onClick={() => setVerifyFormVisible(false)}
            type="button"
          >
            취소
          </S.CancelButton>
          <S.Submit type="submit" value={'인증'} />
        </S.ButtonWrapper>
      </S.VerifyForm>
    </S.VerifyFormWrapper>
  );
};
