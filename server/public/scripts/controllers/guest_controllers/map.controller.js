capApp.controller('MapController', ['UserService', 'GuestService', function (UserService, GuestService) {
    console.log('MapController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

}]);