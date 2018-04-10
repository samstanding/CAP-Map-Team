capApp.controller('MultimediaController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('MultimediaController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;
    self.newMultimedia = AdminService.newMultimedia

    self.getAllMultimedia = AdminService.getAllMultimedia;
    self.getAllMultimedia();

    self.saveAssociation = AdminService.saveAssociation;

}]);