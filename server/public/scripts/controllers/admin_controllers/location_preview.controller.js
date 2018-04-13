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

    console.log(self.locations.newLocation.coords);
    
    self.initMap = () => {
        geocoder = new google.maps.Geocoder();
       self.map = new google.maps.Map(document.getElementById('map'), {
            center : {
                lat:44.804978887592256,
                lng: -93.15347598874304
            }, 
            zoom: 12,
            streetViewControl: false,
        })
        let infowindow = new google.maps.InfoWindow({
            content: self.locations.newLocation.name
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(44.804978887592256,-93.15347598874304),
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
            console.log(marker.getPosition());
            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());
            
        })
    }

   
    self.initMap();
}]);