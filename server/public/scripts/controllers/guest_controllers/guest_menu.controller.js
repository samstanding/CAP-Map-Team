capApp.controller('GuestMenuController', ['UserService', 'GuestService', function (UserService, GuestService) {
    console.log('GuestMenuController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

}]);