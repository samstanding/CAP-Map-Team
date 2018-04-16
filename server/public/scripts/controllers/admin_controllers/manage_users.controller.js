capApp.controller('ManageUsersController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('ManageUsersController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.isCurrentPage = AdminService.isCurrentPage;
    self.isCurrentPage();
}]);