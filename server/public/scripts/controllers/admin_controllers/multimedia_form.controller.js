capApp.controller('MultimediaFormController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('MultimediaFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;

    self.uploadnewPhoto = AdminService.uploadnewPhoto;
    self.uploadNewVideo = AdminService.uploadNewVideo;

    self.saveMultimedia = AdminService.saveMultimedia;
}]);