capApp.controller('AddLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('AddLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
    self.addNewLocation = AdminService.addNewLocation;
    
}]);