<template>
  <v-app id="app">
    <div id="map"></div>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      permanent
      absolute
      width="380"
      class="grey lighten-4"
      >
      <div class="ma-2">
        <v-card class="mb-2">
          <v-card-text class="pa-1">
            <v-list class="pa-0">
              <v-list-tile v-if="mini" @click.stop="mini = !mini">
                <v-list-tile-action>
                  <v-icon>chevron_right</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile avatar v-if="!mini">
                <v-list-tile-avatar>
                  <img src="/static/logo.png" class="logo" alt="LangGIS">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Цэг, тэмдэгтийн мэдээлэл</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mb-2" v-if="!mini">
          <v-card-title class="pb-0">
            <div class="subheading">Дэвсгэр зургийн загвар сан</div>
            <v-spacer />
          </v-card-title>
          <v-card-text class="pt-0">
            <v-form ref="formRefName" v-model="valid" lazy-validation>
              <v-container class="px-0 pb-0">
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-combobox 
                      v-model="ref_names" 
                      :items="refNames"
                      label="Сонгох..."
                      :rules="lldRules" 
                      required></v-combobox>
                  </v-flex>
                  <v-flex xs4 class="text-xs-right mt-3">
                    <v-btn dark color="green darken-2" round class="ma-0" @click="submitRefNames()">Хайх</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              
            </v-form>
          </v-card-text>
        </v-card>
        <v-card class="mb-2" v-if="!mini">
          <v-card-text>
            <v-tabs
              fixed-tabs
              v-model="tabs"
              slider-color="green darken-2"
              color="transparent"
            >
              <v-tab href="#tab-1">Уртраг/Өргөрөг</v-tab>
              <v-tab href="#tab-2">Аймаг сум</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs" class="white">
              <v-tab-item key="tab-1" value="tab-1">
                <v-form ref="formLatLong" v-model="valid" lazy-validation>
                  <v-container class="px-0 pb-0">
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-text-field v-model="latitude" label="Уртраг" :rules="lldRules" required></v-text-field>
                      </v-flex>
                      <v-flex xs6> 
                        <v-text-field v-model="longitude" label="Өргөрөг" :rules="lldRules" required></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field v-model="radius" label="Радиус" :rules="lldRules" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 class="text-xs-center mt-3">
                        <v-btn dark color="green darken-2" round class="ma-0" @click="submitLatLong()">Хайх</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-tab-item>
              <v-tab-item key="tab-2" value="tab-2">
                <v-form ref="formSearch" v-model="valid" lazy-validation>
                  <v-container class="pa-0">
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-combobox 
                          v-model="filter.aimag" 
                          :items="aimag" 
                          item-value="adm1cd" 
                          item-text="adm1nm_mn" 
                          label="Аймаг"
                          :rules="lldRules" 
                          required
                          @change="getSum()"></v-combobox>
                      </v-flex>
                      <v-flex xs6>
                        <v-combobox 
                          v-model="filter.sum" 
                          :items="sum" 
                          item-value="adm2cd" 
                          item-text="adm2nm_mn"
                          :rules="lldRules"
                          required 
                          label="Сум"></v-combobox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
                <v-btn dark color="green darken-2" round class="ma-0" @click="submitSearch()">Хайх</v-btn>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
        
        <!-- <v-card class="mb-2" v-if="!mini">
          <v-card-title class="pb-0">
            <div class="subheading">Уртраг/Өргөрөг</div>
            <v-spacer />
            <v-btn dark color="green darken-2" round class="ma-0" @click="submitLatLong()">Хайх</v-btn>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-form ref="formLatLong" v-model="valid" lazy-validation>
              <v-container class="px-0 pb-0">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-text-field v-model="latitude" label="Уртраг" :rules="lldRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs6> 
                    <v-text-field v-model="longitude" label="Өргөрөг" :rules="lldRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs6> 
                    <v-text-field v-model="radius" label="Радиус" :rules="lldRules" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card> -->
        <v-card class="mb-2" v-if="!mini">
          <v-card-text>
            <v-list class="small">
              <template v-for="(layer, index) in layerList">
                <v-list-tile :key="index" @click="changeLayers(layer)">
                  <v-list-tile-action>
                    <v-switch
                      v-model="layer.values_.visible"
                      hide-details
                      color="green lighten-2"
                    ></v-switch>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ layer.values_.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="layer.values_.name" v-if="layerList.length - 1 > index"></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>     
      </div>
      <div class="panel-toggle-container">
        <div class="panel-toggle" v-on:click="drawer = !drawer">
          <v-icon @click="drawer = !drawer">arrow_left</v-icon>
        </div>
      </div>
    </v-navigation-drawer>

    <div id="popup" class="feature-popup overlay" :class="overlayClass">
      <v-card v-if="pointInfo != null">
        <v-card-title>
          <div class="subheading font-weight-medium">Цэгийн дугаар: {{ pointInfo.point_id }}</div>
          <v-spacer />
          <v-icon color="green darken-4" @click="closeOverlay">close</v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text class="body">
          <!-- <table>
            <tr>
              <td>Цэгийн төвийн дугаар:</td>
              <td>{{ pointInfo.center_type }}</td>
            </tr>
            <tr>
              <td>Цэгийн нэр:</td>
              <td>{{ pointInfo.point_name }}</td>
            </tr>
            <tr>
              <td>Цэгийн дахин давтагдашгүй дугаар:</td>
              <td>{{ pointInfo.pid }}</td>
            </tr>
            <tr>
              <td>Сүлжээний төрөл, анги, зэрэг:</td>
              <td>{{ pointInfo.class }}</td>
            </tr>
            <tr>
              <td>Цэгийн төвийн хэлбэр:</td>
              <td>{{ pointInfo.point_type }}</td>
            </tr>
            <tr>
              <td>Шугамын дугаар:</td>
              <td>{{ pointInfo.pid }}</td>
            </tr>
            <tr>
              <td>Зургийн нэрэлбэр:</td>
              <td>{{ pointInfo.pid }}</td>
            </tr>
          </table> -->
          <p><span>Цэгийн төвийн дугаар:</span> {{ pointInfo.center_type }}</p>
          <p><span>Цэгийн нэр:</span> {{ pointInfo.point_name }}</p>
          <p><span>Цэгийн дахин давтагдашгүй дугаар:</span> {{ pointInfo.pid }}</p>
          <p><span>Сүлжээний төрөл, анги, зэрэг:</span> {{ pointInfo.class }}</p>
          <p><span>Цэгийн төвийн хэлбэр:</span> {{ pointInfo.point_type }}</p>
          <p><span>Шугамын дугаар:</span> {{ pointInfo.pid }}</p>
          <p><span>Зургийн нэрэлбэр:</span> {{ pointInfo.pid }}</p>
          <v-divider class="mb-3"/>
          <p><span>Үндсэн үнэ:</span> 4,600 ₮</p>

          <v-checkbox
            v-model="pointInfo.info" 
            label="Хувийн хэрэг (1,500 ₮)" 
            hide-details 
            color="green darken-2"></v-checkbox>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-btn color="green darken-2" :loading="loading" dark round @click="addCart(pointInfo)">Сагсанд хийх</v-btn>
          <v-btn color="red darken-2" :loading="loading" dark round @click="buyProduct(pointInfo)">Худалдан авах</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div class="main-cart">
      <cart></cart>
      <user-profile></user-profile>
    </div>

    <div class="baselayer">
      <div v-on:click="changeMap()" v-if="!mapSelect">
        <img src="/static/google.png">
        <div class="map-name">Google</div>
      </div>
      <div v-on:click="changeMap()" v-else>
        <img src="/static/openstreet.png">
        <div class="map-name">Open Street</div>
      </div>
    </div>

    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
    >
      {{ snackbarMessage }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Хаах
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import aimagJSON from '../json/aimag.json'
import sumJSON from '../json/sum.json'
import refNamesJSON from '../json/ref_names.json'
var geoconfig = require("./../geo_config");
import { layers, basemaps } from "./../geo_config";
import axios from "axios";

import OLGoogleMaps from "olgm/OLGoogleMaps.js";
import GoogleLayer from "olgm/layer/Google.js";
import { defaults as defaultInteractions } from "olgm/interaction.js";
import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import Circle from "ol/geom/Circle.js";
import { Group as LayerGroup } from "ol/layer.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import View from "ol/View.js";
import { defaults as defaultControls, FullScreen, ScaleLine } from "ol/control.js";
import { get as getProjection, transform } from 'ol/proj.js';
import { getCenter } from 'ol/extent.js';
import { Draw, Modify } from "ol/interaction.js";
import Overlay from 'ol/Overlay.js';
import { OSM, TileWMS, Vector as VectorSource, WMTS, BingMaps } from "ol/source.js";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';

export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      refNames: refNamesJSON.ref_names,
      aimag: aimagJSON,
      sumTemp: sumJSON,
      loading: false,
      sum: [],
      ref_names: 'K-48-17',
      drawer: null,
      mini: false,
      latitude: null,
      longitude: null,
      address: null,
      geoloc: null,
      filter: {
        aimag: null,
        sum: null,
      },
      map: {},
      layerList: geoconfig.layers,
      mapSelect: true,
      draw: null,
      source: null,
      typeSelect: "LineString",
      totalLength: 0,
      valid: true,
      lldRules: [ v => !!v || 'Required'],
      view: null,
      layerIndex: 2,
      pointInfo: null,
      popup: null,
      visible: false,
      overlay: null,
      radius: 100000,
      tabs: null
    }
  },
  computed: {
    overlayClass () {
      return this.visible ? 'visible' : undefined
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    getSum() {
      if (this.filter.aimag) {
        const array = this.sumTemp.filter(d => d.adm1cd == this.filter.aimag.adm1cd);

        array.sort(function (a, b) {
          return a.adm2nm_mn.localeCompare(b.adm2nm_mn);
        });
        this.sum = array
      }
    },
    addCart(item) {
      this.loading = true
      setTimeout(() => (
        this.$store.dispatch('addProduct', item),
        this.loading = false
      ), 1000)
    },
    buyProduct(item) {
      this.loading = true
      setTimeout(() => (
        this.$store.dispatch('addProduct', item),
        this.loading = false,
        this.$router.push('/cart')
      ), 1000)
    },
    changeMap() {
      this.mapSelect = !geoconfig.googleMap.getVisible()
      geoconfig.googleMap.setVisible(!geoconfig.googleMap.getVisible());
      geoconfig.openStreeMap.setVisible(!geoconfig.openStreeMap.getVisible());
    },
    changeLayers(item) {
      var obj = item.values_
      var data = obj.visible == true ? false : true
      item.setVisible(data)
    },
    initMap() {
      this.view = geoconfig.mapView

      this.overlay = new Overlay({
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        element: document.getElementById('popup'),
        positioning: 'bottom-left'
      });

      var image = new CircleStyle({
          radius: 4,
          fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
          }),
          stroke: new Stroke({color: 'red', width: 2})
        });

        var styles = {
          'Point': new Style({
            image: image
          })
        }
        var styleFunction = function(feature) {
          return styles[feature.getGeometry().getType()];
        };
      
      var vectorLayer = new VectorLayer({
        visible: true,
        style: styleFunction
      });

      this.map = new Map({
        interactions: defaultInteractions(),
        controls: defaultControls().extend([
          new FullScreen(),
          new ScaleLine()
        ]),
        layers: [
          geoconfig.googleMap,
          geoconfig.openStreeMap,
          vectorLayer,
          new LayerGroup({ layers: geoconfig.layers })
        ],
        overlays: [this.overlay],
        target: "map",
        view: this.view,
      });

      const olGM = new OLGoogleMaps({ map: this.map }); // map is the Map instance
      olGM.activate();

      this.map.on("singleclick", e => {
        this.handleMapClick(e);
      })

      this.map.on('moveend', (e) => { this.handleMoveEnd() });

      let vm = this
      vm.map.on('pointermove', function(e) {
          // if (e.dragging) { vm.closeOverlay(); return; }
          var pixel = vm.map.getEventPixel(e.originalEvent);
          var hit = vm.map.hasFeatureAtPixel(pixel);
      });
    },
    handleMoveEnd() {
      this.updateLayerVisibility();
    },
    updateLayerVisibility() {
      if (this.zoom !== this.map.getView().getZoom()) {
        this.zoom = this.map.getView().getZoom();

        // if (this.zoom <= 7) {
        //   this.layerList[1].selected = false
        //   geoconfig.layers[1].setVisible(false)
        //   this.layerList[3].selected = true
        //   geoconfig.layers[3].setVisible(true)
        //   this.layerIndex = 3
        // } else if (this.zoom > 7 && this.zoom < 11) {
        //   geoconfig.layers[1].setVisible(true)
        //   this.layerList[1].selected = true
        //   geoconfig.layers[3].setVisible(false)
        //   this.layerList[3].selected = false
        //   this.layerIndex = 1
        // }
      }
    },
    handleMapClick(event) {
      var f = this.map.forEachFeatureAtPixel(
          event.pixel,
          function(ft, layer){return ft;}
      );
      console.log('f', f)
      if (f && f.get('type') == 'click') {
          var geometry = f.getGeometry();
          var coord = geometry.getCoordinates();
          
          var content = '<p>'+f.get('desc')+'</p>';
          
          // popup.show(coord, content);
          console.log('coord', coord)
          console.log('content', content)
      } else { 

       }

      var view = this.map.getView();
      var viewResolution = view.getResolution();
      // var source = geoconfig.layers[1].getSource();
      var source = geoconfig.layers[this.layerIndex].getSource()

      console.log('event', event)

      // let coordi = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');

      this.latitude = event.coordinate[0]
      this.longitude = event.coordinate[1]
      var url = source.getGetFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        view.getProjection(),
        { INFO_FORMAT: "text/html", FEATURE_COUNT: 50 }
      );

      if (url) {
        axios.get(url).then(response => {
          if (response.data.length > 0) {
            let check = Array.isArray(response.data)
            if (check) {
              this.pointInfo = response.data[0] || null
              this.pointInfo.price = 4600
              this.pointInfo.info = false
              this.pointInfo.info_price = 1500
              this.pointInfo.total_price = 0

              this.overlay.setPosition(event.coordinate)
              this.visible = true
            } else {
              this.visible = false
              this.popup = null
            }
          } else {
            this.snackbarMessage = 'Цэг тэмдэгтийн мэдээлэл олдсонгүй'
            this.snackbar = true
          }
        });
      }
    },
    closeOverlay() {
      this.pointInfo = null; 
      this.visible = false;
      this.overlay.setPosition(undefined);
      return false;
    },
    submitLatLong() {
      let vm = this

      if (vm.$refs.formLatLong.validate()) {

        axios.get(`http://52.60.124.109:8080/webservice/rest/point/service/radius/${this.latitude}/${this.longitude}/${this.radius}`).then( response => {
          let points = response.data.points

          if (points.length > 0) {
            this.pointLayer(points, 'latlong')
          } else {
            this.snackbarMessage = 'Цэг тэмдэгтийн мэдээлэл олдсонгүй'
            this.snackbar = true
          }
        })
      }
    },
    submitSearch() {
      let vm = this
      if (vm.$refs.formSearch.validate()) {
        axios.get(`http://52.60.124.109:8080/webservice/rest/point/service/center/${this.filter.sum.adm2cd}`).then( response => {
          let data = response.data;
          vm.zoom = vm.map.getView().getZoom();

          if (data != null && data != undefined) {
            vm.view.animate({zoom: vm.zoom}, {center: [data.x, data.y]})
          }
        })
      }
    },
    submitRefNames() {
      let vm = this
      if (vm.$refs.formRefName.validate()) {
        axios.get('http://52.60.124.109:8080/webservice/rest/point/service/locations/' + vm.ref_names).then( response => {
          var points = response.data.points

          if (points.length > 0) {
            this.pointLayer(points, 'ref')
          } else {
            this.snackbarMessage = 'Цэг тэмдэгтийн мэдээлэл олдсонгүй'
            this.snackbar = true
          }
        })
      }
    },
    pointLayer(points, name) {
      var layer = this.map.getLayers()
      layer.array_[2].setSource(null)

      var features = []

      points.forEach( function(item) {
        let obj = {}
        obj.type = 'Feature'
        obj.geometry = {}
        obj.geometry.type = 'Point'
        
        if (name == 'latlong') {
          obj.geometry.coordinates = [item.st_x, item.st_y]
        } else {
          obj.geometry.coordinates = [item.x, item.y]
        }
        features.push(obj)
      })

      var obj = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857'
          }
        },
        'features': features
      }
            
      var vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(obj)
      });
      
      layer.array_[2].setSource(vectorSource)

      this.zoom = this.map.getView().getZoom();

      if (name == 'latlong') {
        this.view.animate({zoom: this.zoom}, {center: [points[0].st_x, points[0].st_y]})
      } else {
        this.view.animate({zoom: this.zoom}, {center: [points[0].x, points[0].y]})
      }
    }
  }
};
</script>

