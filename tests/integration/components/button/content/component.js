import Component from '@glimmer/component';

// TODO: convert to Typescript
//
// interface <Args> {
//   text?: string;
//   icon?: string;
// }

export default class ButtonContentComponent extends Component {
  get iconIsValid() {
    const valid = ['chevron-right', 'chevron-left'].includes(this.args.icon);

    if (!valid) {
      console.warn(
        `<Button @icon="${this.args.icon}"> cannot be rendered. Invalid icon.`
      );
    }

    return valid;
  }
}
