import {
  CustomOverlayMap,
  MapMarker,
  MarkerClusterer,
  useMap,
} from 'react-kakao-maps-sdk';

import { CustomMapMarker } from 'components/CustomMapMarker';
import useMapLevel from 'hooks/use-map-level';
import { useWindowSize } from 'hooks/use-window-size';

interface MarkerListComponentProps {
  markers: any[];
}

export const MarkerListComponent: React.FC<MarkerListComponentProps> = ({
  markers,
}) => {
  const map = useMap();
  const level = useMapLevel(map);
  const { width } = useWindowSize();

  const panTo = (lat: number, lng: number) => {
    if (map) {
      const moveCoord = new kakao.maps.LatLng(lat, lng);

      map.setLevel(3);
      map.panTo(moveCoord);
    }
  };

  return (
    <MarkerClusterer
      averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel={10} // 클러스터 할 최소 지도 레벨
    >
      {markers.map(marker =>
        level <= 3 && width && width >= 500 ? (
          <CustomOverlayMap
            key={`${marker.position.lat}-${marker.position.lng}`}
            position={marker.position}
          >
            <CustomMapMarker
              companyName={marker.name}
              companyUri={marker.homepageUri}
              imageUri={marker.companyImgUri}
            />
          </CustomOverlayMap>
        ) : (
          <MapMarker
            key={`${marker.position.lat}-${marker.position.lng}`}
            position={marker.position}
            onClick={() => panTo(marker.position.lat, marker.position.lng)}
          />
        ),
      )}
    </MarkerClusterer>
  );
};
