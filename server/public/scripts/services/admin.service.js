capApp.service('AdminService', ['$http', '$location', function ($http, $location) {
    console.log('AdminService Loaded');
    var self = this;
    self.locations = {
        newLocation: {},
        allLocations: [],
        allEvents: [],
        newEvent:{},
        events: [],
        allArtifactsForLocation: [],
        allAnecdotes: [],
        allWritings: [],
        allPoems: [],
        allMultimedia: [],
    }
    
    self.indLocation = {
        indSculpture: {},
        indMainPhoto: {},
        indPhotos: [],
        indPoems: [],
        indWritings: [],
        indAnecdotes: [],
        indVideos: [],
        isBeingEdited: false,
    }

    self.newText = {
        type: '',
    }

    self.newMultimedia = {}

    self.newSculpture = {};

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
        let newText = self.newText;
        console.log('in saveText,', newText);
        $http({
            method: 'POST',
            url: `/artifact/newtext/save`,
            data: {
                title: newText.title,
                year: newText.year,
                description: newText.description,
                type: newText.type,
            }
        }).then((result)=>{
            console.log('new text saved');
            history.back();
        }).catch((error)=>{
            console.log('error saving new text', error);
        })
    }

    self.client = filestack.init("AI5OhtlsWSsiO7mmCbw06z");

    self.uploadnewPhoto = function(){
        console.log('in uploadNewPhoto');
        self.newMultimedia.type = 'photo';
        self.client.pick({
            accept: 'image/*',
            maxFiles: 1
          }).then(function(result){
            console.log('in upload,', result.filesUploaded[0].url)
            alert("successful upload!");
            self.newMultimedia.media_url = result.filesUploaded[0].url;
    })
    }

    self.uploadNewVideo = function(url){
        console.log('in uploadNewVideo', url);
        self.newMultimedia.type = 'video';
        self.newMultimedia.media_url = url;
    }

    self.saveMultimedia = function(){
        let newMultimedia = self.newMultimedia;
        console.log('in saveMultimedia,', newMultimedia);
        $http({
            method: 'POST',
            url: '/artifact/multimedia/save',
            data: {
                type: newMultimedia.type,
                media_url: newMultimedia.media_url,
                description: newMultimedia.description
            }
        }).then((result)=>{
            console.log('new multimedia saved');
            history.back();
        }).catch((error)=>{
            console.log('error saving new multimedia', error);
        })
    }

    self.saveSculpture = function(){
        let newSculpture = self.newSculpture; 
        console.log('in saveSculpture,', newSculpture);
        $http({
            method: 'POST',
            url: `/artifact/sculpture/save`,
            data: {
                title: newSculpture.title,
                year: newSculpture.year,
                artist_name: newSculpture.artist_name,
                material: newSculpture.material,
                description: newSculpture.description,
                extended_description: newSculpture.extended_description,
                type: 'sculpture',
            }
        }).then((result)=>{
            console.log('new sculpture saved');
            history.back();
        }).catch((error)=>{
            console.log('error saving new sculpture', error);
        })
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
            url: '/map/all'
        }).then((result)=>{
            self.locations.allLocations = result.data;
            console.log('success getting all locations', self.locations.allLocations);
        }).catch((error)=>{
            console.log('error getting all locations');
        })
    }

    self.getIndividualLocation = function(locationid){
        console.log('in getIndividualLocation function');
        $http({
            method: 'GET',
            url: `map/artifact/${locationid}`
        }).then((result)=>{
            self.locations.allArtifactsForLocation = result.data;
            console.log(`success getting artifacts for location id:${locationid}`, self.locations.allArtifactsForLocation);
            self.indLocation.indSculpture = {};
            self.indLocation.indMainPhoto = {};
            self.indLocation.indPhotos = [];
            self.indLocation.indPoems = [];
            self.indLocation.indWritings = [];
            self.indLocation.indAnecdotes = [];
            self.indLocation.indVideos = [];
            self.indLocation.isBeingEdited = false;
            self.determineType();
        }).catch((error)=>{
            console.log('error getting all locations');
        })
    }

    self.determineType = function(){
        for (let artifact of self.locations.allArtifactsForLocation){
            if (artifact.type == 'sculpture'){
                self.indLocation.indSculpture = artifact;
            } 
            else if (artifact.type == 'photo' && !artifact.main_photo){
                self.indLocation.indPhotos.push(artifact);
            }
            else if (artifact.type == 'poem'){
                self.indLocation.indPoems.push(artifact);
            }
            else if (artifact.type == 'writing'){
                self.indLocation.indWritings.push(artifact);
            }
            else if (artifact.type == 'anecdote'){
                self.indLocation.indAnecdotes.push(artifact);
            }
            else if (artifact.type == 'video'){
                self.indLocation.indVideos.push(artifact);
            }
            if (artifact.main_photo){
                self.indLocation.indMainPhoto = artifact;
            }
        }
    }

    self.saveLocationInfo = function(){
        //save main_photo info, along with all artifact info, when save button is pressed
    }

    // $http({
    //     method: 'GET',
    //     url: '/artifacts/sculpture'
    // }).then((result)=>{

    // }).catch((error)=>{
    //     console.log('/artifacts/sculpture', error);
    // })

    self.getAllMultimedia = function(){
    console.log('in getAllMultimedia function');
    $http({
        method: 'GET',
        url: '/artifacts/media'
    }).then((result)=>{
        self.locations.allMultimedia = result.data;
    }).catch((error)=>{
        console.log('/artifacts/media', error);
    })
    }

    self.getAllWritings = function(){
    console.log('in getAllWritings function');
    $http({
        method: 'GET',
        url: '/artifacts/writing'
    }).then((result)=>{
        self.locations.allWritings = result.data;
    }).catch((error)=>{
        console.log('/artifacts/writing', error);
    })
    }

    self.getAllAnecdotes = function(){
    console.log('in getAllAnecdotes function');
    $http({
        method: 'GET',
        url: '/artifacts/anecdote'
    }).then((result)=>{
        self.locations.allAnecdotes = result.data;
    }).catch((error)=>{
        console.log('/artifacts/anecdote', error);
    })
    }

    self.getAllPoems = function(){
    console.log('in getAllMultimedia function');
    $http({
        method: 'GET',
        url: '/artifacts/poem'
    }).then((result)=>{
        self.locations.allPoems = result.data;
    }).catch((error)=>{
        console.log('/artifacts/poem', error);
    })
    }


}]);

