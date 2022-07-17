import Service from '@ember/service';

export default class WindowService extends Service {
  delay(ms) {
    if (this.isFastBoot) {
      return new Promise((resolve) => {
        resolve();
      });
    }

    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
}
