capApp.controller('IndividualLocationController', ['UserService', 'AdminService', '$routeParams', '$sce', function (UserService, AdminService, $routeParams, $sce) {
    console.log('IndividualLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.indLocation = AdminService.indLocation;
    self.getIndividualLocation = AdminService.getIndividualLocation;

    let locationid = $routeParams.locationid;
    self.getIndividualLocation(locationid);

    self.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }

}]);