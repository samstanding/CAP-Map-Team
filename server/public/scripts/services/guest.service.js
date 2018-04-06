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

    $http({
        method: 'GET',
        url: `/guest/events`
    }).then((result)=>{

    }).catch((error)=>{

    }) // Needs a function, GET for guest view of events - Ryan

}]);
