capApp.service('GuestService', ['$http', '$location', function ($http, $location) {
    console.log('GuestService Loaded');
    var self = this;
    
    self.user = {
        guest: { }
    }

    self.information = {
        allEvents: [],
        guidelines: [],
    }
    self.addGuest = function(guest){
        console.log('In addGuest');
        console.log(guest);
        $http({
            method: 'POST',
            url:'/api/user/guest',
            data: guest,
        })
            .then((result)=>{
                console.log('guest email added');
                
            })
            .catch((error)=>{
                console.log('Could not add guest email');
                
            })
        

    }

    self.getGuidelines = function () {
        console.log('Get Guidelines');
        $http({
            method: 'GET',
            url: `/information/get`,
        }).then((result) => {
            console.log('Guidelines:', result.data);
            self.information.guidelines = result.data;
        }).catch((error) => {
            console.log('guidelines', error);
        })
    }

    self.getEvents = function () {
        console.log('getEvents');
        $http({
            method: 'GET',
            url: `/events/get`,
        }).then((result) => {
            console.log('Events:', result.data);
            self.information.allEvents = result.data;
        }).catch((error) => {
            console.log('getEvents', error);
        })
    }

}]);
