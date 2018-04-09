capApp.controller('IndividualLocationController', ['UserService', 'AdminService', '$routeParams', function (UserService, AdminService, $routeParams) {
    console.log('IndividualLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.indLocation = AdminService.indLocation;
    self.getIndividualLocation = AdminService.getIndividualLocation;

    let locationid = $routeParams.locationid;
    self.getIndividualLocation(locationid);
}]);