capApp.controller('TextFormController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('TextFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);