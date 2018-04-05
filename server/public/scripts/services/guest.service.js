capApp.service('GuestService', ['$http', '$location', function ($http, $location) {
    console.log('GuestService Loaded');
    var self = this;
    
    self.user = {
        guest: { }
    }

    self.addGuest = function(guest){
        console.log('In addGuest');
        console.log(guest);
        

    }

}]);
