import View from "ol/View.js";
import { OSM, TileWMS, Vector as VectorSource, WMTS, BingMaps } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import GoogleLayer from 'olgm/layer/Google.js';
import { Projection } from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';

let geoserverBaseURL = "http://52.60.124.109:8080/geoserver/gazar/wms";
var format = 'image/png';
var style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.75)'
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3
    })
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: '#ffcc33'
    })
  })
});

// var projection = new ol.proj.Projection({
//   code: 'EPSG:4326',
//   units: 'degrees',
//   axisOrientation: 'neu',
//   global: true
// });
export let mapView = new View({
  center: [11096093.931842735, 5479560.355936501],
  zoom: 10,
  // projection: projection
});

// Open Street Basemap
export let openStreeMap = new TileLayer({
  visible: false,
  source: new BingMaps({
      key: 'AjuiTz-K1RGALYtpTD5ikQXwQjDIkKGqaxBh-cNJA8BxPcdzxLyTQ4c-RInRBTE7',
      imagerySet: 'AerialWithLabels',
  })
  // source: new OSM()
});
openStreeMap.name = "OpenStreet";
openStreeMap.id = 0;

export let googleMap = new GoogleLayer({
  visible: true,
  mapTypeId: google.maps.MapTypeId.HYBRID
});
googleMap.name =  'Google';
googleMap.id = 1

export let layerGNSS = new TileLayer({
  visible: false,
  name: "GNSS-ийн сүлжээ",
  id: 2,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      "VERSION": "1.1.1",
      tiled: true,
      LAYERS: "gazar:g103_p"
    },
    serverType: 'geoserver'
  })
});

export let layerTriangle = new TileLayer({
  visible: false,
  name: "Триангуляцийн сүлжээ",
  id: 3,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      "VERSION": "1.1.1",
      tiled: true,
      LAYERS: "gazar:g104_p",
      STYLES: '',
      tilesOrigin: 87.6593017578125 + "," + 41.6463851928711
    },
    serverType: 'geoserver'
  })
});

export let layerGravimetr = new TileLayer({
  visible: false,
  name: "Гравиметрийн сүлжээ",
  id: 5,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      STYLES: '',
      LAYERS: "gazar:g106_p",
      tilesOrigin: -180 + "," + -90,
      tiled: true
    }
  })
});

export let layerSum = new TileLayer({
  visible: false,
  name: "Сумдууд",
  id: 6,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      tiled: true,
      STYLES: '',
      LAYERS: "gazar:mn_adminbndry_salb_updated2019",
      tilesOrigin: 87.5735626220703 + "," + 41.5289993286133
    }
  })
});

export let layerNomen100k = new TileLayer({
  visible: true,
  name: "Дэвсгэр зургийн загвар сан (1x100000)",
  id: 7,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      tiled: true,
      STYLES: '',
      LAYERS: "gazar:nomen_100k",
      tilesOrigin: -794370.8419 + "," + 4575761.2981
    }
  })
});

export let layerNomen100k_1 = new TileLayer({
  visible: false,
  name: "Дэвсгэр зургийн загвар сан (1x100000)",
  id: 7,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      tiled: true,
      STYLES: '',
      LAYERS: "gazar:nomen_100k_1",
      tilesOrigin: -794370.8419 + "," + 4575761.2981
    }
  })
});

export let layerNomen1m = new TileLayer({
  visible: false,
  name: "Дэвсгэр зургийн загвар сан (1x1000000)",
  id: 8,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      tiled: true,
      STYLES: '',
      LAYERS: "gazar:nomen_1m",
      tilesOrigin: -794370.8419 + "," + 4575761.2981
    }
  })
});

export let layerNomen200k = new TileLayer({
  visible: false,
  name: "Дэвсгэр зургийн загвар сан (1x200000)",
  id: 9,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      'FORMAT': format,
      "VERSION": "1.1.1",
      tiled: true,
      STYLES: '',
      LAYERS: "gazar:nomen_200k",
      tilesOrigin: -794370.8419 + "," + 4575761.2981
    }
  })
});

var geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857'
    }
  },
  'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0, 0]
      },
    },{
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [[4e6, -2e6], [8e6, 2e6]]
      }
    }, ]
}


export let layerJSON = new TileLayer({
  visible: true,
  name: "JSON",
  id: 8,
  source: new VectorSource({
    features: (new GeoJSON()).readFeatures(geojsonObject)
  })
});

export let basemaps = [
  googleMap,
  openStreeMap
];

export let layers = [
  layerGNSS,
  layerTriangle,
  layerGravimetr,
  layerSum,
  layerNomen100k,
  // layerNomen100k_1,
  layerNomen1m,
  layerNomen200k,
  // layerJSON
];

export function setLayerVisible(layer, visible) {
  if (layer != undefined) {
    layers[layer].setVisible(visible);
  }
}
