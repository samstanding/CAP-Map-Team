capApp.controller('MapController', ['UserService', 'GuestService', 'AdminService', '$scope', function (UserService, GuestService, AdminService, $scope) {
    console.log('MapController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
    self.guestService = GuestService;

    self.locations = AdminService.locations;

    let markerStore = {marker: null};

    const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    let goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.4,
        scale: .1,
        strokeColor: 'gold',
        strokeWeight: 14
      };

    let blueStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'blue',
        fillOpacity: 0,
        scale: 0,
        strokeColor: 'blue',
        strokeWeight: 14
      };

      let crd;

    self.findLocation = () => {
        console.log('in find location map');
        success = (pos) => {
            crd = pos.coords;
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
            
        if (markerStore.marker !== null) {
            markerStore.marker.setPosition(new google.maps.LatLng(crd.latitude, crd.longitude));
       
        } 
         else {
            let personMarker = new google.maps.Marker({
                position: new google.maps.LatLng(crd.latitude, crd.longitude),
                map: self.map,
                icon: '../../styles/maps_marker.png',
            })
            markerStore.marker = personMarker;
            console.log(crd);
            }
            if (crd.latitude > 44.8) {
                blueStar.scale = .1;
            }
        $scope.$apply();
    }
    error = (err) => {
        console.log('error in finding location: ', err);
        alert('You\'ll need to give this site access to your location for this to work');
    }
    options = {
        enableHighAccuracy: true
    }
    navigator.geolocation.watchPosition(success, error, options);
}

self.findLocation();




    self.initMap = () => {
        
        self.map = new google.maps.Map(document.getElementById('map'), {
             center : {
                 lat: 44.80526000, 
                 lng: -93.15375000
             }, 
             zoom: 18,
             mapTypeId: 'satellite',
             streetViewControl: false
         })
        
        //  let bounds = new google.maps.LatLngBounds(
        //      new google.maps.LatLng(44.8048, -93.1577000),
        //      new google.maps.LatLng(44.8085000, -93.1457900));
     
        //  let srcImage = '../../styles/northMap.png';

        let generateLink = (location) => `<a href="#!/artifacts/${location._id}">${location.location_name}</a>`;
        

         self.infowindow = new google.maps.InfoWindow();
         
         
         //need to add something to differentiate between display types
         for(let i = 0; i <self.locations.allLocations.length; i ++) {
             console.log(self.locations.allLocations[i].reveal_type);
             
            if (self.locations.allLocations[i].reveal_type == 'static') {
                self.locations.allLocations[i].reveal_type = image;
            } else if (self.locations.allLocations[i].reveal_type == 'hidden') {
                self.locations.allLocations[i].reveal_type = blueStar;
            } else {
                self.locations.allLocations[i].reveal_type = goldStar;
            }
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(self.locations.allLocations[i].lat,self.locations.allLocations[i].long ),
                map: self.map,
                title: self.locations.allLocations[i].location_name,
                icon: self.locations.allLocations[i].reveal_type
         })
    

         google.maps.event.addListener(marker, 'click', (function (marker, i) {
             return function () {
                 self.infowindow.setContent(generateLink(self.locations.allLocations[i]));
                 self.infowindow.open(self.map, marker);
             } 
         })(marker, i));
        }    
    } 
    self.initMap();

}]);