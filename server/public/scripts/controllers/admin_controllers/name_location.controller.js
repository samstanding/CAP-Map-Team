capApp.controller('NameLocationController',  ['UserService', 'AdminService','$routeParams', '$location', function (UserService, AdminService, $routeParams, $location) {
    console.log('NameLocationController created');
    var self = this;

    //not sure i need this user service so commenting it out
    // self.userService = UserService;
    self.adminService = AdminService;
    
    self.locations = AdminService.locations;

    self.findLocation = AdminService.findLocation;

    self.moveTo = () =>{
        $location.url('/admin/locationpreview');
    }

    self.saveLocationName = AdminService.saveLocationName;
}]);