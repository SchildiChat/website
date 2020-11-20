// see: https://axiacore.com/blog/check-if-item-array-handlebars-547/
ifInHelper = function(elem, list, options) {
  if(list.indexOf(elem) > -1) {
    return options.fn(this);
  }
  return options.inverse(this);
}

module.exports = ifInHelper;
