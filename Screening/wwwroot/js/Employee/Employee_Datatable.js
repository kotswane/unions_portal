var ViewQualification = function (id) {
    document.title = 'Qualifactions';

    $("#tblQualification").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetQualification?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "qualification_name", "name": "qualification_name", "autoWidth": true },
            { "data": "institution", "name": "institution", "autoWidth": true },
            { "data": "completion_date", "name": "completion_date", "autoWidth": true },
            {
                "data": "document_copy",
                "name": "document_copy",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_copy && row.mimetype == "image/png") {
                        return "<a download='" + row.qualification_name + ".png' href='data:image/png;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }                  
                    if (row.document_copy && row.mimetype == "image/jpeg") {
                        return "<a download='" + row.qualification_name + ".jpg' href='data:image/jpeg;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }                    
                    if (row.document_copy && row.mimetype == "application/msword") {
                        return "<a download='" + row.qualification_name + ".doc' href='data:application/msword;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }                 
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.qualification_name + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }                   
                    if (row.document_copy && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.qualification_name + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }                   
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.qualification_name + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }                 
                    if (row.document_copy && row.mimetype == "application/pdf") {
                        return "<a download='" + row.qualification_name + ".pdf' href='data:application/pdf;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-pdf'></i></a>";
                    }
                    else {
                        return "<a href='#' class='d-block text-danger' onclick=AddQualiDoc(" + row.qualification_id + ");>Add Document</a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.qualification_id + "' onchange=funAction('" + row.qualification_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewCertification = function (id) {
    document.title = 'Certifications';

    $("#tblCertification").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetCertifications?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "certification_name", "name": "certification_name", "autoWidth": true },
            { "data": "issuing_body", "name": "issuing_body", "autoWidth": true },
            { "data": "certification_date", "name": "certification_date", "autoWidth": true },
            {
                "data": "document_copy",
                "name": "document_copy",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_copy && row.mimetype == "image/png") {
                        return "<a download='" + row.certification_name + ".png' href='data:image/png;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "image/jpeg") {
                        return "<a download='" + row.certification_name + ".jpg' href='data:image/jpeg;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/msword") {
                        return "<a download='" + row.certification_name + ".doc' href='data:application/msword;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.certification_name + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.certification_name + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.certification_name + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }                  
                    if (row.document_copy && row.mimetype == "application/pdf") {
                        return "<a download='" + row.certification_name + ".pdf' href='data:application/pdf;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-pdf'></i></a>";
                    }
                    else {
                        return "<a href='#' class='d-block text-danger' onclick=AddQualiDoc(" + row.certification_id + ");>Add Document</a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.certification_id + "' onchange=funCertiAction('" + row.certification_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewProfMembership = function (id) {
    document.title = 'Professional Memberships';

    $("#tblProfessionalMembership").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetMemberships?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "membership_type", "name": "membership_type", "autoWidth": true },
            { "data": "membership_number", "name": "membership_number", "autoWidth": true },
            { "data": "membership_start_date", "name": "membership_start_date", "autoWidth": true },
            {
                "data": "document_copy",
                "name": "document_copy",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_copy && row.mimetype == "image/png") {
                        return "<a download='" + row.membership_type + ".png' href='data:image/png;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "image/jpeg") {
                        return "<a download='" + row.membership_type + ".jpg' href='data:image/jpeg;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/msword") {
                        return "<a download='" + row.membership_type + ".doc' href='data:application/msword;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.membership_type + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.membership_type + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.membership_type + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/pdf") {
                        return "<a download='" + row.membership_type + ".pdf' href='data:application/pdf;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-pdf'></i></a>";
                    }
                    else {
                        return "<a href='#' class='d-block text-danger' onclick=AddQualiDoc(" + row.membership_type_code + ");>Add Document</a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.membership_id + "' onchange=funMembershipAction('" + row.membership_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewWorkExperience = function (id) {
    document.title = 'Work Experience';

    $("#tblWorkExperience").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetWorkExperience?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "company_name", "name": "company_name", "autoWidth": true },
            { "data": "position", "name": "position", "autoWidth": true },
            { "data": "start_date", "name": "start_date", "autoWidth": true },
            {
                "data": "end_date", "name": "end_date", "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.end_date == "") {
                        return "Current";
                    }
                    else {
                        return row.end_date;
                    }
                }
             },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.experience_id + "' onchange=funExperienceAction('" + row.experience_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewFitAndProperDeclarations = function (id) {
    document.title = 'Fit and Proper Declarations';

    $("#tblFitAndProperDeclarations").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetFitAndProperDeclarations?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "declaration_date", "name": "declaration_date", "autoWidth": true },
            { "data": "declaration_type", "name": "declaration_type", "autoWidth": true },
            { "data": "declaration", "name": "declaration", "autoWidth": true },
            {
                "data": "document_copy",
                "name": "document_copy",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_copy && row.mimetype == "image/png") {
                        return "<a download='" + row.declaration_type + ".png' href='data:image/png;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "image/jpeg") {
                        return "<a download='" + row.declaration_type + ".jpg' href='data:image/jpeg;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/msword") {
                        return "<a download='" + row.declaration_type + ".doc' href='data:application/msword;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.declaration_type + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.declaration_type + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.declaration_type + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/pdf") {
                        return "<a download='" + row.declaration_type + ".pdf' href='data:application/pdf;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-pdf'></i></a>";
                    }
                    else {
                        return "<a href='#' class='d-block text-danger' onclick=AddFitAndProperDoc(" + row.declaration_id + ");>Add Document</a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.declaration_id + "' onchange=funFitAndProperDeclarationAction('" + row.declaration_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewCPDActivities = function (id) {
    document.title = 'CPD Activities';

    $("#tblCPDActivities").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetCPDActivities?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "activity_name", "name": "activity_name", "autoWidth": true },
            { "data": "activity_date", "name": "activity_date", "autoWidth": true },
            { "data": "cpd_points", "name": "cpd_points", "autoWidth": true },
            {
                "data": "document_copy",
                "name": "document_copy",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (row.document_copy && row.mimetype == "image/png") {
                        return "<a download='" + row.activity_name + ".png' href='data:image/png;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "image/jpeg") {
                        return "<a download='" + row.activity_name + ".jpg' href='data:image/jpeg;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-image'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/msword") {
                        return "<a download='" + row.activity_name + ".doc' href='data:application/msword;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.word") {
                        return "<a download='" + row.activity_name + ".docx' href='data:application/vnd.openxmlformats-officedocument.word;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-word'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.ms-excel") {
                        return "<a download='" + row.activity_name + ".xls' href='data:application/vnd.ms-excel;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/vnd.openxmlformats-officedocument.spre") {
                        return "<a download='" + row.activity_name + ".xlsx' href='data:application/vnd.openxmlformats-officedocument.spre;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-excel'></i></a>";
                    }
                    if (row.document_copy && row.mimetype == "application/pdf") {
                        return "<a download='" + row.activity_name + ".pdf' href='data:application/pdf;base64," + row.document_copy + "' class='d-block'>Download <i class='fa fa-file-pdf'></i></a>";
                    }
                    else {
                        return "<a href='#' class='d-block text-danger' onclick=AddCDPActivityDoc(" + row.membership_type_code + ");>Add Document</a>";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.cpd_id + "' onchange=funCDPActivityAction('" + row.cpd_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            },
        ],

        'columnDefs': [
            {
                'targets': [1, 4],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 4
            },
        ]
    });
}

