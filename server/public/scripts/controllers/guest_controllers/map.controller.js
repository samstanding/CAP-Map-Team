capApp.controller('MapController', ['UserService', 'GuestService', 'AdminService', '$scope', function (UserService, GuestService, AdminService, $scope) {
    console.log('MapController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
    self.guestService = GuestService;
    self.getAllLocations = AdminService.getAllLocations;

    self.locations = AdminService.locations;

    let markerStore = { marker: null };

    let overlay;
    
   CaponiOverlay.prototype = new google.maps.OverlayView();

    const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    let goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.4,
        scale: .1,
        strokeColor: 'gold',
        strokeWeight: 14
      };

      let hiddenMarker = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        scale: .0,
      };

      let blueStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'blue',
        fillOpacity: 0,
        scale: .1,
        strokeColor: 'blue',
        strokeWeight: 14
      };



      self.triggerMarkerShow = (location) => {
        for (let i = 0; i <self.locations.allLocations.length; i ++) {
            if (self.locations.allLocations[i].reveal_type == hiddenMarker) {
            let boundTop = parseFloat(self.locations.allLocations[i].lat) +.00035;
            let boundBottom = self.locations.allLocations[i].lat - .00035;
            let boundRight = parseFloat(self.locations.allLocations[i].long) +.0005;
            let boundLeft = self.locations.allLocations[i].long - .0005;
             if( location.latitude > boundBottom && location.latitude < boundTop && location.longitude < boundRight && location.latitude > boundLeft ) {
                 self.locations.allLocations[i].reveal_type = 'not hidden';
                let newMarker = new google.maps.Marker ({
                    position: new google.maps.LatLng(self.locations.allLocations[i].lat, self.locations.allLocations[i].long ),
                    map:self.map,
                    icon: blueStar
                })
            }
        }
    }
}

    self.triggerMarkerHide = (location) => {
        for (let i = 0; i <self.locations.allLocations.length; i ++) {
            if (self.locations.allLocations[i].reveal_type == 'not hidden') {
            let boundTop = parseFloat(self.locations.allLocations[i].lat) +.00035;
            let boundBottom = self.locations.allLocations[i].lat - .00035;
            let boundRight = parseFloat(self.locations.allLocations[i].long) +.0005;
            let boundLeft = self.locations.allLocations[i].long - .0005;
             if( location.latitude < boundBottom && location.latitude > boundTop && location.longitude > boundRight && location.latitude < boundLeft ) {
                 self.locations.allLocations[i].reveal_type = hiddenMarker;
                let newMarker = new google.maps.Marker ({
                    position: new google.maps.LatLng(self.locations.allLocations[i].lat, self.locations.allLocations[i].long ),
                    map:self.map,
                    icon: self.locations.allLocations[i].reveal_type
                })
            }
        }
    }
    }

    self.findLocation = () => {
        console.log('in find location map');
        success = (pos) => {
           let crd = pos.coords;
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
            }
            self.triggerMarkerShow(crd);
            self.triggerMarkerHide(crd);
        $scope.$apply();
    }
    error = (err) => {
        console.log('error in finding location: ', err);
        alert('We were\'t able to get your location. Make sure you\'re on an HTTPS webpage!');
    }
    options = {
        // enableHighAccuracy: true,
        // timeout: 7500,
        // frequency: 1
    }
    //PUT OPTIONS BACK IN BEFORE YOU PUSH!!!!!!
    navigator.geolocation.watchPosition(success, error);
}


    self.findLocation();

    self.initMap = () => {

        self.getAllLocations();
        setTimeout(function mapDelay(){
            self.map = new google.maps.Map(document.getElementById('map'), {
                center : {
                    lat: 44.80526000, 
                    lng: -93.15375000
                }, 
                zoom: 18,
                mapTypeId: 'satellite',
                streetViewControl: false,
                rotateControleOptions: false,
                fullscreenControl: false,
                tilt: 0
            })
    
            let bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(44.8047000, -93.1550000),
                new google.maps.LatLng(44.8090000, -93.1488500));
    
            let srcImage = '../../styles/northMap.png';
    
    
            let generateLink = (location) => `<a href="#!/artifacts/${location._id}">${location.location_name}</a>`;
    
             self.infowindow = new google.maps.InfoWindow();
             
             
             //need to add something to differentiate between display types
             for(let i = 0; i <self.locations.allLocations.length; i ++) {  
                if (self.locations.allLocations[i].reveal_type == 'static') {
                    self.locations.allLocations[i].reveal_type = image;
                } else if (self.locations.allLocations[i].reveal_type == 'hidden') {
                        self.locations.allLocations[i].reveal_type = hiddenMarker;
                    } else {
                    self.locations.allLocations[i].reveal_type = goldStar;
                }
    
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(self.locations.allLocations[i].lat, self.locations.allLocations[i].long),
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
            overlay = new CaponiOverlay(bounds, srcImage, self.map);
        }, 100)
    }


          /** @constructor */
    function CaponiOverlay(bounds, image, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;
  
        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;
  
        // Explicitly call setMap on this overlay.
        this.setMap(self.map);
      }
  
      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      CaponiOverlay.prototype.onAdd = function () {
  
        var div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';
  
        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        img.style.opacity = '.9';
        div.appendChild(img);
  
        this.div_ = div;
  
        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };
  
      CaponiOverlay.prototype.draw = function () {
  
        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();
  
        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  
        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };
  
      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      CaponiOverlay.prototype.onRemove = function () {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      self.initMap();
      
    self.isCurrentPage = AdminService.isCurrentPage;
    self.isCurrentPage();
    
}]);