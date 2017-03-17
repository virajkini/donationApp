var app = angular.module("donation_control",[]);
app.controller("execute",["$scope",function($scope) {


    var localstorage_key = "amount";
    var total_donated_amt = 0;
    var donation_storage=[];
    var storage =[];
    var donor_count = 0;
    $scope.remaining_amt=1000;

    //uncomment below code to clear local storage
    //localstorage.clear()

    donation_storage = (JSON.parse(localStorage.getItem(localstorage_key)));


// initialize donated amount and donor count values

    if (donation_storage!=null ) {

        total_donated_amt =donation_storage[0];
        $scope.remaining_amt = 1000 - total_donated_amt;

        donor_count =donation_storage[1];
        $scope.donorcount = donor_count;

    }
    else
    {
        total_donated_amt = 0;
        $scope.donorcount = '';
        donor_count = 0;

    }

    var updateArrowAndProgressbar = function() {

        var progresswidth = total_donated_amt / 10 + "%";

        $scope.barstyle = {"width": progresswidth};

        var arrow_margin = (total_donated_amt / 10) + (100 - (total_donated_amt / 10)) / 2;

        //just to make sure arrow doesnot go out of boundary.
        if (arrow_margin > 97)
            arrow_margin = 97;

        $scope.arrowstyle = {"margin-left": arrow_margin + "%"};

    }

    updateArrowAndProgressbar();

    // when the give now button is clicked
    $scope.clicked= function(){

        total_donated_amt = total_donated_amt + parseFloat($scope.amount);

//save to local storage
        storage[0] = total_donated_amt;
        donor_count++;
        storage[1]=donor_count;
        donation_storage = storage;
        $scope.donorcount = donor_count;


        localStorage.setItem(localstorage_key,JSON.stringify(donation_storage));

        updateArrowAndProgressbar();


        $scope.remaining_amt = 1000-total_donated_amt;
        $scope.amount="";

    };


//below function to monitor if the user enter amount greater than the required amount and then disable the give now button.
    $scope.$watch('amount   ', function() {

        if (parseFloat($scope.amount)>($scope.remaining_amt) ) {
            $scope.amountvalue = true;
            $scope.reg.$invalid = true;
        }
        else {
            $scope.amountvalue = false;
            $scope.reg.$invalid = false;

        }
    });

    //when the save for later button is clicked.
    $scope.save_later =function()
    {
        swal(
            'Saved','',
            'success'
        );
    };
}]);
