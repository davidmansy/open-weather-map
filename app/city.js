/**
 * Created by davidmansy on 26/05/15.
 */
angular
.module('OWMApp')
.controller('CityCtrl', CityCtrl);

function CityCtrl(city) {

  var vm = this;
  vm.city = city;

}