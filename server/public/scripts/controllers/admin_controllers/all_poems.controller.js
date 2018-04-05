capApp.controller('PoemsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('PoemsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);