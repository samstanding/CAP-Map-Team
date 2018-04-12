capApp.controller('LocationPreviewController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('LocationPreview created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.getAllLocations = AdminService.getAllLocations;

    self.getAllLocations();
}]);