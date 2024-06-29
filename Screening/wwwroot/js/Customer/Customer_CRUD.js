var funAction = function (qualification_id) {
    var _Action = $("#" + qualification_id).val();
    if (_Action == 1)
        DeleteQualification(qualification_id);
    $("#" + qualification_id).prop('selectedIndex', 0);
};

var funCertiAction = function (certification_id) {
    var _Action = $("#" + certification_id).val();
    if (_Action == 1)
        DeleteCertification(certification_id);
    $("#" + certification_id).prop('selectedIndex', 0);
};

var funMembershipAction = function (membership_id) {
    var _Action = $("#" + membership_id).val();
    if (_Action == 1)
        DeleteMembership(membership_id);
    $("#" + membership_id).prop('selectedIndex', 0);
};

var funExperienceAction = function (experience_id) {
    var _Action = $("#" + experience_id).val();
    if (_Action == 1)
        DeleteWorkExperience(experience_id);
    $("#" + experience_id).prop('selectedIndex', 0);
};

var funFitAndProperDeclarationAction = function (declaration_id) {
    var _Action = $("#" + declaration_id).val();
    if (_Action == 1)
        DeleteFitAndProperDeclaration(declaration_id);
    $("#" + declaration_id).prop('selectedIndex', 0);
};

var funCDPActivityAction = function (cpd_id) {
    var _Action = $("#" + cpd_id).val();
    if (_Action == 1)
        DeleteCDPActivity(cpd_id);
    $("#" + cpd_id).prop('selectedIndex', 0);
};

var funComplianceMonitoringAction = function (monitoring_id) {
    var _Action = $("#" + monitoring_id).val();
    if (_Action == 1)
        DeleteComplianceMonitoring(monitoring_id);
    $("#" + monitoring_id).prop('selectedIndex', 0);
};

var funRegulatoryExamAction = function (examination_id) {
    var _Action = $("#" + examination_id).val();
    if (_Action == 1)
        DeleteRegulatoryExam(examination_id);
    $("#" + examination_id).prop('selectedIndex', 0);
};

var funClassOfBusinessAction = function (record_id) {
    var _Action = $("#" + record_id).val();
    if (_Action == 1)
        DeleteClassOfBusiness(record_id);
    $("#" + record_id).prop('selectedIndex', 0);
};

var funEmployeeFinancialServicesCategoryAndClassAction = function (record_id) {
    var _Action = $("#" + record_id).val();
    if (_Action == 1)
        DeleteEmployeeFinancialServicesCategoryAndClass(record_id);
    $("#" + record_id).prop('selectedIndex', 0);
};

