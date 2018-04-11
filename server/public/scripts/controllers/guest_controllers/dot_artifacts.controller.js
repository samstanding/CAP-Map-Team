capApp.controller('DotArtifactsController', ['UserService', 'GuestService', function (UserService, GuestService) {
    console.log('DotArtifactsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

    self.getIndividualLocation = GuestService.getIndividualLocation;

    self.getIndividualLocation();
}]);