<style>
.main-cart{
  position: absolute;
  top: 25px;
  right: 25px;
}
#info{
  position: absolute;
  right: 50px;
  bottom: 50px;
}
.panel-toggle-container{
  position: absolute;
  top: 8px;
  left: 100%;
  z-index: 0;
}
.panel-toggle{
  width: 23px;
  cursor: pointer;
  height: 48px;
  background-color: rgba(255,255,255,0.9);
  border-left: 1px solid #D4D4D4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
}
#map,
#app {
  position: relative;
  height: 100vh;
}
.v-tabs__item {
  padding: 6px 25px;
}
.map-panel .v-form {
  margin-top: 25px;
}
.map-panel .v-form > .container {
  padding: 0;
}
.map-panel .v-btn {
  min-width: 80px;
}
.map-panel .display-1 {
  font-size: 28px !important;
}
.v-tabs .v-text-field.v-text-field--enclosed .v-text-field__details{
  margin-bottom: 0;
}
.feature-popup{
  position: absolute;
  left: -50px;
  bottom: 15px;
  width: 295px;
  max-width: none;
}
.overlay{
  position: relative;
  visibility: hidden;
}
.feature-popup.visible{
  visibility: visible;
}
.ol-overlay-container {
  will-change: left,right,top,bottom;
}
.ol-selectable {
  -webkit-touch-callout: default;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
#popup.feature-popup:after, #popup.feature-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
#popup.feature-popup:before {
  border-top-color: #fff;
  border-width: 12px;
  left: 50px;
  margin-left: -13px;
  z-index: 1;
}
.ol-zoom{
  left: inherit;
  top: inherit;
  right: 20px;
  bottom: 95px;
}
.ol-control{
  padding: 0;
}
.ol-control button{
  margin: 0;
  width: 28px;
  height: 28px;
  background-color: #fff;
  color: #747474;
  box-shadow: 0px 1px 4px rgba(0,0,0,0.3);
}
.ol-control button:hover{
  background-color: #fff;
  color: #000;
}
.ol-zoom button{
  font-size: 20px;
}
.ol-full-screen{
  top: inherit;
  bottom: 155px;
  right: 20px;
}
.ol-scale-line{
  right: 110px;
  bottom: 19px;
  left: inherit;
  background: rgba(255, 255, 255, 1);
  padding: 0;
}
.ol-scale-line-inner{
  box-shadow: 0px 1px 4px rgba(0,0,0,0.3);
  background-color: #fff;
  color: #222;
  padding: 4px;
  border-color: #fff;
}
.body{
  font-size: 12px;
}
.body p{
  font-weight: bold;
}
.body p span{
  font-weight: normal;
  color: rgba(0,0,0,.54);
}
.body tr{
  margin-bottom: 10px;
}
.body tr td:first-child{
  width: 150px;
}
.baselayer{
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
  border-radius: 2px;
  cursor: pointer;
}
.baselayer img{
  width: 66px;
  height: 66px;
}
.map-name{
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 11px;
  color: #fff;
  font-weight: bold;
  text-shadow: rgba(0,0,0,0.7) 0px 1px 8px;
  background-image: -webkit-linear-gradient(transparent,rgba(0,0,0,0.6));
  background-image: linear-gradient(transparent,rgba(0,0,0,0.6));
  text-indent: 3px;
  width: 100%;
  padding: 10px 0px 3px 0px;
}
.v-tabs__wrapper--show-arrows{
  margin-left: 0;
  margin-right: 0;
}
.v-tabs__item{
  padding: 6px 15px;
}
</style>
