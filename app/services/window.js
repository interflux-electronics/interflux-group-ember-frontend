import Service from '@ember/service';

export default class WindowService extends Service {
  delay(ms) {
    if (this.isFastBoot) {
      return new Promise((approve) => {
        approve();
      });
    }

    return new Promise((approve) => {
      window.setTimeout(approve, ms);
    });
  }
}
