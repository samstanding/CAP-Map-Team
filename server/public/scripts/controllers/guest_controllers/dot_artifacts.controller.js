capApp.controller('DotArtifactsController', ['UserService', 'GuestService', '$sce', function (UserService, GuestService, $sce) {
    console.log('DotArtifactsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

    self.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

}]);