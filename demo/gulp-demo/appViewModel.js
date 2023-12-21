define(['ko'], function (ko) {
  'use strict'
  function viewModel() {
    let self = this
    self.firstName = ko.observable('aaa')
    self.firstNameCaps = ko.computed(function () {
      return self.firstName().toUpperCase()
    })
  }
  return viewModel
})
