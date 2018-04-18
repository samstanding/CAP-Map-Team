capApp.service('GuestService', ['$http', '$location', function($http, $location){
    console.log('GuestService Loaded');
    var self = this;
    
    self.user = {
        guest: { }
    }

    self.information = {
        allEvents: [],
        guidelines: [],
        allArtifactsForLocation: [],
        currentLocationId: '',
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
        showMore: false,
        sculptureTitle: '',
    }
    
    self.addGuest = function(guest){
        console.log('In addGuest');
        console.log(guest);
        $http({
            method: 'POST',
            url:'/api/user/guest',
            data: guest,
        }).then((result)=>{
            // console.log('guest email added');
            self.emptyGuestInputs();
            alert("Thank you for joining the Caponi Art Park Email List!");
            // self.emptyGuestInputs();
        }).catch((error)=>{
            console.log('Could not add guest email'); 
        })
    }

    self.emptyGuestInputs = function(){
        self.user.guest.name = '';
        self.user.guest.email = '';
    }

    self.getInformation = function(){
        console.log('Get Guidelines');
        $http({
            method: 'GET',
            url: `/information/get`,
        }).then((result)=>{
            console.log('Information:', result.data);
            self.information.guidelines = result.data;
        }).catch((error)=>{
            console.log('guidelines', error);
        })
    }

    self.getEvents = function(){
        console.log('getEvents');
        $http({
            method: 'GET',
            url: `/events/get`,
        }).then((result)=>{
            console.log('Events:', result.data);
            self.information.allEvents = result.data;
        }).catch((error)=>{
            console.log('getEvents', error);
        })
    }

    self.getIndividualLocation = function(locationid){
        console.log('in getIndividualLocation function');
        $http({
            method: 'GET',
            url: `map/artifact/${locationid}`
        }).then((result)=>{
            self.information.allArtifactsForLocation = result.data;
            self.information.currentLocationId = locationid;
            self.indLocation.showMore = true;
            self.indLocation.sculptureTitle = '';
            for (let artifact of self.information.allArtifactsForLocation){
                if (artifact.type == 'sculpture'){
                    self.indLocation.showMore = false;
                    self.indLocation.sculptureTitle = artifact.title.toUpperCase();
                }
            }
            console.log('current location id:', self.information.currentLocationId);
            console.log(`success getting artifacts for location id:${locationid}`, self.information.allArtifactsForLocation);
            // self.determineMain(self.information.allArtifactsForLocation);
            // console.log('main', self.mainArtifact);
            
        }).catch((error)=>{
            console.log('error getting all locations', error);
        })
    }

    // self.mainAritfact = [];
    // self.supportingArtifacts = [];

    // self.determineMain = function (information) {
    //     for (i = 0; i < information.length; i++){
    //         if (i==0){
    //             self.mainArtifact.push(information[i]);
    //         }
    //         else {
    //             self.supportingArtifacts.push(information[i]);
    //         }
    //     }    
    // }

}]);