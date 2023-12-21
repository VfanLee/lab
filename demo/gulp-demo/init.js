require.config({
  baseUrl: '.',
  paths: {
    ko: ['https://cdn.jsdelivr.net/npm/knockout@3.5.1/build/output/knockout-latest.min', './common/vendor/knockout-3.5.1/knockout.min'],
    jquery: ['https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min', './common/vendor/jquery-1.12.4/jquery.min'],
    bootstrap: ['https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min', './common/vendor/bootstrap-3.4.1/js/bootstrap.min'],
    director: ['https://cdn.jsdelivr.net/npm/director@1.2.8/build/director.min'],
    lodash: ['https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min'],
    appViewModel: './appViewModel'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: '$'
    }
  }
})

require(['ko', 'appViewModel', 'jquery', 'bootstrap'], function (ko, appViewModel) {
  ko.applyBindings(new appViewModel())
})
