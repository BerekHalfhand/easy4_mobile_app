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