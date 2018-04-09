capApp.controller('SculpturesController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('SculpturesController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.saveSculpture = AdminService.saveSculpture;
    self.newSculpture = AdminService.newSculpture;

}]);