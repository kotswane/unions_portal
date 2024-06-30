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
                            $('#tblMember').DataTable().ajax.reload();
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
        $('#MemberName').focus();
    }, 200);
};

var SaveMember = function () {

    if (!FieldValidation('#MemberName')) {
        FieldValidationAlert('#MemberName', 'Member Name is Required.', "warning");
        return;
    }
  
    var _MemberId = $("#MemberId").val();
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
                            $('#tblMember').DataTable().ajax.reload();
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
                        $('#Email').focus();
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
    _FormData.append('MemberId', $("#MemberId").val())
    _FormData.append('MemberName', $("#MemberName").val())
    
    return _FormData;
}
