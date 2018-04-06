capApp.service('AdminService', ['$http', '$location', function ($http, $location) {
    console.log('AdminService Loaded');
    var self = this;
    self.locations = {
        newLocation: {},
        newText: {},
        newMultimedia: {},
        newSculpture: {},
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

    self.saveText = function(){
        let newText = self.locations.newText;
        console.log('in saveText,', newText);
        //on .then()
        history.back();
    }

    self.uploadnewPhoto = function(){
        console.log('in uploadNewPhoto');
        //filestack here
        //set newMultimedia.url equal to filestack url
        self.locations.newMultimedia.url = 'fakephotourl';
    }

    self.uploadNewVideo = function(){
        console.log('in uploadNewVideo');
        //set newMultimedia.url equal to youtube embed url
        self.locations.newMultimedia.url = 'fakeyoutubeurl';
    }

    self.saveMultimedia = function(){
        let newMultimedia = self.locations.newMultimedia;
        console.log('in saveMultimedia,', newMultimedia);
        //on .then()
        history.back();
    }

    self.saveSculpture = function(){
        let newSculpture = self.locations.newSculpture;
        console.log('in saveSculpture,', newSculpture);
    }

    self.editEvent = function(dataObj){
        $http({
            method: 'PUT',
            url: `/admin/event/edit`,
            data: dataObj
        }).then((result)=>{

        }).catch((error)=>{
            
        })
    }

}]);
