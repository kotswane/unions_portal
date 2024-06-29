var funAction = function (GiftID) {
    var _Action = $("#" + GiftID).val();
    if (_Action == 1)
        AddEditGiftRegistry(GiftID);
    else if (_Action == 2)
        DeleteGiftRegistryEntry(GiftID);
};

var DeleteGiftRegistryEntry = function (id) {
    Swal.fire({
        title: 'Are you sure you want to delete this gift entry?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/GiftRegistry/DeleteGiftRegistry?id=" + id,
                success: function (result) {
                    var message = "Gift registry entry deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblGiftRegistry').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var AddEditGiftRegistry = function (id) {
    var url = "/GiftRegistry/RegisterGift?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Edit Gift Registry");
    }
    else {
        $('#titleMediumModal').html("Add Gift Registry");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#ReceivedFrom').focus();
    }, 200);
};

var SaveGiftRegistry = function () {
    if (!$("#GiftRegistryForm").valid()) {
        return;
    }

    if (!FieldValidation('#DateReceived')) {
        FieldValidationAlert('#DateReceived', 'Date Received is Required.', "warning");
        return;
    }
    if (!FieldValidation('#ReceivedFrom')) {
        FieldValidationAlert('#ReceivedFrom', 'Received From is Required.', "warning");
        return;
    }

    if (!$("#Description").valid()) {
        FieldValidationAlert('#Description', 'Description is Required.', "warning");
        return;
    }

    if (!$("#EstimatedMonetaryValue").valid()) {
        FieldValidationAlert('#EstimatedMonetaryValue', 'Estimated Monetary Value is Required.', "warning");
        return;
    }

    if (!$("#ReceivedBy").valid()) {
        FieldValidationAlert('#ReceivedBy', 'Received By is Required.', "warning");
        return;
    }

    if (!$("#Comments").valid()) {
        FieldValidationAlert('#Comments', 'Comments is Required.', "warning");
        return;
    }

    else {
        $("#btnSave").prop('value', 'Adding Gift Registry');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/GiftRegistry/RegisterGift",
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
                            $("#tblGiftRegistry").load("/ #tblGiftRegistry");
                        }, 1000);
                    }
                    else {
                        $('#tblGiftRegistry').DataTable().ajax.reload();
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

var SaveEditGiftRegistry = function () {
    if (!$("#GiftRegistryForm").valid()) {
        return;
    }

    if (!FieldValidation('#DateReceived')) {
        FieldValidationAlert('#DateReceived', 'Date Received is Required.', "warning");
        return;
    }
    if (!FieldValidation('#ReceivedFrom')) {
        FieldValidationAlert('#ReceivedFrom', 'Received From is Required.', "warning");
        return;
    }

    if (!$("#Description").valid()) {
        FieldValidationAlert('#Description', 'Description is Required.', "warning");
        return;
    }

    if (!$("#EstimatedMonetaryValue").valid()) {
        FieldValidationAlert('#EstimatedMonetaryValue', 'Estimated Monetary Value is Required.', "warning");
        return;
    }

    if (!$("#ReceivedBy").valid()) {
        FieldValidationAlert('#ReceivedBy', 'Received By is Required.', "warning");
        return;
    }

    if (!$("#Comments").valid()) {
        FieldValidationAlert('#Comments', 'Comments is Required.', "warning");
        return;
    }

    else {
        $("#btnSave").prop('value', 'Adding Gift Registry');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/GiftRegistry/EditRegisterGift",
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
                            $("#tblGiftRegistry").load("/ #tblGiftRegistry");
                        }, 1000);
                    }
                    else {
                        $('#tblGiftRegistry').DataTable().ajax.reload();
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
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('DateReceived', $("#DateReceived").val())
    _FormData.append('ReceivedFrom', $("#ReceivedFrom").val())
    _FormData.append('Description', $("#Description").val())
    _FormData.append('EstimatedMonetaryValue', $("#EstimatedMonetaryValue").val())
    _FormData.append('ReceivedBy', $("#ReceivedBy").val())
    _FormData.append('Comments', $("#Comments").val())
    _FormData.append('CurrentURL', $("#CurrentURL").val())
    return _FormData;
}
