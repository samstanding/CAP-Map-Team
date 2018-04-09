capApp.controller('EditGuidelinesController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('EditGuidelinesController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
    self.locations = AdminService.locations

    self.viewEditGuideline = function (guideline) {
        guideline.editing = true;
    }

    self.getGuidelines = AdminService.getGuidelines;
    self.addGuideline = AdminService.addGuideline;
    self.editGuideline = AdminService.editGuideline;
    self.deleteGuideline = AdminService.deleteGuideline;

    self.getGuidelines();

}]);