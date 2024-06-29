$(document).ready(function () {
   
    document.title = 'Gift Registry';

    $("#tblGiftRegistry").DataTable({
        paging: false,
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
            "url": "/GiftRegistry/GetGiftRegistry",
            "type": "POST",
            "datatype": "json"
        },

        "columns": [  
            {
                "data": "DateReceived",
                "name": "DateReceived",
                "autoWidth": true,
              /*  "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getFullYear() + "/" + (month.length > 1 ? month : month) + "/"  + date.getDate();
                }*/
            },
            { "data": "ReceivedFrom", "name": "ReceivedFrom", "autoWidth": true },
            { "data": "Description", "name": "Description", "autoWidth": true },
            { "data": "EstimatedMonetaryValue", "name": "EstimatedMonetaryValue", "autoWidth": true },
            { "data": "ReceivedBy", "name": "ReceivedBy", "autoWidth": true },
            { "data": "Comments", "name": "Comments", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.GiftID + "' onchange=funAction('" + row.GiftID + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Edit</option>" +
                        "<option value='2'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 6],
                'orderable': true,
            },
            {
                "width": "10px",
                "targets": 6
            },
        ],

        "lengthMenu": [[20, 15, 25, 50, 100, 200], [20, 15, 25, 50, 100, 200]]
    });

});
