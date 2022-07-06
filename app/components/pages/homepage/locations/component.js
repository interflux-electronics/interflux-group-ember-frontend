import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PagesHomepageLocationsComponent extends Component {
  @service window;

  @tracked map;

  @action
  onInsertMap() {
    this.waitForMapBoxReady();
  }

  async waitForMapBoxReady() {
    let ready = false;

    while (!ready) {
      if (window.mapboxgl) {
        ready = true;
        this.renderMap();
      }
      await this.window.delay(100);
    }
  }

  async renderMap() {
    window.mapboxgl.accessToken =
      'pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug';

    const map = new window.mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center: { lon: 15, lat: 30 },
      zoom: 1.5,
      pitchWithRotate: false,
      touchPitch: false,
      touchZoomRotate: false,
      dragRotate: false,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      cooperativeGestures: false,
      dragPan: false
    });

    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    this.map = map;

    const nav = new window.mapboxgl.NavigationControl({
      visualizePitch: false,
      showCompass: false,
      showZoom: false
    });
    this.map.addControl(nav, 'bottom-right');

    // companies.map((company) => {
    //   const marker = document.querySelector(`#marker-for-${company.slug}`);
    //   const shadow = document.querySelector(`#shadow-for-${company.slug}`);
    //
    //   new window.mapboxgl.Marker({ anchor: 'bottom', element: shadow })
    //     .setLngLat({ lon: company.longitude, lat: company.latitude })
    //     .addTo(this.mapbox.map);
    //
    //   new window.mapboxgl.Marker({ anchor: 'bottom', element: marker })
    //     .setLngLat({ lon: company.longitude, lat: company.latitude })
    //     .addTo(this.mapbox.map);
    // });
  }
}
