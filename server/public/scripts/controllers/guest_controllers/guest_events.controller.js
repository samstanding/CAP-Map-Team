capApp.controller('GuestEventsController', ['UserService', 'GuestService', function (UserService, GuestService) {
    console.log('GuestEventsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

}]);