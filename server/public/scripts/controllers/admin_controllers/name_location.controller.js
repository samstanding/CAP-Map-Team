capApp.controller('NameLocationController', ['UserService', 'AdminService','$routeParams', function (UserService, AdminService, $routeParams) {
    console.log('NameLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
        
    self.locations = AdminService.locations;

    self.locations.newLocation.id = $routeParams.locationid;
    console.log('locationid:', self.locations.newLocation.id);

    self.saveLocationName = AdminService.saveLocationName;
}]);