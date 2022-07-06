import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'interflux-group/config/environment';

export default class PagesHomepageLocationsComponent extends Component {
  @service store;
  @service window;

  @tracked map;
  @tracked companies;

  @action
  onInsertMap() {
    this.waitForMapBoxReady();
    this.loadCompanies();
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
    const map = new window.mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug',
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center: { lon: 15, lat: 30 },
      zoom: 1.5,
      boxZoom: false,
      cooperativeGestures: false,
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: false,
      touchPitch: false,
      touchZoomRotate: false
    });

    this.map = map;

    this.addMarkers();
  }

  async loadCompanies() {
    if (ENV.isTest) {
      return;
    }
    this.companies = await this.store.query('company', {
      filter: { businessName: '~*Interflux' }
    });
    this.addMarkers();
  }

  addMarkers() {
    if (this.map && this.companies) {
      this.companies.forEach((company) => {
        new window.mapboxgl.Marker()
          .setLngLat({ lon: company.longitude, lat: company.latitude })
          .addTo(this.map);
        // const marker = document.querySelector(`#marker-for-${company.slug}`);
        // const shadow = document.querySelector(`#shadow-for-${company.slug}`);
        //
        // new window.mapboxgl.Marker({ anchor: 'bottom', element: shadow })
        //   .setLngLat({ lon: company.longitude, lat: company.latitude })
        //   .addTo(this.mapbox.map);
        //
        // new window.mapboxgl.Marker({ anchor: 'bottom', element: marker })
        //   .setLngLat({ lon: company.longitude, lat: company.latitude })
        //   .addTo(this.mapbox.map);
      });
    }
  }
}
