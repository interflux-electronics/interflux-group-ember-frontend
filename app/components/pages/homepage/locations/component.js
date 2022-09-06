import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'interflux-group/config/environment';

export default class PagesHomepageLocationsComponent extends Component {
  @service window;
  @service media;

  @tracked map;
  @tracked inView = false;

  get options() {
    const zoom = this.media.isWidescreen ? 1.5 : 1.3;

    return {
      accessToken: ENV.mapboxAccessToken,
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center: { lon: 20, lat: 30 },
      zoom,
      boxZoom: false,
      cooperativeGestures: false,
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: false,
      touchPitch: false,
      touchZoomRotate: false
    };
  }

  @action
  async onInsert() {
    // Wait for Mapbox JS to be parsed
    while (!window.mapboxgl) {
      await this.window.delay(100);
    }

    // Render the map
    this.map = new window.mapboxgl.Map(this.options);

    // Wait for the map to be loaded
    this.map.on('load', () => {
      this.showMarkersOnceInView();
    });
  }

  async showMarkersOnceInView() {
    while (!this.inView) {
      await this.window.delay(100);
    }

    this.args.companies.forEach((company, i) => {
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

  @action onFirstView() {
    this.inView = true;
  }
}
