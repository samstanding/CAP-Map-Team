capApp.controller('ManageGuestsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('ManageGuestsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);