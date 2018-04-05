capApp.controller('NameLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('NameLocationController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);