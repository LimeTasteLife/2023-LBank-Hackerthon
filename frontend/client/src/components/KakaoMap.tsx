import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {  LbankSeriesExample } from '../constants';
import Image from 'next/image';

interface KakaoMapProps {
  width?: string;
  height?: string;
  level: number;
  draggable: boolean;
  zoomable: boolean;
}

const KakaoMap = ({
  width,
  height,
  level,
  draggable,
  zoomable,
}: KakaoMapProps) => {
  return (
    <Map
      center={{ lat: 37.56673760000001, lng: 126.8833964 }}
      style={{ width: width, height: height, borderRadius: '20px' }}
      level={level}
      draggable={draggable}
      zoomable={zoomable}
    >
      <MapMarker
        position={{
          lat: LbankSeriesExample[0].lat,
          lng: LbankSeriesExample[0].lng,
        }}
        image={{
          src: '/checkSign.svg',
          size: {
            width: 64,
            height: 64,
          },
          options: {
            offset: {
              x: 27,
              y: 69,
            },
          },
        }}
      >
        <div
          style={{
            color: '#000',
            padding: 0,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
            alignItems: 'center',
            marginTop: '-150px',
          }}
        >
          <Image
            src='/Lbank/lbank1.png'
            width={150}
            height={100}
            alt='example'
            objectFit=''
           
          />

          {LbankSeriesExample[0].label}
        </div>
      </MapMarker>
      <MapMarker
        position={{
          lat: LbankSeriesExample[2].lat,
          lng: LbankSeriesExample[2].lng,
        }}
        image={{
          src: '/checkSign.svg',
          size: {
            width: 64,
            height: 64,
          },
          options: {
            offset: {
              x: 27,
              y: 69,
            },
          },
        }}
      >
       <div
          style={{
            color: '#000',
            padding: 0,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
            alignItems: 'center',
            marginTop: '-150px',
          }}
        >
          <Image
            src='/Lbank/lbank3.png'
            width={150}
            height={100}
            alt='example'
            objectFit=''
           
          />

          {LbankSeriesExample[2].label}
        </div>
      </MapMarker>
      <MapMarker
        position={{
          lat: LbankSeriesExample[3].lat,
          lng: LbankSeriesExample[3].lng,
        }}
      >
        <div
          style={{
            color: '#000',
            padding: 0,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
            alignItems: 'center',
            marginTop: '-150px',
          }}
        >
          <Image
            src='/Lbank/lbank2.png'
            width={150}
            height={100}
            alt='example'
            objectFit=''
           
          />

          {LbankSeriesExample[3].label}
        </div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;

// width={1440} 37.75373760000001, lng: 126.4833964
//           height={580}
//           className="w-full object-cover object-center 2xl:rounded-5xl"
