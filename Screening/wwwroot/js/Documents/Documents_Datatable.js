$(document).ready(function () {
    document.title = 'Documents';

    $("#tblAllDocuments").DataTable({
        "pageLength": 50,
        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": true,
        "stateSave": true,

        "ajax": {
            "url": "/Documents/GetAllDocuments",
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "document_type", "name": "document_type", "autoWidth": true },
            { "data": "uploaded_date", "name": "uploaded_date", "autoWidth": true },
            {
                "data": "document_image",
                "name": "document_image",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_image && row.mimetype == "application/pdf") {
                        return "<a download='" + row.document_type + ".pdf' href='data:application/pdf;base64," + row.document_image + "' class='d-block'>View Document <i class='fa fa-file-pdf'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "text/csv") {
                        return "<a download='" + row.document_type + ".csv' href='data:text/csv;base64," + row.document_image + "' class='d-block'>View Document</a>";
                    }
                    if (row.document_image && row.mimetype == "image/png") {
                        var onClickFunction = "showImageModal('" + row.document_image + "', '" + row.document_type + "')";
                        return "<a onclick=\"" + onClickFunction + "\" class='d-block doc-select'>View Document <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "image/jpg") {
                        var onClickFunction = "showImageModal('" + row.document_image + "', '" + row.document_type + "')";
                        return "<a onclick=\"" + onClickFunction + "\" class='d-block'>View Document <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_image && row.mimetype === "image/jpeg") {
                        var onClickFunction = "showImageModal('" + row.document_image + "', '" + row.document_type + "')";
                        return "<a onclick=\"" + onClickFunction + "\" class='d-block'>View Document <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "application/msword") {
                        return "<a download='" + row.document_type + ".docx' href='data:application/msword;base64," + row.document_image + "' class='d-block'>View Document <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.document_type + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_image + "' class='d-block'>View Document <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.document_type + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_image + "' class='d-block'>View Document <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_image && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.document_type + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_image + "' class='d-block'>View Document <i class='fa fa-file-excel'></i></a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.document_id + "' onchange=funAction('" + row.document_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],
    });

});

// modal.js

function showImageModal(imageBase64, docTitle) {
    // Create modal element
    var modal = $('<div>', {
        class: 'modal fade',
        id: 'ImageModal',
        tabindex: -1,
        role: 'dialog',
        'aria-labelledby': 'exampleModalCenterTitle',
        'aria-hidden': 'true'
    });

    // Create modal dialog
    var modalDialog = $('<div>', {
        class: 'modal-dialog modal-dialog-centered',
        role: 'document'
    });

    // Create modal content
    var modalContent = $('<div>', {
        class: 'modal-content'
    });

    // Create modal header
    var modalHeader = $('<div>', {
        class: 'modal-header'
    });

    // Create modal title
    var modalTitle = $('<h5>', {
        class: 'modal-title',
        text: docTitle
    });

    // Create close button
    var closeButton = $('<button>', {
        type: 'button',
        class: 'close',
        'data-dismiss': 'modal',
        'aria-label': 'Close'
    });

    // Create close button icon
    var closeIcon = $('<span>', {
        'aria-hidden': 'true',
        html: '&times;'
    });

    // Append close icon to close button
    closeButton.append(closeIcon);

    // Append title and close button to modal header
    modalHeader.append(modalTitle, closeButton);

    // Create modal body
    var modalBody = $('<div>', {
        class: 'modal-body'
    });

    // Create image element
    var imageElement = $('<img>', {
        class: 'card-img-top',
        src: 'data:image/jpg;base64, ' + imageBase64,
        alt: ''
    });

    // Append image to modal body
    modalBody.append(imageElement);

    // Append header and body to modal content
    modalContent.append(modalHeader, modalBody);

    // Append content to modal dialog
    modalDialog.append(modalContent);

    // Append dialog to modal
    modal.append(modalDialog);

    // Append modal to body
    $('body').append(modal);

    // Show the modal
    $('#ImageModal').modal('show');
}