var DeleteQualification = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Qualification?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteQualification?id=" + id,
                success: function (result) {
                    var message = "Qualification has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblQualification').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteMembership = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Professional Membership?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteMembership?id=" + id,
                success: function (result) {
                    var message = "Professional Membership has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblProfessionalMembership').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteCertification = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Certification?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteCertification?id=" + id,
                success: function (result) {
                    var message = "Certification has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblCertification').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteWorkExperience = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Work Experience?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteWorkExperience?id=" + id,
                success: function (result) {
                    var message = "Work Experience has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblWorkExperience').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteFitAndProperDeclaration = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Fit and Proper Declaration?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteFitAndProperDeclaration?id=" + id,
                success: function (result) {
                    var message = "Fit and Proper Declaration has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblFitAndProperDeclarations').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteCDPActivity = function (id) {
    Swal.fire({
        title: 'Do you want to delete this CDP Activity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteCDPActivity?id=" + id,
                success: function (result) {
                    var message = "CDP Activity has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblCPDActivities').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteRegulatoryExam = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Regulatory Examination?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteRegulatoryExam?id=" + id,
                success: function (result) {
                    var message = "Regulatory Examination has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblRegulatoryExam').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteComplianceMonitoring = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Compliance Monitoring?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteComplianceMonitoring?id=" + id,
                success: function (result) {
                    var message = "Compliance Monitoring has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblComplianceMonitoring').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteEmployeeFinancialServicesCategoryAndClass = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Class of Business?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteEmployeeFinancialServicesCategoryAndClass?id=" + id,
                success: function (result) {
                    var message = "Employee Financial Services Category And Class deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblEmployeeFinancialServicesCategoryAndClass').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};

var DeleteClassOfBusiness = function (id) {
    Swal.fire({
        title: 'Do you want to delete this Class of Business?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Employee/DeleteClassOfBusiness?id=" + id,
                success: function (result) {
                    var message = "Class of Business has been deleted successfully";
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        onAfterClose: () => {
                            $('#tblClassofBusiness').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var AddQualification = function (id) {
    var url = "/Employee/AddQualification?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Qualification");
    }
    else {
        $('#titleMediumModal').html("Add Qualification");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#qualification_type').focus();
    }, 200);
};

var AddCertification = function (id) {
    var url = "/Employee/AddCertifications?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Certification");
    }
    else {
        $('#titleMediumModal').html("Add Certification");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#certification_name').focus();
    }, 200);
};

var AddMembership = function (id) {
    var url = "/Employee/AddMembership?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Professional Membership");
    }
    else {
        $('#titleMediumModal').html("Add Professional Membership");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#membership_number').focus();
    }, 200);
};

var AddWorkExperience = function (id) {
    var url = "/Employee/AddWorkExperience?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Work Experience");
    }
    else {
        $('#titleMediumModal').html("Add Work Experience");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#company_name').focus();
    }, 200);
};

var AddFitAndProperDeclarations = function (id) {
    var url = "/Employee/AddFitAndProperDeclarations?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Fit And Proper Declarations");
    }
    else {
        $('#titleMediumModal').html("Add Fit And Proper Declarations");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#declaration_date').focus();
    }, 200);
};

var AddCPDActivities = function (id) {
    var url = "/Employee/AddCPDActivities?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add CPD Activity");
    }
    else {
        $('#titleMediumModal').html("Add CPD Activity");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#activity_name').focus();
    }, 200);
};

var AddComplianceMonitoring = function (id) {
    var url = "/Employee/AddComplianceMonitoring?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Compliance Monitoring");
    }
    else {
        $('#titleMediumModal').html("AddComplianceMonitoring");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#monitoring_date').focus();
    }, 200);
};

var AddRegulatoryExamination = function (id) {
    var url = "/Employee/AddRegulatoryExamination?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Regulatory Examination");
    }
    else {
        $('#titleMediumModal').html("AddRegulatoryExamination");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#examination_type_code').focus();
    }, 200);
};

var AddClassofBusiness = function (id) {
    var url = "/Employee/AddClassBusiness?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Class of Business");
    }
    else {
        $('#titleMediumModal').html("Edit Class of Business");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#class_business_code').focus();
    }, 200);
};

var AddEmployeeFinancialServicesCategoryAndClass = function (id) {
    var url = "/Employee/AddEmployeeFinancialServicesCategoryAndClass?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html("Add Employee Financial Services Category and Class");
    }
    else {
        $('#titleMediumModal').html("Employee Financial Services Category and Class");
    }
    loadMediumModal(url);

    setTimeout(function () {
        $('#class_business_code').focus();
    }, 200);
};

var AddQualiDoc = function (id) {
    var url = "/Employee/AddQualificationDoc?id=" + id;
    $('#titleMediumModal').html("Qualification Document");
    loadMediumModal(url);

    setTimeout(function () {
        $('#document_copy').focus();
    }, 200);
};

