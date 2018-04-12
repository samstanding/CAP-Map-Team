capApp.controller('LocationPreviewController', ['UserService', 'AdminService', function (UserService, AdminService) {
    console.log('LocationPreview created');
    var self = this;
    // don't think I need this
    // self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;

    // nor do i need any of these
    // self.getAllLocations = AdminService.getAllLocations;
    // self.getAllLocations();
    self.initMap = () => {
       self.map = new google.maps.Map(document.getElementById('map'), {
            center : {
                lat: 44.978,
                lng: -93.263
            }, 
            zoom: 12,
            streetViewControl: false,
        })
        let infowindow = new google.maps.InfoWindow({
            content: self.locations.newLocation.name
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.locations.newLocation.coords.lat,self.locations.newLocation.coords.long ),
            map: self.map,
            title: self.locations.newLocation.name,
            animation: google.maps.Animation.DROP
        })

        marker.addListener('click', function () {
            infowindow.open(self.map, marker);
        });
    }
    self.initMap();
}]);