// @flow
type AlertType = 'info' | 'warn' | 'error' | 'success';

type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void,
};

class DropDown {
  static dropDown: DropdownType;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown;
  }

  static show(type: AlertType, title: string, message: string) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static error(message: string = 'An error occured', title?: string = 'Error') {
    if (this.dropDown) {
      this.show('error', title, message);
    }
  }

  static success(message: string, title?: string = 'Success') {
    if (this.dropDown) {
      this.show('success', title, message);
    }
  }

  static warn(message: string, title?: string = 'Warning') {
    if (this.dropDown) {
      this.show('warn', title, message);
    }
  }
}

export default DropDown;
