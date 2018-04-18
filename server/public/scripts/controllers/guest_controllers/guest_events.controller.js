capApp.controller('GuestEventsController', ['UserService', 'GuestService','AdminService', function (UserService, GuestService, AdminService) {
    console.log('GuestEventsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;
    self.adminService = AdminService;
    self.getEvents = AdminService.getEvents;
    self.locations = AdminService.locations;

    self.getEvents();
}]);