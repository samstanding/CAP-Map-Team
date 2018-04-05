capApp.controller('MultimediaFormController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('MultimediaFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);