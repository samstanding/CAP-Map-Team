capApp.service('AdminService', ['$http', '$location', function ($http, $location) {
    console.log('AdminService Loaded');
    var self = this;
    self.locations = {
        newLocation: {},
    }

    self.addNewLocation = function(latitude, longitude){
        console.log('Latitude:', latitude, ', Longitude:', longitude);
        //send latitude and longitude to DB, get back ID, replace 1 in location url with id.
        $location.url('/admin/namelocation/1');
    }

    self.saveLocationName = function(){
        let newName = self.locations.newLocation.name;
        let newId = self.locations.newLocation.id;
        console.log('newLocation name:', newName, 'newLocation id', newId);
        //update location of id with new name in DB
        //on .then()
        $location.url('/admin/addlocation');
    }
}]);
