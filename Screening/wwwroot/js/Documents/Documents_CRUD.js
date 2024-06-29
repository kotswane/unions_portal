var funAction = function (document_id) {
    var _Action = $("#" + document_id).val();
    if (_Action == 1)
        DeleteDocument(document_id);
    
    $("#" + document_id).prop('selectedIndex', 0);
};


var DeleteDocument = function (id) {
    Swal.fire({
        title: 'Do you want to delete this document?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Documents/DeleteDocument?id=" + id,
                success: function (result) {
                    var message = "Document has been deleted successfully.";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblAllDocuments').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteUserAccount = function (id) {
    Swal.fire({
        title: 'Do you want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/UserManagement/DeleteUserAccount?id=" + id,
                success: function (result) {
                    var message = "User has been deleted successfully. User Id: " + result.Email;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblUserAccount').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var AddDocument = function (id) {
    var url = "/Documents/AddDocuments?id=" + id;
   
    $('#titleMediumModal').html("Add Document");
    
    loadMediumModal(url);

    setTimeout(function () {
        $('#document_type').focus();
    }, 200);
};

var SaveDocument = function () {
    if (!$("#AddDocumentsForm").valid()) {
        return;
    }
    if (!FieldValidation('#document_type')) {
        FieldValidationAlert('#document_type', 'Document Title is Required.', "warning");
        return;
    }
    if (!FieldValidation('#version')) {
        FieldValidationAlert('#version', 'Document Version is Required.', "warning");
        return;
    }

    if (!$("#document_content").valid()) {
        FieldValidationAlert('#document_content', 'Document is Required.', "warning");
        return;
    }

    var _UserProfileId = $("#UserProfileId").val();
    if (_UserProfileId > 0) {
        $("#btnSave").prop('value', 'Adding Document...');
    }
    else {
        $("#btnSave").prop('value', 'Adding Document...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Documents/AddDocuments",
        data: PreparedFormObj(),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#btnSave').prop('disabled', false);
            $("#btnAddProfile").prop('value', 'Save');
            if (result.IsSuccess) {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "success"
                }).then(function () {
                    document.getElementById("btnAddEditUserAccountClose").click();
                    if (result.CurrentURL == "/") {
                        setTimeout(function () {
                            $("#tblAllDocuments").load("/ #tblAllDocuments");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Documents/Index") {
                        $("#tblAllDocuments").load("/Documents/Index #tblAllDocuments");
                    }
                    else {
                        $('#tblAllDocuments').DataTable().ajax.reload();
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
    _FormData.append('document_type', $("#document_type").val())
    _FormData.append('document_type', $("#document_type").val())
    _FormData.append('version', $("#version").val())
    _FormData.append('document_content', $('#document_content')[0].files[0])
 
    return _FormData;
}