capApp.controller('IndividualLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('IndividualLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.getIndividualLocation = AdminService.getIndividualLocation;

    let locationid = $routeParams.locationid;
    self.getIndividualLocation(locationid);
}]);