capApp.controller('WritingsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('WritingsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);