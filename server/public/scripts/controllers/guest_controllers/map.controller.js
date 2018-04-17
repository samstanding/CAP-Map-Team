capApp.controller('MapController', ['UserService', 'GuestService', 'AdminService', '$scope', function (UserService, GuestService, AdminService, $scope) {
    console.log('MapController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;
    self.guestService = GuestService;

    self.locations = AdminService.locations;

    let markerStore = { marker: null };

    let overlay;
    
   CaponiOverlay.prototype = new google.maps.OverlayView();

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    self.findLocation = () => {
        console.log('in find location map');
        success = (pos) => {
            let crd = pos.coords;
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
            console.log(markerStore.marker);

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
                console.log(markerStore.marker);

            }
            $scope.$apply();
        }
        error = (err) => {
            console.log('error in finding location: ', err);
        }
        // options = {
        //     enableHighAccuracy: true
        // }
        navigator.geolocation.watchPosition(success, error);
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
        for (let i = 0; i < self.locations.allLocations.length; i++) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(self.locations.allLocations[i].lat, self.locations.allLocations[i].long),
                map: self.map,
                title: self.locations.allLocations[i].location_name,
            })

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    self.infowindow.setContent(generateLink(self.locations.allLocations[i]));
                    self.infowindow.open(self.map, marker);
                }
            })(marker, i));
        }
        overlay = new CaponiOverlay(bounds, srcImage, self.map);
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