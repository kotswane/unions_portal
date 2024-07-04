$(document).ready(function () {
    document.title = 'Employer List';

    $("#tblEmployers").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "searching": true, // Search Box
        "orderMulti": false,
        "stateSave": true,
        "ajax": {
            "url": "/Employer/GetAllEmployers",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "EmployerId", "name": "EmployerId", "class": "userId" },
            { "data": "EmployerName", "name": "EmployerName", "autoWidth": true },
            { "data": "EmployerAddress", "name": "EmployerAddress", "autoWidth": true },
            { "data": "EmployerEmail", "name": "EmployerEmail", "autoWidth": true },
            { "data": "EmployerContactNumber", "name": "EmployerContactNumber", "autoWidth": true },
            {
                data: null,
                render: function (data, type, row) {
                    return "<select id='" + row.EmployerId + "' onchange='funAction(" + row.EmployerId + ");' class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Edit</option>" +
                        "<option value='4'>Delete</option>" +
                        "</select>";
                }
            },
        ],
        'columnDefs': [
            {
                'targets': [0, 5],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 5
            },
        ],
        "lengthMenu": [[20, 15, 25, 50, 100, 200], [20, 15, 25, 50, 100, 200]]
    });
});
