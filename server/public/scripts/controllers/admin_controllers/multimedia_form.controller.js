capApp.controller('MultimediaFormController', ['UserService', 'AdminService', '$sce', '$mdDialog', 'Lightbox', function (UserService, AdminService, $sce, $mdDialog, Lightbox) {
    console.log('MultimediaFormController created');
    var self = this;
    self.userService = UserService;
    self.adminService = AdminService;

    self.locations = AdminService.locations;

    self.uploadnewPhoto = AdminService.uploadnewPhoto;
    self.uploadNewVideo = AdminService.uploadNewVideo;

    self.saveMultimedia = AdminService.saveMultimedia;

    self.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    self.image = [
        {
          'url': 'https://www.youtube.com/embed/IAFS1gwzTTs',
          'caption': 'Optional caption',
        }
      ];
     
      self.openLightboxModal = function (index) {
        console.log('in openLightboxModal')
        Lightbox.openModal(self.image, index);
      };

    // self.showConfirm = function(ev) {
    //     // Appending dialog to document.body to cover sidenav in docs app
    //     var confirm = $mdDialog.confirm()
    //           .title('Would you like to delete your debt?')
    //           .textContent('All of the banks have agreed to forgive you your debts.')
    //           .ariaLabel('Lucky day')
    //           .targetEvent(ev)
    //           .ok('Please do it!')
    //           .cancel('Sounds like a scam');
    
    //     $mdDialog.show(confirm).then(function() {
    //       self.status = 'You decided to get rid of your debt.';
    //     }, function() {
    //       self.status = 'You decided to keep your debt.';
    //     });
    //   };
    
    self.newMultimedia = AdminService.newMultimedia;
    self.editArtifact = AdminService.editArtifact;
}]);