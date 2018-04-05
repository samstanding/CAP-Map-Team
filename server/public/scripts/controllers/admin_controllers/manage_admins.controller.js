capApp.controller('ManageAdminsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('ManageAdminsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);