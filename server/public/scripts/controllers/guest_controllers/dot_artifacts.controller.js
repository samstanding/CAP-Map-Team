capApp.controller('DotArtifactsController', ['UserService', 'GuestService', '$sce', function (UserService, GuestService, $sce) {
    console.log('DotArtifactsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

    self.getIndividualLocation = GuestService.getIndividualLocation;
    self.information = GuestService.information;

//VVVVVVVVVVVVVV///
    self.getIndividualLocation(2);//-------THIS IS A HARD CODED LOCATION ID PLEASE CHANGE WHEN APPLICABLE--------//
//^^^^^^^^^^^^^^//

    self.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

}]);