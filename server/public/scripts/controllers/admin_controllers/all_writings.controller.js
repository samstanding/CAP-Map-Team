capApp.controller('WritingsController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('WritingsController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.newText = AdminService.newText;
    self.newText.type = 'writing';
    self.locations = AdminService.locations;
    self.getAllWritings = AdminService.getAllWritings;
    self.getAllWritings();

    self.saveAssociation = AdminService.saveAssociation;

}]);