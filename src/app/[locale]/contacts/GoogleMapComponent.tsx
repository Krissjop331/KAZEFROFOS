import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const center = [55.7558, 37.6176];

function YandexMapComponent() {
  return (
    <YMaps>
      <Map defaultState={{ center: center, zoom: 10 }} width="100%" height="100%">
        <Placemark geometry={center} />
      </Map>
    </YMaps>
  )
}

export default React.memo(YandexMapComponent);