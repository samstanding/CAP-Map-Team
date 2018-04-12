capApp.controller('AddLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('AddLocationController created');
    var self = this;
    //since this isn't sending anything to the db, i'm disconnecting it from the services. 
    // self.userService = UserService;
    // self.adminService = AdminService;
    // self.addNewLocation = AdminService.addNewLocation;

    //because first location is not being sent to db I am putting that function in the controller
    self.findLocation = () => {
        console.log('in find location');
        //if the user allows geolocation the success function will run: it returns an object with info about the user's location
        success = (pos) => {
            let crd = pos.coords;
            //adding logs to test that function is working
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
        }
        //if geolocation is not able to run, the error function runs. 
        error = (err) => {
            alert ('Geolocation did not work!. Maybe change your browser settings to allow this website to get your location' );
            console.log('error on finding location: ', err);
        }
        //options lets us choose things like how accurate a read we want.
        options = {
            enableHighAccuracy: true
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
}]);