capApp.controller('EditGuidelinesController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('EditGuidelinesController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);