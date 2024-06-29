$(document).ready(function () {
   
    document.title = 'Employees';

    $("#tblEmployees").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/Employees/GetEmployees",
            "type": "POST",
            "datatype": "json"
        },

        "columns": [  
           {
                data: "employee_id", "name": "employee_id", render: function (data, type, row) {
                    return "<a href='#' onclick=ViewEmployeeDetails('" + row.employee_id + "');>" + row.full_name + "</a>";
                }
            },
            { "data": "identity_number", "name": "identity_number", "autoWidth": true },
            { "data": "contact_phone", "name": "contact_phone", "autoWidth": true },
            { "data": "contact_email", "name": "contact_email", "autoWidth": true },
            { "data": "gender", "name": "gender", "autoWidth": true },
            { "data": "nationality", "name": "nationality", "autoWidth": true },
            { "data": "employment_status", "name": "employment_status", "autoWidth": true },
            { "data": "employment_start_date", "name": "employment_start_date", "autoWidth": true },
            { "data": "job_title", "name": "job_title", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.employee_id + "' onchange=funAction('" + row.employee_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='2'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 9],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 9
            },
        ],

        "lengthMenu": [[20, 15, 25, 50, 100, 200], [20, 15, 25, 50, 100, 200]]
    });

});
