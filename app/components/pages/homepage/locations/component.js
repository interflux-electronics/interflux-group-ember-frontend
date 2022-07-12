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
    // Wait for the markers to render in the DOM.
    await this.window.delay(1);
    this.addMarkers();
  }

  async addMarkers() {
    const ready = this.map && this.companies && this.inView;
    if (!ready) {
      return;
    }
    this.companies.forEach((company, i) => {
      this.addMarker(company, i * 100);
    });
  }

  async addMarker(company, delay) {
    await this.window.delay(delay);

    const marker = document.querySelector(`#marker-for-${company.slug}`);
    const shadow = document.querySelector(`#shadow-for-${company.slug}`);

    new window.mapboxgl.Marker({ anchor: 'bottom', element: shadow })
      .setLngLat({ lon: company.longitude, lat: company.latitude })
      .addTo(this.map);

    new window.mapboxgl.Marker({ anchor: 'bottom', element: marker })
      .setLngLat({ lon: company.longitude, lat: company.latitude })
      .addTo(this.map);
  }

  @tracked inView = false;

  @action onFirstView() {
    this.inView = true;
    this.addMarkers();
  }
}
