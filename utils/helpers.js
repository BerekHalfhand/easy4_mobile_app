import {styles, dP} from 'app/utils/style/styles';
import {Platform} from 'react-native';

// titles: Array('Именительный един.', 'Винительный множ.', 'Родительный множ.')
// http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
export const declOfNumRus = (n, titles) => {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

export const phoneFormat = (phone) => {
  if (!phone || typeof phone !== 'string') return null;

  String.prototype.insert = function (index, string) {
    if (index > 0)
      return this.substring(0, index) + string + this.substring(index, this.length);
    else if (index < 0)
      return this.substring(0, this.length + index) + string + this.substring(this.length + index, this.length);

    return string + this;
  };

  return phone.insert(-2, '-').insert(-5, '-').insert(-9, ') ').insert(-14, ' (').insert(0, '+');
};

export const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .slice(query.indexOf('?') + 1)
      .split('&')
      .reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {}
      )
    : {};
};

export const padding = (a, b = null, c = null, d = null) => {
  return {
    paddingTop: a,
    paddingRight: b !== null ? b : a,
    paddingBottom: c !== null ? c : a,
    paddingLeft: d !== null ? d : (b !== null ? b : a)
  };
};

export const margin = (a, b = null, c = null, d = null) => {
  return {
    marginTop: a,
    marginRight: b !== null ? b : a,
    marginBottom: c !== null ? c : a,
    marginLeft: d !== null ? d : (b !== null ? b : a)
  };
};

export const font = (fontFamily = 'Roboto', fontSize = 16, color = '#FFF', letterSpacing = 0, rest) => {
  return {
    fontFamily,
    fontSize,
    // lineHeight: fontSize,
    // height: fontSize,
    color,
    letterSpacing,
    includeFontPadding: false,
    // paddingBottom: Platform.OS === 'ios' ? 0 : fontSize/4,
    // paddingTop: Platform.OS === 'ios' ? fontSize/4 : 0,
    textAlignVertical: 'center',
    // textAlign: 'center',
    ...rest
  };
};

export const addMeta = (state, message) => {
  message._meta = {};

  message._meta.ownMessage = false;
  if (message.author === state.userId) {
    message._meta.ownMessage = true;
    message._meta.author = 'Вы';
  }
  return message;
};
