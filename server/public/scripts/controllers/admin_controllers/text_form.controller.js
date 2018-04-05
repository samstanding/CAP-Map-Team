capApp.controller('TextFormController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('TextFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.saveText = AdminService.saveText;

}]);