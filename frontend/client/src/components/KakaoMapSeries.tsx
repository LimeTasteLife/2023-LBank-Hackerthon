import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { IncheonSeriesExample } from '../constants';

interface KakaoMapProps {
  latitude1?: number | string;
  longitude1?: number | string;
  latitude2?: number | string;
  longitude2?: number | string;
  latitude3?: number | string;
  longitude3?: number | string;
  latitude4?: number | string;
  longitude4?: number | string;
  lo1: any;
  lo2: any;
  lo3: any;
  lo4: any;

  setCustomValue?: (id: string, value: number) => void;
  detailPage?: boolean;
  width?: string;
  height?: string;
  level: number;
  draggable: boolean;
  zoomable: boolean;
}

const KakaoMapSeries = ({
  latitude1,
  longitude1,
  latitude2,
  longitude2,
  latitude3,
  longitude3,
  latitude4,
  longitude4,
  lo1,
  lo2,
  lo3,
  lo4,
  setCustomValue,
  detailPage = false,
  width,
  height,
  level,
  draggable,
  zoomable,
}: KakaoMapProps) => {
  const coordinates = [
    { lat: latitude1, lng: longitude1 },
    { lat: latitude2, lng: longitude2 },
    { lat: latitude3, lng: longitude3 },
    { lat: latitude4, lng: longitude4 },
  ];

  const centerLat =
    coordinates.reduce(
      (acc, current) => Number(acc!) + Number(current.lat!),
      0
    ) / coordinates.length;
  const centerLng =
    coordinates.reduce(
      (acc, current) => Number(acc!) + Number(current.lng!),
      0
    ) / coordinates.length;

  return (
    <Map
      center={{ lat: centerLat, lng: centerLng }}
      style={{ width: width, height: height, borderRadius: '20px' }}
      level={level}
      draggable={draggable}
      zoomable={zoomable}
    >
      <MapMarker
        position={{
          lat: Number(latitude1),
          lng: Number(longitude1),
        }}
      >
        <div style={{ color: '#000' }}>{lo1}</div>
      </MapMarker>
      <MapMarker
        position={{
          lat: Number(latitude2),
          lng: Number(longitude2),
        }}
      >
        <div style={{ color: '#000' }}>{lo2}</div>
      </MapMarker>
      <MapMarker
        position={{
          lat: Number(latitude3),
          lng: Number(longitude3),
        }}
      >
        <div style={{ color: '#000' }}>{lo3}</div>
      </MapMarker>
      <MapMarker
        position={{
          lat: Number(latitude4),
          lng: Number(longitude4),
        }}
      >
        <div style={{ color: '#000' }}>{lo4}</div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMapSeries;

// width={1440} 37.75373760000001, lng: 126.4833964
//           height={580}
//           className="w-full object-cover object-center 2xl:rounded-5xl"
