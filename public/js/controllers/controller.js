angular.module('contacts')
    .controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
        console.log("Hello World from controller");


        var refresh = function() {
            $http.get('/contactList').success(function(response) {

                console.log("got data successfully");
                $scope.contactList = response;
                $scope.contact = '';

            })
        };



        refresh();
        $scope.addContact = function() {

            console.log($scope.contact);
            $http.post('/contactList', $scope.contact)
            			.success(function(response) {
			                console.log(response);
                			refresh();
            })			.error(function(response){

            	console.log('got here in failure callback from server' + response);
            	alert("this email id does not exists");
            	$scope.contact.email = '';

            });




        };

        $scope.remove = function(id) {

            console.log('removing with the id as' + id);
            $http.delete('/contactList/' + id).success(function(response) {


                console.log(response);
                refresh();
            });




        };

        $scope.edit = function(id) {

            console.log('editing with the id as' + id);
            $http.get('/contactList/' + id).success(function(response) {

            	$scope.contact = response;
                console.log(response);
               
            });




        };
        $scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};


    }]);