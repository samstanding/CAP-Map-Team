capApp.controller('AnecdotesController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('AnecdotesController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);