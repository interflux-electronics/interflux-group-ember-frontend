import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'interflux-group/config/environment';

export default class MemberSlideComponent extends Component {
  @service window;

  @tracked map;

  @action
  async onInsertMap(element) {
    const company = this.args.company;
    const country = company.country.get('id');

    // [Log] BE – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] SG – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] CN – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] CN – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] CN – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] CN – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] SE – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] NO – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] DK – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] EE – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] PL – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] FR – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] AU – {CN: 3, BE: 5, SG: 5} (app.js, line 920)
    // [Log] MX – {CN: 3, BE: 5, SG: 5} (app.js, line 920)

    const map = {
      CN: 1.7,
      BE: 5,
      SG: 8,
      SE: 3.5,
      NO: 3.5,
      DK: 4.5,
      EE: 4,
      PL: 4,
      FR: 4,
      AU: 2,
      MX: 3.2
    };
    const zoom = map[country] || 1;
    console.log(country, zoom);
    const options = {
      accessToken: ENV.mapboxAccessToken,
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      container: element,
      center: { lon: company.longitude, lat: company.latitude },
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

    // Wait for Mapbox JS to be parsed
    while (!window.mapboxgl) {
      await this.window.delay(100);
    }

    // Render the map
    this.map = new window.mapboxgl.Map(options);

    // Wait for the map to be loaded
    this.map.on('load', () => {
      this.addMarker(company);
    });
  }

  addMarker(company) {
    const marker = document.querySelector(`#marker-for-${company.slug}`);
    const shadow = document.querySelector(`#shadow-for-${company.slug}`);

    new window.mapboxgl.Marker({ anchor: 'bottom', element: shadow })
      .setLngLat({ lon: company.longitude, lat: company.latitude })
      .addTo(this.map);

    new window.mapboxgl.Marker({ anchor: 'bottom', element: marker })
      .setLngLat({ lon: company.longitude, lat: company.latitude })
      .addTo(this.map);
  }
}
