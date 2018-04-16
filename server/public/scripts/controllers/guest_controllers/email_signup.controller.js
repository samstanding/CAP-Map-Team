capApp.controller('EmailSignupController', ['UserService', 'GuestService', 'AdminService', function (UserService, GuestService, AdminService) {
    console.log('EmailSignupController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;
    self.adminService = AdminService;

    self.addGuest = GuestService.addGuest;

    
    self.getAllLocations = AdminService.getAllLocations;

    self.getAllLocations();

}]);