var ViewComplianceMonitoring = function (id) {
    document.title = 'Compliance Monitoring';

    $("#tblComplianceMonitoring").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetComplianceMonitoring?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "monitoring_date", "name": "monitoring_date", "autoWidth": true },
            { "data": "monitoring_outcome", "name": "monitoring_outcome", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.monitoring_id + "' onchange=funComplianceMonitoringAction('" + row.monitoring_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            }
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
        ]
    });
}

var ViewRegulatoryExamination = function (id) {
    document.title = 'Regulatory Examinations';

    $("#tblRegulatoryExam").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetRegulatoryExamination?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "examination_type", "name": "examination_type", "autoWidth": true },
            { "data": "examination_date", "name": "examination_date", "autoWidth": true },
            { "data": "examination_score", "name": "examination_score", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.examination_id + "' onchange=funRegulatoryExamAction('" + row.examination_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            }
        ],

        'columnDefs': [
            {
                'targets': [1, 3],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 3
            },
        ]
    });
}

var ViewClassofBusiness = function (id) {
    document.title = 'Class of Business';

    $("#tblClassofBusiness").DataTable({
        paging: false,
        select: false,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetClassOfBusiness?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "full_name", "name": "full_name", "autoWidth": true },
            { "data": "completion_status", "name": "completion_status", "autoWidth": true },
            { "data": "completion_date", "name": "completion_date", "autoWidth": true },
            { "data": "DOFA", "name": "DOFA", "autoWidth": true },
            { "data": "class_business_code", "name": "class_business_code", "autoWidth": true },
            { "data": "financial_serv_category", "name": "financial_serv_category", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.record_id + "' onchange=funClassOfBusinessAction('" + row.record_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            }
        ],

        'columnDefs': [
            {
                'targets': [1,5],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 5
            },
        ]
    });
}

var ViewEmployeeFinancialServicesCategoryAndClass = function (id) {
    document.title = 'Employee Financial Services Category And Class';

    $("#tblEmployeeFinancialServicesCategoryAndClass").DataTable({
        paging: false,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
        ],
        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": true,
        "bDestroy": true,
        "ajax": {
            "url": "/Employee/GetEmployeeFinancialServicesCategoryAndClass?employeeid=" + id,
            "type": "POST",
            "datatype": "json"
        },

        "columns": [
            { "data": "class_business_code", "name": "class_business_code", "autoWidth": true },
            { "data": "completion_status", "name": "completion_status", "autoWidth": true },
            { "data": "completion_date", "name": "completion_date", "autoWidth": true },
            { "data": "DOFA", "name": "DOFA", "autoWidth": true },
            { "data": "financial_serv_category", "name": "financial_serv_category", "autoWidth": true },
            { "data": "advice", "name": "advice", "autoWidth": true },
            { "data": "intermediary_service", "name": "intermediary_service", "autoWidth": true },
            {
                data: null, render: function (data, type, row) {
                    return "<select id='" + row.record_id + "' onchange=funEmployeeFinancialServicesCategoryAndClassAction('" + row.record_id + "'); class='btn-sm' style='width: 80px;'>" +
                        "<option value='0'>Select Option</option>" +
                        "<option value='1'>Delete</option>" +
                        "</select>";
                }
            }
        ],

        'columnDefs': [
            {
                'targets': [1, 7],
                'orderable': false,
            },
            {
                "width": "10px",
                "targets": 7
            },
        ]
    });
}