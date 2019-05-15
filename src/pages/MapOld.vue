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
                  <v-list-tile-title>LandGIS</v-list-tile-title>
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
          <v-card-text>
            <v-tabs color="transparent">
              <v-tab href="#tab-1">Хайлт</v-tab>
              <!-- <v-tab href="#tab-3">Хайлт</v-tab> -->
              <v-tab href="#tab-2">Уртраг/Өргөрөг</v-tab>
              <v-tabs-slider color="green"></v-tabs-slider>

              <v-tab-item value="tab-1">
                <v-form ref="formSearch" v-model="valid" lazy-validation>
                  <v-container class="px-0">
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-combobox 
                          v-model="filter.aimag" 
                          :items="aimag" 
                          item-value="adm1cd" 
                          item-text="adm1nm_mn" 
                          label="Аймаг"
                          @change="getSum()"></v-combobox>
                      </v-flex>
                      <v-flex xs6>
                        <v-combobox 
                          v-model="filter.sum" 
                          :items="sum" 
                          item-value="adm2cd" 
                          item-text="adm2nm_mn" 
                          label="Сум"></v-combobox>
                      </v-flex>
                      <v-flex xs6>
                        <v-btn dark color="green darken-2" round class="ma-0" @click="submitSearch()">Хайх</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-tab-item>
              <!-- <v-tab-item value="tab-3">
                <v-form ref="formSearch" v-model="valid" lazy-validation>
                  <v-container class="px-0">
                    <v-layout row wrap>
                      <v-flex xs8>
                        <v-text-field
                          v-model="address"
                          label="Хот юмуу хаяг оруулах..."
                          solo
                          :rules="lldRules" 
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-btn dark color="green darken-2" round class="ma-0" @click="submitSearch()">Хайх</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-tab-item> -->
              <v-tab-item value="tab-2">
                <v-form ref="formLatLong" v-model="valid" lazy-validation>
                  <v-container class="px-0">
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-text-field v-model="latitude" label="Уртраг" solo :rules="lldRules" required></v-text-field>
                      </v-flex>
                      <v-flex xs6> 
                        <v-text-field v-model="longitude" label="Өргөрөг" solo :rules="lldRules" required></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-btn dark color="green darken-2" round class="ma-0" @click="submitLatLong()">Хайх</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
        <v-card class="mb-2" v-if="!mini">
          <v-card-text>
            <v-list>
              <template v-for="(layer, index) in layerList">
                <v-list-tile :key="index" @click="changeLayers(layer)">
                  <v-list-tile-action>
                    <v-switch
                      v-model="layer.selected"
                      hide-details
                      color="green lighten-2"
                    ></v-switch>
                  </v-list-tile-action>

                  <v-list-tile-content @click="layer.selected = !layer.selected">
                    <v-list-tile-title>{{ layer.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="layer.name" v-if="layerList.length - 1 > index"></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card v-if="!mini">  
          <v-card-text>     
            <div class="title">Нийт урт: {{ formatArea(totalLength) }}</div>
            <v-divider class="my-3"/>
            <v-btn
              dark
              color="green darken-2"
              round
              outline
              @click="removeInteraction"
              >Арилгах
            </v-btn>
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
          <div class="subheading font-weight-medium">{{ pointInfo.point_name}}</div>
          <v-spacer />
          <v-icon color="green darken-4" @click="closeOverlay">close</v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text class="body-1">
          Цэгийн код: {{ pointInfo.pid }}
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
    </div>
  </v-app>
</template>

<script>
import aimagJSON from '../json/aimag.json'
import sumJSON from '../json/sum.json'
var geoconfig = require("./../geo_config_old");
import { layers, basemaps } from "./../geo_config_old";
import axios from "axios";

import OLGoogleMaps from "olgm/OLGoogleMaps.js";
import GoogleLayer from "olgm/layer/Google.js";
import { defaults as defaultInteractions } from "olgm/interaction.js";
import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import Circle from "ol/geom/Circle.js";
import { Group as LayerGroup } from "ol/layer.js";
import { Fill, Stroke, Style } from "ol/style.js";
import View from "ol/View.js";
import {
  defaults as defaultControls,
  FullScreen,
  OverviewMap
} from "ol/control.js";
import {get as getProjection } from 'ol/proj.js';
import { getCenter } from 'ol/extent.js';
import { Draw, Modify } from "ol/interaction.js";
import Overlay from 'ol/Overlay.js';

export default {
  data() {
    return {
      aimag: aimagJSON,
      sumTemp: sumJSON,
      loading: false,
      sum: [],
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
      layerList: [
        {
          name: "Цэгэн мэдээлэл",
          selected: false,
          id: 1
        },
        {
          name: "Цэгэн мэдээлэл 2",
          selected: true,
          id: 4
        },
        {
          name: "Цэгэн мэдээлэл 3",
          selected: false,
          id: 5
        },
        {
          name: "Сумдууд",
          selected: false,
          id: 6
        },
        {
          name: "Улсууд",
          selected: false,
          id: 2
        },
        {
          name: "Зурах",
          selected: false,
          id: 3
        }
      ],
      maps: [
        { text: "Google", key: "Google" },
        { text: "Open Street", key: "OpenStreet" }
      ],
      mapSelect: "Google",
      draw: null,
      source: null,
      typeSelect: "LineString",
      totalLength: 0,
      valid: true,
      lldRules: [ v => !!v || 'Required'],
      view: null,
      layerIndex: 1,
      pointInfo: null,
      popup: null,
      visible: false,
      overlay: null
    };
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
      geoconfig.googleMap.setVisible(!geoconfig.googleMap.getVisible());
      geoconfig.openStreeMap.setVisible(!geoconfig.openStreeMap.getVisible());
    },
    changeLayers(item) {
      let layerIndex = null;
      geoconfig.layers.forEach(function(layer, index) {
        if (layer.values_ != undefined && layer.values_.id == item.id) {
          layerIndex = index;
        }
      });

      if (layerIndex > -1) {
        this.layerIndex = layerIndex
        geoconfig.layers[layerIndex].setVisible(item.selected);
      }
      if (item.id == 3 && item.selected == true) {
        // console.log('if')
        this.typeSelect = "LineString";
        this.removeInteraction();
      } else {
        // console.log('else')
        this.typeSelect = "None";
        this.removeInteraction();
      }
    },
    removeInteraction() {
      this.map.removeInteraction(this.draw);
      this.addInteraction();
    },
    addInteraction() {
      if (this.typeSelect !== "None") {
        this.draw = new Draw({
          source: geoconfig.drawSource,
          type: this.typeSelect
        });

        this.map.addInteraction(this.draw);

        this.createMeasure();
      }
    },
    createMeasure() {
      let vm = this;
      vm.draw.on("drawstart", function(ev) {
        // geoconfig.drawLayer.getSource().clear();

        ev.feature.on("change", function(event) {
          var measurement = event.target.getGeometry().getLength();
          // var measurementFormatted = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';
          vm.totalLength = measurement;
        });
      });
    },
    formatArea(measurement) {
      return measurement > 100
        ? (measurement / 1000).toFixed(2) + "km"
        : measurement.toFixed(2) + "m";
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

      this.map = new Map({
        interactions: defaultInteractions(),
        controls: defaultControls().extend([
          new FullScreen()
        ]),
        layers: [
          geoconfig.googleMap,
          geoconfig.openStreeMap,
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
    },
    handleMoveEnd() {
      this.updateLayerVisibility();
    },
    updateLayerVisibility() {
      if (this.zoom !== this.map.getView().getZoom()) {
        this.zoom = this.map.getView().getZoom();

        if (this.zoom <= 7) {
          this.layerList[1].selected = false
          geoconfig.layers[1].setVisible(false)
          this.layerList[3].selected = true
          geoconfig.layers[3].setVisible(true)
          this.layerIndex = 3
        } else if (this.zoom > 7 && this.zoom < 11) {
          geoconfig.layers[1].setVisible(true)
          this.layerList[1].selected = true
          geoconfig.layers[3].setVisible(false)
          this.layerList[3].selected = false
          this.layerIndex = 1
        }
      }
    },
    handleMapClick(event) {
      var view = this.map.getView();
      var viewResolution = view.getResolution();
      // var source = geoconfig.layers[1].getSource();
      var source = geoconfig.layers[this.layerIndex].getSource()
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

              // var popup = new Overlay({
              //   autoPan: true,
              //   autoPanAnimation: {
              //     duration: 250
              //   },
              //   element: document.getElementById('popup'),
              //   positioning: 'bottom-center',
              //   position: event.coordinate
              // });

              this.overlay.setPosition(event.coordinate)

              this.visible = true
            } else {
              this.visible = false
              this.popup = null
            }
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

        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${vm.Latitude},${vm.longitude}&key=c4ac603702ae419597108bb597a280fd&language=en&pretty=1`).then( response => {
          console.log('response', response)
          let data = response.data

          if (data != null && data != undefined) {
            let result = data.results[0]
            // let geometry = result.geometry
            let geometry = result.annotations.Mercator
            if (geometry != undefined) {
              vm.view.animate({zoom: 7}, {center: [geometry.x, geometry.y]})
            }
          }
        })
      }
    },
    submitSearch() {
      let vm = this

      if (vm.$refs.formSearch.validate()) {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${vm.address}&key=c4ac603702ae419597108bb597a280fd&language=en&pretty=1`).then( response => {
          let data = response.data

          console.log('data', data)

          if (data != null && data != undefined) {
            let result = data.results[0]
            // let geometry = result.geometry
            // if (geometry != undefined) {

            //   var newProj = getProjection('EPSG:4326');
            //   var newProjExtent = newProj.getExtent();

            //   console.log('newProj', newProj)
            //   console.log('newProjExtent', newProjExtent)

            //   var newView = new View({
            //     projection: newProj,
            //     center: getCenter(newProjExtent || [0, 0, 0, 0]),
            //     zoom: 7,
            //     extent: newProjExtent || undefined
            //   });

            //   vm.map.setView(newView);
            // }
            let geometry = result.annotations.Mercator
            if (geometry != undefined) {
              vm.view.animate({zoom: 7}, {center: [geometry.x, geometry.y]})
            }
          }
        })
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
  right: .5em;
  bottom: 1.5em;
}
.ol-full-screen{
  top: inherit;
  bottom: 6em;
}
</style>
