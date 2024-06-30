$(document).ready(function () {
    document.title = 'Member List';

    $("#tblMember").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": true, // Search Box
        "orderMulti": false,
        "stateSave": true,
        "ajax": {
            "url": "/Member/GetAllBranchMembers",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "MemberId", "name": "MemberId", "class": "userId" },
            { "data": "MemberFirstname", "name": "MemberFirstname", "autoWidth": true },
            { "data": "MemberMiddleName", "name": "MemberMiddleName", "autoWidth": true },
            { "data": "MemberSurname", "name": "MemberSurname", "autoWidth": true },
            { "data": "MemberIdNumber", "name": "MemberIdNumber", "autoWidth": true },
            { "data": "MemberAddress", "name": "MemberAddress", "autoWidth": true },
            { "data": "MemberContactNumber", "name": "MemberContactNumber", "autoWidth": true },
            { "data": "Employer", "name": "Employer", "autoWidth": true },
            { "data": "Branch", "name": "Branch", "autoWidth": true },
            {
                data: null,
                render: function (data, type, row) {
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
