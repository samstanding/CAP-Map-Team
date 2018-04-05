capApp.controller('ManageArtifactsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('ManageArtifactsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

}]);