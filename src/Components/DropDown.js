// @flow
type AlertType = 'info' | 'warn' | 'error' | 'success';

type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void,
};

class DropDown {
  static dropDown: DropdownType;
  static t: string => string;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown;
  }

  static setTransFunc(t: string => string) {
    this.t = t;
  }

  static show(type: AlertType, title: string, message: string) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static error(
    message: string = this.t('an-error-occured'),
    title?: string = this.t('error'),
  ) {
    if (this.dropDown) {
      this.show('error', title, message);
    }
  }

  static success(message: string, title?: string = this.t('success')) {
    if (this.dropDown) {
      this.show('success', title, message);
    }
  }

  static warn(message: string, title?: string = this.t('warning')) {
    if (this.dropDown) {
      this.show('warn', title, message);
    }
  }
}

export default DropDown;
