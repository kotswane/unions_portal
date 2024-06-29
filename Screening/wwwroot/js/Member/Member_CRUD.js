var funAction = function (actionId) {
    var _Action = $("#" + actionId).val();
    if (_Action == 1)
        AddEditBranch(actionId);
    else if (_Action == 4)
        DeleteBranch(actionId);
    $("#" + actionId).prop('selectedIndex', 0);
};


var DeleteBranch = function (id) {
    Swal.fire({
        title: 'Do you want to delete this branch?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Branch/DeleteBranch?id=" + id,
                success: function (result) {
                    var message = "Branch has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblBranch').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var AddEditBranch = function (id) {
    var url = "/Branch/AddEditBranch?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Edit Branch");
    }
    else {
        $('#titleMediumModal').html("Add Branch");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#BranchName').focus();
    }, 200);
};

var SaveBranch = function () {

    if (!FieldValidation('#BranchName')) {
        FieldValidationAlert('#BranchName', 'Branch Name is Required.', "warning");
        return;
    }
  
    var _BranchId = $("#BranchId").val();
    if (_BranchId > 0) {
        $("#btnSave").prop('value', 'Updating Branch');
    }
    else {
        $("#btnSave").prop('value', 'Creating Branch');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Branch/AddEditBranch?id=" + _BranchId,
        data: PreparedFormObj(),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#btnSave').prop('disabled', false);
            $("#btnAddBranch").prop('value', 'Save');
            if (result.IsSuccess) {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "success"
                }).then(function () {
                    document.getElementById("btnAddEditBranchClose").click();
                    if ((result.CurrentURL == "/") || ("/Branch/Index")){
                        setTimeout(function () {
                            $('#tblBranch').DataTable().ajax.reload();
                        }, 1000);
                    }
                    else {
                        $('#tblBranch').DataTable().ajax.reload();
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
    _FormData.append('BranchId', $("#BranchId").val())
    _FormData.append('BranchName', $("#BranchName").val())
    
    return _FormData;
}
