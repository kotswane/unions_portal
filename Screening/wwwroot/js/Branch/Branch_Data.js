$(document).ready(function () {
    document.title = 'Branch List';

    $("#tblBranch").DataTable({
        paging: true,
        select: true,
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
            "url": "/Branch/GetAllBranches",
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            //{ "data": "BranchId", "name": "BranchId", "class": "userId" },
            {
                data: "BranchId", "name": "BranchId", render: function (data, type, row) {
                    return "<a href='#' onclick=ViewBranchDetails('" + row.BranchId + "');>" + row.BranchName + "</a>";
                }
            },
            { "data": "BranchName", "name": "BranchName", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.BranchId + "' onchange=funAction('" + row.BranchId + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Edit</option>" +
                        "<option value='4'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 2],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 2
            },
        ],

        "lengthMenu": [[20, 15, 25, 50, 100, 200], [20, 15, 25, 50, 100, 200]]
    });

});
