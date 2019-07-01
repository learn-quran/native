type AlertType = 'info' | 'warn' | 'error' | 'success';

type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void,
};

class DropDown {
  static dropDown: DropdownType;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown;
  }

  static show(
    message: string,
    title: string = 'Error',
    type: AlertType = 'error',
  ) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }
}

export default DropDown;
