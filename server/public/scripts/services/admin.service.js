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
        information: {},
        currentLocationId: '',
        guestList: [],
        newGuest:{},
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

    self.newMultimedia = {
        newVideo: '',
    }

    self.newSculpture = {};

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
        self.newMultimedia.uploaded = true;
        console.log(self.newMultimedia.uploaded);
        self.newMultimedia.media_url = url;
        // document.getElementById( 'vidThing' ).innerHTML = '<iframe width="420" height="315" ng-src="https://www.youtube.com/embed/IAFS1gwzTTs" frameborder="0" allowfullscreen></iframe>';
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
            self.newMultimedia = {}
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
            url: `/events/edit/${dataObj.id}`,
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
            url: `/events/delete/${dataObj.id}`
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
    //-----Start Locations----

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

    self.addLocationToDB = function(postObj){
        $http({
            method: 'POST',
            url: '/map/post',
            data: postObj
        }).then((result)=>{
            self.getAllLocations();
        }).catch((error)=>{
            console.log('/map/location/post', error);
        })
    } // ---------------------I don't have a button---------------------

    self.deleteLocation = function(){
        $http({
            method: 'DELETE',
            url: `/map/delete/${id}`
        }).then((result)=>{
            self.getAllLocations();
        }).catch((error)=>{
            console.log('/map/delete/:id', error);
        })
    } // ---------------------I don't have a button---------------------

    self.editLocation = function(){
        $http({
            method: 'PUT',
            url: `/map/edit`,
            data: putObj
        }).then((result)=>{
            self.getAllLocations();
        }).catch((error)=>{
            console.log('/map/edit', error);
        })
    } // ---------------------I don't have a button---------------------

    self.getIndividualLocation = function(locationid){
        console.log('in getIndividualLocation function');
        $http({
            method: 'GET',
            url: `map/artifact/${locationid}`
        }).then((result)=>{
            self.locations.allArtifactsForLocation = result.data;
            self.locations.currentLocationId = locationid;
            console.log('current location id:', self.locations.currentLocationId)
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
    //-----End Locations----
    //----BEGIN Information AJAX-----//
    self.addInformation = function(dataObj){
        //console.log('Add Information');
        $http({
            method:'POST', 
            url: `/information/post`,
            data: dataObj
        })
        .then((result)=>{
            console.log('Information added');
            self.getInformation();
        }).catch((error)=>{
            console.log('Add information', error);
        })
    }

    self.getInformation = function () {
        //console.log('Get Information');
        $http({
            method: 'GET',
            url: `/information/get`,
        }).then((result) => {
            console.log('Information:', result.data);
            self.locations.information = result.data;
        }).catch((error) => {
            console.log('guidelines', error);
        })
    }

    self.editInformation = function(dataObj){
        //console.log('Edit Information');
        $http({
            method: 'PUT',
            url: `/information/edit/${dataObj.id}`,
            data: dataObj,
        }).then((result) => {
            console.log('Information updated');
            self.getInformation();
        }).catch((error) => {
            console.log('Information', error);
        })
    }

    self.deleteInformation = function(dataObj) {
        //console.log('Delete Information');
        $http({
            method: 'DELETE',
            url: `/information/delete/${dataObj.id}`
        }).then((result) => {
            self.getInformation();
        }).catch((error) => {
            console.log('delete information', error);
        })
    }

//-----END INFORMATION AJAX-------
//-----Start Artifacts-------
    //-----Start Multimedia------
    self.saveMultimedia = function(){
        let newMultimedia = self.newMultimedia;
        console.log('in saveMultimedia,', newMultimedia);
        $http({
            method: 'POST',
            url: '/artifacts/save',
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

    //-----End Multimedia------
    //-----Start Sculptures------
    self.saveSculpture = function(){
        let newSculpture = self.newSculpture; 
        console.log('in saveSculpture,', newSculpture);
        $http({
            method: 'POST',
            url: `/artifacts/save`,
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

    self.getAllSculptures = function(){
        $http({
            method: 'GET',
            url: '/artifacts/sculpture'
        }).then((result)=>{
            self.locations.allSculptures = result.data;
        }).catch((error)=>{
            console.log('/artifacts/sculpture', error);
        })
    }
    //-----End Sculptures------
    //-----Start Other Artifacts-----
    self.saveText = function(){
        let newText = self.newText;
        console.log('in saveText,', newText);
        $http({
            method: 'POST',
            url: `/artifacts/save`,
            data: {
                title: newText.title,
                year: newText.year,
                description: newText.description,
                type: newText.type,
            }
        }).then((result)=>{
            console.log('new text saved');
            self.clearArtifact();
            history.back();
        }).catch((error)=>{
            console.log('error saving new text', error);
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
        console.log('in getAllPoems function');
        $http({
            method: 'GET',
            url: '/artifacts/poem'
        }).then((result)=>{
            self.locations.allPoems = result.data;
            console.log(self.locations.allPoems);
        }).catch((error)=>{
            console.log('/artifacts/poem', error);
        })
    }
    //-----End Other Artifacts-----
    //-----Start Misc Artifact Functions-----

    self.editArtifact = function(artifact){
        console.log('Edit Artifact', artifact);
        
        $http({
            method: 'PUT',
            url: '/artifacts/edit',
            data: artifact
        }).then((result)=>{
            self.getDecider(artifact);
            console.log('Artifact updated', result);
            self.clearArtifact();
            history.back();
        }).catch((error)=>{
            console.log('/artifacts/edit', error);
        })
    }

    self.clearArtifact = function(){
        // self.newText.type = '';
        self.newText.year = '';
        self.newText.material = '';
        self.newText.artist_name = '';
        self.newText.title = '';
        self.newText.description = '';
        self.newText.extended_description = '';
        self.newText.media_url = '';
        self.newText.editing = false;
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
            else if (artifact.main_photo){
                self.indLocation.indMainPhoto = artifact;
            }
        }
    }

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
    console.log('in getAllPoems function');
    $http({
        method: 'GET',
        url: '/artifacts/poem'
    }).then((result)=>{
        self.locations.allPoems = result.data;
        console.log(self.locations.allPoems);
    }).catch((error)=>{
        console.log('/artifacts/poem', error);
    })
    }

    self.saveAssociation = function(artifact_id, main_photo){
        let location_id = self.locations.currentLocationId;
        console.log('in saveAssociation function--artifact_id, main_photo, location_id:', artifact_id, main_photo, location_id);
        $http({
            method: 'POST',
            url: '/map/join/insert',
            data: {
                artifact_id: artifact_id,
                location_id: location_id,
                main_photo: main_photo,
            }
        }).then((result)=>{
            console.log('association saved');
            history.back();
        }).catch((error)=>{
            console.log('error saving association', error);
        })
    }

    self.deleteAssociation = function(artifact_id){
        let location_id = Number(self.locations.currentLocationId);
        console.log('in deleteAssociation', artifact_id, location_id);
        $http({
            method: 'DELETE',
            url: `/artifacts/join/delete/${artifact_id}/${location_id}`
        }).then((result)=>{
            self.getIndividualLocation(location_id);
        }).catch((error)=>{
            console.log(`/artifacts/join/delete/${id}: ${result}`);
        })
    }

    self.deleteArtifact = function(artifact){
        $http({
            method: 'DELETE',
            url: `/artifacts/delete/${artifact.id}`
        }).then((result)=>{
            self.getDecider(artifact);
        }).catch((error)=>{
            console.log('/artifacts/delete/:id', error);
        })
    }

    self.getDecider = function(artifact){
        switch (artifact.type){
            case 'photo':
            case 'video':
                self.getAllMultimedia();
                break;
            case 'writing':
                self.getAllWritings();
                break;
            case 'anecdote':
                self.getAllAnecdotes();
                break;
            case 'poem':
                self.getAllPoems();
                break;
        }
    }

    self.formDecider = function(artifact){
        switch (artifact.type) {
            case 'photo':
                $location.path('/admin/multimediaform');
                break;
            case 'video':
                $location.path('/admin/multimediaform');
                break;
            case 'writing':
                $location.path('/admin/textform');
                break;
            case 'anecdote':
                $location.path('/admin/textform');
                break;
            case 'poem':
                $location.path('/admin/textform');
                break;
        }
    }

    self.getArifactToEdit = function(id){
        console.log('Editing text artifact');
        $http({
            method: 'GET',
            url: `/artifacts/single/${id}`,
        })
        .then((result)=>{
            console.log('individual result:', result.data);
            self.newText.id = result.data[0].id;
            self.newText.type = result.data[0].type;
            self.newText.title = result.data[0].title;
            self.newText.year = result.data[0].year;
            self.newText.description = result.data[0].description;
            self.newText.editing = true;
            self.newMultimedia.id = result.data[0].id;
            self.newMultimedia.type = result.data[0].type;
            self.newMultimedia.media_url = result.data[0].media_url;
            self.newMultimedia.description = result.data[0].description;
            self.newMultimedia.extended_description = result.data[0].extended_description;
            self.newMultimedia.editing = true;
            self.formDecider(result.data[0]);
        })
        .catch((error)=>{
            console.log('Could not get individual artifact', error);
        
        })
    }
    //-----End Misc Artifact Functions-----
//-----End Artifacts-------
//----Start Guest Management----
    self.getAllGuests = function (){
        $http({
            method:'GET', 
            url: `/api/user/guest/all`
        })
        .then((result)=>{
            console.log('guest emails', result.data);
            self.locations.guestList = result.data;
        })
        .catch((error)=>{
            console.log('could not get guest emails', error);
        })
    }

    self.deleteGuest = function(guest){
        $http({
            method:'DELETE',
            url:`/guest/delete/${guest.id}`
        })
        .then((result)=>{
            console.log('Guest deleted',);
            self.getAllGuests();
        })
        .catch((error)=>{
            console.log('Could not delete guest');
        })
    }

    self.addGuest = function (guest) {
        console.log('In addGuest');
        console.log(guest);
        $http({
            method: 'POST',
            url: '/api/user/guest',
            data: guest,
        })
        .then((result) => {
            console.log('guest email added');
        })
        .catch((error) => {
            console.log('Could not add guest email');
        })
    }
//------End Guest Management----
}]);