var SaveQualification = function () {
    if (!$("#QualificationForm").valid()) {
        return;
    }

    if (!FieldValidation('#institution')) {
        FieldValidationAlert('#institution', 'Institution is Required.', "warning");
        return;
    }
    if (!FieldValidation('#completion_date')) {
        FieldValidationAlert('#completion_date', 'Year completed is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Qualificaion ...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddQualification",
        data: PreparedQualificationFormObj(),
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
                            $("#tblQualification").load("/ #tblQualification");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblQualification").load("/Employee/Index #tblQualification");
                    }
                    else {
                        $('#tblQualification').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveRegulatoryExam = function () {
    if (!$("#RegulatoryExam").valid()) {
        return;
    }

    if (!FieldValidation('#examination_type_code')) {
        FieldValidationAlert('#examination_type_code', 'Examination type is Required.', "warning");
        return;
    }
    if (!FieldValidation('#examination_date')) {
        FieldValidationAlert('#examination_date', 'Examination date is Required.', "warning");
        return;
    }
    if (!FieldValidation('#examination_score')) {
        FieldValidationAlert('#examination_score', 'Examination score is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Regulatory Examination ...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddRegulatoryExamination",
        data: PreparedRegulatoryExamFormObj(),
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
                            $("#tblRegulatoryExam").load("/ #tblRegulatoryExam");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tbRegulatoryExam").load("/Employee/Index #tblRegulatoryExam");
                    }
                    else {
                        $('#tblRegulatoryExam').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#examination_type_code').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveQualiDocument = function () {
    if (!$("#QualificationDocForm").valid()) {
        return;
    }

    if (!FieldValidation('#document_copy')) {
        FieldValidationAlert('#document_copy', 'Document is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Document...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddQualificationDoc",
        data: PreparedQualificationDocFormObj(),
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
                            $("#tblQualification").load("/ #tblQualification");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblQualification").load("/Employee/Index #tblQualification");
                    }
                    else {
                        $('#tblQualification').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveCertification = function () {
    if (!$("#CertificationForm").valid()) {
        return;
    }

    if (!FieldValidation('#issuing_body')) {
        FieldValidationAlert('#issuing_body', 'Issuing body is Required.', "warning");
        return;
    }
    if (!FieldValidation('#certification_date')) {
        FieldValidationAlert('#certification_date', 'Certification date is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Certification...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddCertifications",
        data: PreparedCertificationFormObj(),
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
                            $("#tblCertification").load("/ #tblCertification");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblCertification").load("/Employee/Index #tblCertification");
                    }
                    else {
                        $('#tblCertification').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveProfessionalMembership = function () {
    if (!$("#ProfessionalMembershipForm").valid()) {
        return;
    }

    if (!FieldValidation('#membership_number')) {
        FieldValidationAlert('#membership_number', 'Membership Number is Required.', "warning");
        return;
    }
    if (!FieldValidation('#membership_start_date')) {
        FieldValidationAlert('#membership_start_date', 'Membership start date is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Professional Membership...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddMembership",
        data: PreparedProfessionalMembershipFormObj(),
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
                            $("#tblProfessionalMembership").load("/ #tblProfessionalMembership");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblProfessionalMembership").load("/Employee/Index #tblProfessionalMembership");
                    }
                    else {
                        $('#tblProfessionalMembership').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveWorkExperience = function () {
    if (!$("#WorkExperienceForm").valid()) {
        return;
    }

    if (!FieldValidation('#company_name')) {
        FieldValidationAlert('#company_name', 'Company name is Required.', "warning");
        return;
    }
    if (!FieldValidation('#position')) {
        FieldValidationAlert('#position', 'Position is Required.', "warning");
        return;
    }
    if (!FieldValidation('#start_date')) {
        FieldValidationAlert('#start_date', 'Start date is Required.', "warning");
        return;
    }
    
    else {
        $("#btnSave").prop('value', 'Adding Work Experience...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddWorkExperience",
        data: PreparedWorkExperienceFormObj(),
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
                            $("#tblWorkExperience").load("/ #tblWorkExperience");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblWorkExperience").load("/Employee/Index #tblWorkExperience");
                    }
                    else {
                        $('#tblWorkExperience').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveFitAndProperDeclarations = function () {
    if (!$("#FitAndProperDeclarationsForm").valid()) {
        return;
    }

    if (!FieldValidation('#declaration_date')) {
        FieldValidationAlert('#declaration_date', 'Declaration date is Required.', "warning");
        return;
    }
    if (!FieldValidation('#declaration_type')) {
        FieldValidationAlert('#declaration_type', 'Declaration Type is Required.', "warning");
        return;
    }
    if (!FieldValidation('#declaration')) {
        FieldValidationAlert('#declaration', 'Declaration is Required.', "warning");
        return;
    }
    
    else {
        $("#btnSave").prop('value', 'Adding Fit And Proper Declarations...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddFitAndProperDeclarations",
        data: PreparedFitAndProperDeclarationsFormObj(),
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
                            $("#tblFitAndProperDeclarations").load("/ #tblFitAndProperDeclarations");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblFitAndProperDeclarations").load("/Employee/Index #tblFitAndProperDeclarations");
                    }
                    else {
                        $('#tblFitAndProperDeclarations').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#institution').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveCPDActivities = function () {
    if (!$("#CPDActivitiesForm").valid()) {
        return;
    }

    if (!FieldValidation('#activity_name')) {
        FieldValidationAlert('#activity_name', 'Activity Name is Required.', "warning");
        return;
    }
    if (!FieldValidation('#activity_date')) {
        FieldValidationAlert('#activity_date', 'Activity Date is Required.', "warning");
        return;
    }
    if (!FieldValidation('#cpd_points')) {
        FieldValidationAlert('#cpd_points', 'CPD Points is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding CPD Activity...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddCPDActivities",
        data: PreparedCPDActivitiesObj(),
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
                            $("#tblCPDActivities").load("/ #tblCPDActivities");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblCPDActivities").load("/Employee/Index #tblCPDActivities");
                    }
                    else {
                        $('#tblCPDActivities').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#activity_name').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveComplianceMonitoring = function () {
    if (!$("#ComplianceMonitoringForm").valid()) {
        return;
    }

    if (!FieldValidation('#monitoring_date')) {
        FieldValidationAlert('#monitoring_date', 'Monitoring Date is Required.', "warning");
        return;
    }
    if (!FieldValidation('#monitoring_outcome')) {
        FieldValidationAlert('#monitoring_outcome', 'Monitoring Outcome is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding ComplianceMonitoring...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddComplianceMonitoring",
        data: PreparedComplianceMonitoringObj(),
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
                            $("#tblComplianceMonitoring").load("/ #tblComplianceMonitoring");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblComplianceMonitoring").load("/Employee/Index #tblComplianceMonitoring");
                    }
                    else {
                        $('#tblComplianceMonitoring').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#activity_name').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveClassOfBusiness = function () {
    if (!$("#ClassBusiness").valid()) {
        return;
    }

    if (!FieldValidation('#class_business_code')) {
        FieldValidationAlert('#class_business_code', 'Class of business is Required.', "warning");
        return;
    }
    if (!FieldValidation('#completion_status')) {
        FieldValidationAlert('#completion_status', 'Completion status is Required.', "warning");
        return;
    }
    if (!FieldValidation('#DOFA')) {
        FieldValidationAlert('#DOFA', 'DOFA is Required.', "warning");
        return;
    }
    if (!FieldValidation('#completion_date')) {
        FieldValidationAlert('#completion_date', 'Completion date is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Adding Class of Business...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddClassBusiness",
        data: PreparedClassBusinessObj(),
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
                            $("#tblClassofBusiness").load("/ #tblClassofBusiness");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblClassofBusiness").load("/Employee/Index #tblClassofBusiness");
                    }
                    else {
                        $('#tblClassofBusiness').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#class_business_code').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var SaveEmployeeFinancialServicesCategoryAndClass = function () {
   /* if (!$("#EmployeeFinancialServicesCategoryAndClass").valid()) {
        return;
    }*/

    if (!FieldValidation('#class_business_code')) {
        FieldValidationAlert('#class_business_code', 'Class of business is Required.', "warning");
        return;
    }
    if (!FieldValidation('#completion_status')) {
        FieldValidationAlert('#completion_status', 'Completion status is Required.', "warning");
        return;
    }
    if (!FieldValidation('#DOFA')) {
        FieldValidationAlert('#DOFA', 'DOFA is Required.', "warning");
        return;
    }
    if (!FieldValidation('#completion_date')) {
        FieldValidationAlert('#completion_date', 'Completion date is Required.', "warning");
        return;
    }
    if (!FieldValidation('#advice')) {
        FieldValidationAlert('#advice', 'Advice is Required.', "warning");
        return;
    }
    if (!FieldValidation('#intermediary_service')) {
        FieldValidationAlert('#intermediary_service', 'Intermediary/Service date is Required.', "warning");
        return;
    }
    else {
        $("#btnSave").prop('value', 'Employee Financial Services Category And Class...');
    }
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Employee/AddEmployeeFinancialServicesCategoryAndClass",
        data: PreparedEmployeeFinancialServicesCategoryAndClassObj(),
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
                            $("#tblEmployeeFinancialServicesCategoryAndClass").load("/ #tblEmployeeFinancialServicesCategoryAndClass");
                        }, 1000);
                    }
                    else if (result.CurrentURL == "/Employee/Index") {
                        $("#tblEmployeeFinancialServicesCategoryAndClass").load("/Employee/Index #tblEmployeeFinancialServicesCategoryAndClass");
                    }
                    else {
                        $('#tblEmployeeFinancialServicesCategoryAndClass').DataTable().ajax.reload();
                    }
                });
            }
            else {
                Swal.fire({
                    title: result.AlertMessage,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#class_business_code').focus();
                    }, 400);
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}
var PreparedQualificationFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('qualification_type', $("#qualification_type").val())
    _FormData.append('institution', $("#institution").val())
    _FormData.append('completion_date', $('#completion_date').val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedQualificationDocFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('qualification_id', $("#qualification_id").val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedCertificationFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('certification_name', $("#certification_name").val())
    _FormData.append('issuing_body', $("#issuing_body").val())
    _FormData.append('certification_date', $('#certification_date').val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedProfessionalMembershipFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('membership_type_code', $("#membership_type_code").val())
    _FormData.append('membership_number', $("#membership_number").val())
    _FormData.append('membership_start_date', $('#membership_start_date').val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedWorkExperienceFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('company_name', $("#company_name").val())
    _FormData.append('position', $("#position").val())
    _FormData.append('start_date', $('#start_date').val())
    _FormData.append('end_date', $('#end_date').val())
    _FormData.append('total_years_experience', $('#total_years_experience').val())

    return _FormData;
}

var PreparedFitAndProperDeclarationsFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('declaration_date', $("#declaration_date").val())
    _FormData.append('declaration_type', $("#declaration_type").val())
    _FormData.append('declaration', $('#declaration').val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedCPDActivitiesObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('activity_name', $("#activity_name").val())
    _FormData.append('activity_date', $("#activity_date").val())
    _FormData.append('cpd_points', $('#cpd_points').val())
    _FormData.append('document_copy', $('#document_copy')[0].files[0])

    return _FormData;
}

var PreparedComplianceMonitoringObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('monitoring_date', $("#monitoring_date").val())
    _FormData.append('monitoring_outcome', $("#monitoring_outcome").val())

    return _FormData;
}

var PreparedRegulatoryExamFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('examination_type_code', $("#examination_type_code").val())
    _FormData.append('examination_date', $("#examination_date").val())
    _FormData.append('examination_score', $("#examination_score").val())

    return _FormData;
}

var PreparedClassBusinessObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('class_business_code', $("#class_business_code").val())
    _FormData.append('completion_status', $("#completion_status").val())
    _FormData.append('financial_serv_category', $("#financial_serv_category").val())
    _FormData.append('completion_date', $("#completion_date").val())
    _FormData.append('DOFA', $("#DOFA").val())

    return _FormData;
}

var PreparedEmployeeFinancialServicesCategoryAndClassObj = function () {
    var _FormData = new FormData()
    _FormData.append('employee_id', $("#employee_id").val())
    _FormData.append('class_business_code', $("#class_business_code").val())
    _FormData.append('completion_status', $("#completion_status").val())
    _FormData.append('financial_serv_category', $("#financial_serv_category").val())
    _FormData.append('completion_date', $("#completion_date").val())
    _FormData.append('DOFA', $("#DOFA").val())
    _FormData.append('advice', $("#advice").val())
    _FormData.append('intermediary_service', $("#intermediary_service").val())

    return _FormData;
}