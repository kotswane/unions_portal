$(document).ready(function () {
    document.title = 'Member List';

    $("#tblBranchMembers").DataTable({
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
            "url": "/Member/GetAllBrancMembers",
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
            { "data": "MemberEmployer", "name": "MemberEmployerId", "autoWidth": true },
            { "data": "MemberBranch", "name": "MemberBranchId", "autoWidth": true },
            {
                data: null,
                render: function (data, type, row) {
                    return "<select id='" + row.MemberId + "' onchange='funAction(" + row.MemberId + ");' class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Edit</option>" +
                        "<option value='4'>Delete</option>" +
                        "</select>";
                }
            },
        ],
        'columnDefs': [
            {
                'targets': [0, 6],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 6
            },
        ],
        "lengthMenu": [[20, 15, 25, 50, 100, 200], [20, 15, 25, 50, 100, 200]]
    });
});
