import { useCallback } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

import useCoord from 'hooks/use-coord';
import { Button } from 'components/common/Button';
import { WorkerProfileImage } from 'components/common/WorkerProfileImage';
import { Tooltip } from 'components/common/Tooltip';

import * as S from './WorkerCard.styles';
import { CheckBadge } from 'assets/icons/CheckBadge';

interface WorkerCardProps {
  name: string;
  githubLoginId: string;
  email: string;
  introduction: string;
  profileImgUri: string;
  devYear: number;
  position: string;
  userType: 'WORKER' | 'MENTOR';
  companyLink: string;
  companyName: string;
  location: string;
}

export const WorkerCardComponent: React.FC<WorkerCardProps> = ({
  name,
  githubLoginId,
  email,
  introduction,
  profileImgUri,
  devYear,
  position,
  companyLink,
  companyName,
  location,
  userType,
}) => {
  const map = useMap();
  const [lat, lng] = useCoord(map, location);

  const subString = useCallback((str: string, n: number): string => {
    return str?.length > n ? `${str.substring(0, n)}...` : str;
  }, []);

  const panTo = (lat: number, lng: number) => {
    if (map) {
      const moveCoord = new kakao.maps.LatLng(lat, lng);

      map.setLevel(3);
      map.panTo(moveCoord);
    }
  };

  return (
    <S.WorkerCard>
      <S.ProfileWrapper>
        <a
          target="_blank"
          href={`https://github.com/${githubLoginId}`}
          rel="noreferrer"
        >
          <WorkerProfileImage
            imageUri={profileImgUri}
            alt={`${name}님의 프로필 사진`}
          />
        </a>
        <S.ProfileParagraph>
          <S.NameBadgeWrapper>
            <S.Name>{subString(name, 10)}</S.Name>
            {userType === 'MENTOR' && (
              <Tooltip label="인증받은 멘토에요">
                <span>
                  <CheckBadge />
                </span>
              </Tooltip>
            )}
          </S.NameBadgeWrapper>
          <S.Email href={`mailto:${email}`}>{subString(email, 25)}</S.Email>
          <S.CompanyLink
            href={companyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {subString(companyName, 18)}
          </S.CompanyLink>
        </S.ProfileParagraph>
      </S.ProfileWrapper>
      {!!introduction && (
        <S.IntroduceCard>
          <S.WorkerPosition>{`${devYear}년차 ${position}`}</S.WorkerPosition>
          <p>{introduction}</p>
        </S.IntroduceCard>
      )}
      <S.WorkerButtonWrapper>
        <Button
          onClick={() => {
            if (lat && lng) panTo(lat, lng);
          }}
        >
          회사 위치
        </Button>
      </S.WorkerButtonWrapper>
    </S.WorkerCard>
  );
};
