capApp.controller('GuidelinesController', ['UserService', 'GuestService', function (UserService, GuestService) {
    console.log('GuidelinesController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

    self.information = GuestService.information

    self.getInformation = GuestService.getInformation;

    self.getInformation();
    
}]);