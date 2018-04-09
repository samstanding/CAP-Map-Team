capApp.service('AdminService', ['$http', '$location', function ($http, $location) {
    console.log('AdminService Loaded');
    var self = this;
    self.locations = {
        newLocation: {},
        newText: {},
        newMultimedia: {},
        newSculpture: {},
        allLocations: [],
        allEvents: [],
        newEvent:{},
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

//---START EVENTS AJAX---
    self.getEvents = function(){
        console.log('getEvents');
        $http({
            method:'GET', 
            url:`/events/get`,
        }).then((result)=>{
            console.log('Events:',result.data);
            self.locations.allEvents = result.data;
        }).catch((error)=>{
            console.log('getEvents', error);
        })
    }

    self.addEvent = function(dataObj){
        console.log('Add Event', dataObj);
        console.log(self.locations.newEvent);
        
        dataObj.time = dataObj.time.toString().substring(16, 24);
        $http({
            method: 'POST',
            url:`/events/post`,
            data: dataObj
        }).then((result)=>{
            console.log('Event added');
            self.getEvents();
            self.emptyEventsInputs();
        }).catch((error)=>{
            console.log('addEvent', error);
        })
    }

    self.editEvent = function(dataObj){
        console.log('Edited item', dataObj);
        
        $http({
            method: 'PUT',
            url: `/events/edit`,
            data: dataObj
        }).then((result)=>{
            // Redisplay DOM
            self.getEvents();
        }).catch((error)=>{
            console.log('editEvent', error);
        })
    }

    self.deleteEvent = function(dataObj){
        $http({
            method: 'DELETE',
            url: `/events/delete/${dataObj.event_id}`
        }).then((result)=>{
            // Redisplay DOM
            self.getEvents();
        }).catch((error)=>{
            console.log('editEvent', error);
        })
    }

    self.emptyEventsInputs = function(){
        self.locations.events.newEvent.title = '';
        self.locations.events.newEvent.date = '';
        self.locations.events.newEvent.time = '';
        self.locations.events.newEvent.description = '';
        self.locations.events.newEvent.notes = '';
        self.locations.events.newEvent.category = '';
        self.locations.events.newEvent.photo_url = '';
        self.locations.events.newEvent.age_group = '';
        self.locations.events.newEvent.price = '';
    }
    //-----END EVENTS AJAX----


    self.getAllLocations = function(){
        console.log('in getAllLocations function');
        $http({
            method: 'GET',
            url: `/admin/locations/all`,
        }).then((result)=>{
            console.log('success getting all locations', result.data);
            self.locations.allLocations = result.data;
            for (let location of self.locations.allLocations){
                location.expanded = false;
                location.beingEdited = false;
            }
        }).catch((error)=>{
            console.log('error getting all locations');
        })
    }

}]);
