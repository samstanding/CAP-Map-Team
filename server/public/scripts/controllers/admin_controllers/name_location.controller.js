capApp.controller('NameLocationController', ['UserService', 'AdminService','$routeParams', function (UserService, AdminService, $routeParams) {
    console.log('NameLocationController created');
    var self = this;

    //not sure i need this user service so commenting it out
    // self.userService = UserService;
    self.adminService = AdminService;
    
    self.locations = AdminService.locations;

    

    //also don't need this bit yet

    // self.locations.newLocation.id = $routeParams.locationid;
    // console.log('locationid:', self.locations.newLocation.id);

    self.saveLocationName = AdminService.saveLocationName;
}]);a