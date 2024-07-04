var funAction = function (actionId) {
    var _Action = $("#" + actionId).val();
    if (_Action == 1)
        CreateEmployer(actionId);
    else if (_Action == 4)
        DeleteEmployer(actionId);
    $("#" + actionId).prop('selectedIndex', 0);
};


var DeleteEmployer = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Employer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Employer/DeleteEmployer?id=" + id,
                success: function (result) {
                    var message = "Member has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblBranchMembers').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var CreateEmployer = function (id) {
    var url = "/Employer/CreateEmployer?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Edit Employer");
    }
    else {
        $('#titleMediumModal').html("Add Employer");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#EmployerName').focus();
    }, 200);
};

var SaveEmployer = function () {

    if (!FieldValidation('#EmployerName')) {
        FieldValidationAlert('#EmployerName', 'Employer Name is Required.', "warning");
        return;
    }
    if (!FieldValidation('#EmployerAddress')) {
        FieldValidationAlert('#EmployerAddress', 'Employer Address is Required.', "warning");
        return;
    }
    if (!FieldValidation('#EmployerEmail')) {
        FieldValidationAlert('#EmployerEmail', 'Employer email is Required.', "warning");
        return;
    }
    if (!FieldValidation('#EmployerContactNumber')) {
        FieldValidationAlert('#EmployerContactNumber', 'Employer Contact Number is Required.', "warning");
        return;
    }
  
    var _MemberId = $("#EmployerId").val();
   
    if (_MemberId > 0) {
        $("#btnSave").prop('value', 'Updating Employer');
    }
    else {
        $("#btnSave").prop('value', 'Creating Employer');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employer/CreateEmployer?id=" + _MemberId,
        data: PreparedFormObj(),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#btnSave').prop('disabled', false);
            $("#btnAddMember").prop('value', 'Save');
            if (result.IsSuccess) {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "success"
                }).then(function () {
                    document.getElementById("btnAddEditEmployerClose").click();
                    if ((result.CurrentURL == "/") || ("/Employer/Index")){
                        setTimeout(function () {
                            $('#tblEmployers').DataTable().ajax.reload();
                        }, 1000);
                    }
                    else {
                        $('#tblEmployers').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#EmployerName').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}


var PreparedFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('EmployerId', $("#EmployerId").val())
    _FormData.append('EmployerName', $("#EmployerName").val())
    _FormData.append('EmployerAddress', $("#EmployerAddress").val())
    _FormData.append('EmployerEmail', $("#EmployerEmail").val())
    _FormData.append('EmployerContactNumber', $("#EmployerContactNumber").val())
    return _FormData;
}
