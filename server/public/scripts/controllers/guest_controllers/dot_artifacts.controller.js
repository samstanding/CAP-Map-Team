capApp.controller('DotArtifactsController', ['UserService', 'GuestService', '$sce', '$routeParams', function (UserService, GuestService, $sce, $routeParams) {
    console.log('DotArtifactsController created');
    var self = this;
    self.userService = UserService;
    self.guestService = GuestService;

    self.getIndividualLocation = GuestService.getIndividualLocation;
    self.information = GuestService.information;
    self.indLocation = GuestService.indLocation;

    let locationid = $routeParams.locationid;
    self.getIndividualLocation(locationid);
    self.getIndividualLocation(locationid);

    self.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    // self.mainAritfact[];
    // self.supportingArtifacts
    
    // self.determineMain = function(information){
    //     for (info of information)
    //     if info[0] 
        
    // }

}]);