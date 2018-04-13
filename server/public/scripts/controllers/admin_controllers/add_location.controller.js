capApp.controller('AddLocationController', ['UserService', 'AdminService', function (UserService, AdminService) {
    
    var self = this;
    // don't think I need this
    // self.userService = UserService;
    self.adminService = AdminService;

    self.addLocation = AdminService.addLocation;

    self.locations = AdminService.locations;

    // nor do i need any of these
    // self.getAllLocations = AdminService.getAllLocations;
    // self.getAllLocations();

    console.log(self.locations.newLocation.coords);
    
    self.initMap = () => {
        
       self.map = new google.maps.Map(document.getElementById('map'), {
            center : {
                lat:44.80457827564791,
                lng: -93.15323458993169
            }, 
            zoom: 18,
            streetViewControl: false,
        })
        let infowindow = new google.maps.InfoWindow({
            content: self.locations.newLocation.name
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(44.80457827564791,-93.15323458993169),
            map: self.map,
            title: self.locations.newLocation.name,
            draggable: true,
            animation: google.maps.Animation.DROP
        })


        google.maps.event.addListener(marker, 'dragstart', function () {
            console.log('drag start');
            
        })

        google.maps.event.addListener(marker, 'drag', function () {
            console.log('dragging');
            
        })

        google.maps.event.addListener(marker, 'dragend', function () {
            console.log('dragend');
            self.locations.newLocation.lat =marker.getPosition().lat();
            self.locations.newLocation.long =marker.getPosition().lng();
            console.log(self.locations.newLocation);      
        })
    }   
    self.initMap();
}]);