capApp.controller('AddLocationController', ['UserService', 'AdminService', '$location', function (UserService, AdminService, $location) {
    console.log('AddLocationController created');
    let self = this;
    
    //don't think i need these since I'm not sending anything to the db
    // self.userService = UserService;
    self.adminService = AdminService;
   
    //get findlocation function from adminservice
    self.findLocation = AdminService.findLocation;

    //function to route the page on click to the name location
   self.movePage = () => {
    $location.url('/admin/namelocation/1');
   }
 
}]);