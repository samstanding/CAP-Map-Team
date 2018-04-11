capApp.controller('TextFormController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('TextFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.newText = AdminService.newText;
    self.saveText = AdminService.saveText;

    self.editText = AdminService.editText;
    self.editArtifact = AdminService.editArtifact;

}]);