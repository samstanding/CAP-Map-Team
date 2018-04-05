capApp.controller('MultimediaController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('MultimediaController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);