import View from "ol/View.js";
import { OSM, TileWMS, Vector as VectorSource, WMTS, BingMaps } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import GeoJSON from 'ol/format/GeoJSON.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import GoogleLayer from 'olgm/layer/Google.js';
import { Projection } from 'ol/proj.js';

let geoserverBaseURL = "http://52.60.124.109:8080/geoserver/gazar/wms";

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

var projection = new Projection({
  code: 'EPSG:4326',
  units: 'degrees',
  axisOrientation: 'neu',
  global: true
});

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

export let pointsLayer = new TileLayer({
  visible: false,
  id: 1,
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

export let pointsLayer2 = new TileLayer({
  visible: true,
  id: 4,
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

export let pointsLayer3 = new TileLayer({
  visible: false,
  id: 5,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      "VERSION": "1.1.1",
      tiled: true,
      LAYERS: "gazar:g106_p"
    },
    serverType: 'geoserver'
  })
});

export let pointsLayer4 = new TileLayer({
  visible: false,
  id: 6,
  source: new TileWMS({
    url: geoserverBaseURL,
    params: {
      "VERSION": "1.1.1",
      tiled: true,
      LAYERS: "gazar:mn_adminbndry_salb_updated2019"
    },
    serverType: 'geoserver'
  })
});

export let linesLayer = new VectorLayer({
  visible: false,
  title: 'Countries',
  id: 2,
  source: new VectorSource({
    url: 'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
    format: new GeoJSON()
  })
});

export let drawSource = new VectorSource({
  wrapX: false
})

export let drawLayer = new VectorLayer({
  visible: false,
  title: 'Draw',
  id: 3,
  source: drawSource,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});

export let basemaps = [
  googleMap,
  openStreeMap
];

export let layers = [
  pointsLayer,
  pointsLayer2,
  pointsLayer3,
  pointsLayer4,
  linesLayer,
  drawLayer
];

export function setLayerVisible(layer, visible) {
  console.log('layer', layer)
  if (layer != undefined) {
    layers[layer].setVisible(visible);
  }
}
