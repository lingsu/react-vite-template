export default (value: string) => {
    if (value != '') {
      let unit = new Array('仟', '佰', '拾', '', '仟', '佰', '拾', '', '角', '分');
      const toDx = (n: string) => {
        switch (n) {
          case '0':
            return '零';
          case '1':
            return '壹';
          case '2':
            return '贰';
          case '3':
            return '叁';
          case '4':
            return '肆';
          case '5':
            return '伍';
          case '6':
            return '陆';
          case '7':
            return '柒';
          case '8':
            return '捌';
          case '9':
            return '玖';
        }
      };
      let lth = value.toString().length;
      (value as any) *= 100;
      value += '';
      let length = value.length;
      if (lth <= 8) {
        let result = '';
        for (let i = 0; i < length; i++) {
          if (i == 2) {
            result = '元' + result;
          } else if (i == 6) {
            result = '万' + result;
          }
          if (value.charAt(length - i - 1) == '0') {
            if (i != 0 && i != 1) {
              if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                result = '零' + result;
              }
            }
            continue;
          }
          result = toDx(value.charAt(length - i - 1)) + unit[unit.length - i - 1] + result;
        }
        result += result.charAt(result.length - 1) == '元' ? '整' : '';
        return result;
      } else {
        return null;
      }
    }
    return null;
  }
  