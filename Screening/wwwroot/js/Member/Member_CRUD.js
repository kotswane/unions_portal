var funAction = function (actionId) {
    var _Action = $("#" + actionId).val();
    if (_Action == 1)
        AddEditMember(actionId);
    else if (_Action == 4)
        DeleteMember(actionId);
    $("#" + actionId).prop('selectedIndex', 0);
};


var DeleteMember = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Member?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Member/DeleteMember?id=" + id,
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


var AddEditMember = function (id) {
    var url = "/Member/AddEditMember?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Edit Member");
    }
    else {
        $('#titleMediumModal').html("Add Member");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#Member_MemberFirstname').focus();
    }, 200);
};

var SaveMember = function () {

    if (!FieldValidation('#Member_MemberFirstname')) {
        FieldValidationAlert('#Member_MemberFirstname', 'Member Name is Required.', "warning");
        return;
    }
    if (!FieldValidation('#Member_MemberSurname')) {
        FieldValidationAlert('#Member_MemberSurname', 'Member Surname is Required.', "warning");
        return;
    }
    if (!FieldValidation('#Member_MemberIdNumber')) {
        FieldValidationAlert('#Member_MemberIdNumber', 'Member ID number is Required.', "warning");
        return;
    }
    if (!FieldValidation('#Member_MemberContactNumber')) {
        FieldValidationAlert('#Member_MemberContactNumber', 'Member Contact Number is Required.', "warning");
        return;
    }
    if (!FieldValidation('#Member_MemberEmployerId')) {
        FieldValidationAlert('#Member_MemberEmployerId', 'Employer Name is Required.', "warning");
        return;
    }
  
    var _MemberId = $("#Member_MemberId").val();
    if (_MemberId == undefined) {
        _MemberId = $("#MemberId").val();
    }
    
    if (_MemberId > 0) {
        $("#btnSave").prop('value', 'Updating Member');
    }
    else {
        $("#btnSave").prop('value', 'Creating Member');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Member/AddEditMember?id=" + _MemberId,
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
                    document.getElementById("btnAddEditMemberClose").click();
                    if ((result.CurrentURL == "/") || ("/Member/Index")){
                        setTimeout(function () {
                            $('#tblBranchMembers').DataTable().ajax.reload();
                        }, 1000);
                    }
                    else {
                        $('#tblMember').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#Member_MemberFirstname').focus();
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
    var _MemberId = $("#Member_MemberId").val();
    if (_MemberId == undefined) {
        _MemberId = $("#MemberId").val();
    }
    _FormData.append('MemberId', _MemberId)
    _FormData.append('MemberFirstname', $("#Member_MemberFirstname").val())
    _FormData.append('MemberSurname', $("#Member_MemberSurname").val())
    _FormData.append('MemberMiddleName', $("#Member_MemberMiddleName").val())
    _FormData.append('MemberIdNumber', $("#Member_MemberIdNumber").val())
    _FormData.append('MemberContactNumber', $("#Member_MemberContactNumber").val())
    _FormData.append('MemberAddress', $("#Member_MemberAddress").val())
    _FormData.append('MemberEmployerId', $("#Member_MemberEmployerId").val())
    return _FormData;
}
