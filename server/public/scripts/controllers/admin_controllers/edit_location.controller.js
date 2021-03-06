capApp.controller('EditLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('EditLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.getAllLocations = AdminService.getAllLocations;

    self.getAllLocations();
    
    self.isCurrentPage = AdminService.isCurrentPage;
    self.isCurrentPage();
}]);