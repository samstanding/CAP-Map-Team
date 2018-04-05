capApp.controller('AdminMenuController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('AdminMenuController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);