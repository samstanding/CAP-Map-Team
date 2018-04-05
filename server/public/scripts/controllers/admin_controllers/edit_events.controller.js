capApp.controller('EditEventsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('EditEventsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);