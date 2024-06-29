var ViewDocuments = function (id) {
    $('#documentsContainer').hide();
    $('#spinner').show();
    $.ajax({
        type: 'POST',
        url: '/Customer/ViewCustomerDocuments?customer_id=' + id,
        dataType: 'json',
        success: function (response) {
            $('#spinner').hide();
            $('#documentsContainer').show();
            if (response != null) {
                var data = response.data;

                var documents = data.Documents;
                var address = data.Address[0];
                var banking = data.Banking[0];

                var idDiv = '<div class="row">';
                var proofDiv = '';
                var bankDiv = '';


                $.each(documents, function (index, docx) {
                    //idDiv += '';
                    if (docx.document_type == "SA_ID") {
                        idDiv += '<div class="document-holder col-lg-6">';
                        idDiv += '<h5>SA ID Document</h5>';
                        if (docx.mime_type && docx.mime_type !== "application/pdf") {
                            idDiv += '<img height="400" width="100%" src="data:image/png;base64,' + docx.base64image + '"/>';
                        } else if (docx.mime_type == "application/pdf") {
                            idDiv += '<embed width="100%" height="400" name="plugin" src="data:application/pdf;base64,' + docx.base64image + '"/>';
                        }
                        idDiv += '<p>Date Uploaded: ' + docx.uploaded_date + '</p>';
                        idDiv += '</div>';
                    }
                    if (docx.document_type == "HOME_AFFAIRS_PHOTO") {
                        idDiv += '<div class="document-holder col-lg-6">';
                        idDiv += '<h5>Home Affairs Image</h5>';
                        idDiv += '<img height="400" src="data:image/png;base64,' + docx.base64image + '"/>';
                        idDiv += '</div>';
                    }

                    if (docx.document_type == "PROOF_OF_ADDRESS") {
                        proofDiv += '<div class="row">';
                        proofDiv += '<div class="document-holder col-lg-6">';
                        proofDiv += '<h5>Proof of Address</h5>';
                        if (docx.mime_type && docx.mime_type !== "application/pdf") {
                            proofDiv += '<img height="400" width="100%" src="data:image/png;base64,' + docx.base64image + '"/>';
                        } else if (docx.mime_type == "application/pdf") {
                            proofDiv += '<embed width="100%" height="400" name="plugin" src="data:application/pdf;base64,' + docx.base64image + '"/>';
                        }
                        proofDiv += '<p>Date Uploaded: ' + docx.uploaded_date + '</p>';
                        proofDiv += '</div>';
                        proofDiv += '<div class="document-holder col-lg-6">';
                        proofDiv += '<h5>Residential Address</h5>';
                        proofDiv += '<h6>' + address.residential_address + '</h6>';
                        proofDiv += '</div>';
                        proofDiv += '</div>';
                    }

                    if (docx.document_type == "BANK_STATEMENT") {
                        bankDiv += '<div class="row">';
                        bankDiv += '<div class="document-holder col-lg-6">';
                        bankDiv += '<h5>Bank Statement</h5>';
                        if (docx.mime_type && docx.mime_type !== "application/pdf") {
                            bankDiv += '<img height="400" width="100%" src="data:image/png;base64,' + docx.base64image + '"/>';
                        } else if (docx.mime_type == "application/pdf") {
                            bankDiv += '<embed width="100%" height="400" name="plugin" src="data:application/pdf;base64,' + docx.base64image + '"/>';
                        }
                        bankDiv += '<p>Date Uploaded: ' + docx.uploaded_date + '</p>';
                        bankDiv += '</div>';
                        bankDiv += '<div class="document-holder col-lg-6">';
                        bankDiv += '<h5>Banking Details</h5>';
                        bankDiv += '<p><strong>Bank Name</strong>: ' + banking.bank_name + '<br />';
                        bankDiv += '<strong>Account Number</strong>: ' + banking.bank_account_number + '<br />';
                        bankDiv += '<strong>Branch Code</strong>: ' + banking.branch_code + '</p>';
                        bankDiv += '</div>';
                        bankDiv += '</div>';
                    }

                });

                idDiv += '</div>';
                $('#idverification').html(idDiv).show();
                $('#ficaverification').html(proofDiv).show();
                $('#bankaccountverification').html(bankDiv).show();
            }
        },
        error: function (error) {
            console.error('Error:', error);
            $('#spinner').hide();
        }
    });
}

var VerifyClient = function (id) {
    $('#verify-spinner').show();
    $.ajax({
        type: 'POST',
        url: '/Customer/VerifyClient?id_number=' + id,
        dataType: 'json',
        success: function (data) {
            $('#verify-spinner').hide();
            var customerData = data.data.data.Consumer[0].RealTimeIDV;
            var customerImage = data.data.data.Consumer[0].BioMetricVerificationResult;
            var postDiv = $('<table class="CustomBlueTable">');
            postDiv.append('<tr><td colspan="2"><img height="400" src="data:image/png;base64,' + customerImage.Base64StringJpeg2000Image + '"/></td></tr>');
            postDiv.append('<tr>');
            postDiv.append('<th style="width: 35%;">ID Number Match Status</th><td>' + customerData.IDNOMatchStatus + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th style="width: 35%;">Home Affairs ID Number</th><td>' + customerData.HAIDNO + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>Name</th><td>' + customerData.HANames + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>Surname</th><td>' + customerData.HASurname + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>Gender</th><td>' + customerData.HAGender + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>Deceased Status</th><td>' + customerData.HADeceasedStatus + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>ID Book Issued Date</th><td>' + customerData.HAIDBookIssuedDate + '</td>');
            postDiv.append('</tr>');
            postDiv.append('<tr>');
            postDiv.append('<th>ID Card Date</th><td>' + customerData.HAIDCardDate + '</td>');
            postDiv.append('</tr>');
            postDiv.append('</table>');
            $('#verificationContainer').append(postDiv);
            ('#documentsContainer').append("");
        },
        error: function (error) {
            console.error('Error:', error);
            $('#verify-spinner').hide();
        }
    });
}

var VerifyAccountNumber = function (id_number, full_name, bank_account_number) {
    $('#spinnerAccount').show();
    $.ajax({
        type: 'POST',
        url: '/Customer/VerifyAccountNumber?id_number=' + id_number + "&full_name=" + full_name + "&bank_account_number=" + bank_account_number,
        dataType: 'json',
        success: function (data) {
            $('#spinnerAccount').hide();
            var postDiv = $('<div class="alert alert-info">');
            postDiv.append('<h4>This account belongs to: <span style="capitalize">' + data.data.full_name + '</span></h4>');
            $('#AccountNumberVerificationContainer').append(postDiv);
        },
        error: function (error) {
            console.error('Error:', error);
            $('#spinnerAccount').hide();
        }
    });
}
$('#scrreningForm').submit(function (e) {
    e.preventDefault();
    $('#mainResultsContainer').empty();
    $('#screeningContainer').empty();
    $('#detailedResults').empty();
    $('#detailedResults').html(detailedResults).hide();
    $('#comments').html(comments).hide();

    var formData = $(this).serialize();
    // console.log(formData);
    $('#spinnerScreening').show();
    $('#scrreningForm').hide();

    var formData = {
        entity_name: $('#entity_name').val(),
        entitytype: $('#entitytype').val(),
        fuzziness: $('#fuzziness').val(),
        country: $('#country').val(),
        birth_year: $('#birth_year').val(),
        client_ref: $('#client_ref').val()
    };

    $.ajax({
        type: 'POST',
        url: '/screening?entity_name=' + entity_name + "&client_ref=" + client_ref + "&entitytype=" + entitytype + "&fuzziness=" + fuzziness + "&country=" + country + "&birth_year=" + birth_year,
        data: formData,
        success: function (response) {
            console.log(response);
            if (response.data != null && response.data.content.data.total_hits > 0) {
                $('#spinnerScreening').hide();

                generateScreeningResults(response);
            }
            else {
                var mainResults = '<div class="screening-mainresults">';
                mainResults += '<button id="searchagain" class="btn btn-sm btn-success" style="margin-right:5px;">Back</button>';
                mainResults += '<hr />';
                mainResults += '</div>';
                $('#screeningContainer').append("<hr /><div class='alert alert-warning'><p>No matches found</p></div>");
                $('#spinnerScreening').hide();
            }
        },
        error: function (xhr, status, error) {
            $('#spinnerScreening').hide();
            console.error('Error:', error);
        }
    });
});

$('#administrationForm').submit(function (e) {
    e.preventDefault();

    var formData = $(this).serialize();
    // console.log(formData);
    $('#spinnerAdministration').show();
    $('#administrationForm').hide();
    $('#adminResponse').hide();

    var formData = {
        FicaStatus: $('#FicaStatus').val(),
        ScreeningStatus: $('#ScreeningStatus').val(),
        RiskLevel: $('#RiskLevel').val(),
        ForeignPEP: $('#ForeignPEP').val(),
        DomesticPEP: $('#DomesticPEP').val(),
        DomesticPIP: $('#DomesticPIP').val(),
        custID: $('#custID').val(),

    };
    $.ajax({
        type: 'POST',
        url: '/customer/AddAdministration?FicaStatus=' + FicaStatus + "&ScreeningStatus=" + ScreeningStatus + "&RiskLevel=" + RiskLevel + "&ForeignPEP=" + ForeignPEP + "&DomesticPEP=" + DomesticPEP + "&DomesticPIP=" + DomesticPIP + "&id=" + custID,
        data: formData,
        success: function (response) {
            $('#spinnerAdministration').hide();
            $('#administrationForm').show();
            console.log(response);
            adminResponse = '<div class="alert alert-success">' + response.data + '</div>';
            $('#adminResponse').html(adminResponse).show();

        }
    });
});

var ViewCase = function (id) {
    $.ajax({
        type: 'POST',
        url: '/screening/ViewCase?searchId=' + id,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.data != null && response.data.content.data.total_hits > 0) {
                $('#spinnerScreening').hide();
                $('#CaseManagement').hide();
                $('#tblCaseManagement').hide();

                generateScreeningResults(response);
            }
            else {
                var mainResults = '<div class="screening-mainresults">';
                mainResults += '<button id="searchagain" class="btn btn-sm btn-success" style="margin-right:5px;">Back</button>';
                mainResults += '<hr />';
                mainResults += '</div>';
                $('#screeningContainer').append("<hr /><div class='alert alert-warning'><p>No matches found</p></div>");
                $('#spinnerScreening').hide();
            }
            $('#searchagain').click(function () {
                $('#scrreningForm').show();
                $('#CaseManagement').show();
                $('#tblCaseManagement').show();
                $('#mainResultsContainer').empty();
                $('#screeningContainer').empty();
                $('#detailedResults').html(detailedResults).hide();
                $('#commentsContainer').empty();
                $('#caseIinformation').empty();
            });
        },
        error: function (xhr, status, error) {
            $('#spinnerScreening').hide();
            console.error('Error:', error);
        }
    });
};

function generateDetailedResults(id, tabKeydata, tabAdversemedia, groupedData, data, client_ref) {

    var detailedResults = '<div id="' + id + '">';
    detailedResults += '<nav>';
    detailedResults += '<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">';
    detailedResults += '<a class="nav-item nav-link active" id="' + tabKeydata + '-tab" data-toggle="tab" href="#' + tabKeydata + '" role="tab" aria-controls="' + tabKeydata + '" aria-selected="true">Key Data</a>';
    detailedResults += '<a class="nav-item nav-link" id="' + tabAdversemedia + '-tab" data-toggle="tab" href="#' + tabAdversemedia + '" role="tab" aria-controls="' + tabAdversemedia + '" aria-selected="false">Adverse Media</a>';
    detailedResults += '</div>';
    detailedResults += '</nav>';
    detailedResults += '<div class="tab-content tab-content-results" id="nav-tabContent">';
    detailedResults += '<div class="tab-pane fade show active" id="' + tabKeydata + '" role="tabpanel" aria-labelledby="' + tabKeydata + '-tab">';
    $.each(groupedData, function (source, data) {
        detailedResults += '<h3 style="text-transform:capitalize;">' + source.replace(/-/g, ' ') + '</h3>';
        detailedResults += '<table class="CustomBlueTable table">';
        $.each(data, function (dataIndex, field) {
            detailedResults += '<tr>';
            detailedResults += '<td style="width: 160px;">' + field.name + '</td><td>' + field.value + '</td>';
            detailedResults += '</tr>';
        });

        detailedResults += '</table>';
    });

    detailedResults += '</div>';
    var advermedia = data.doc.media;
    detailedResults += '<div class="tab-pane fade" id="' + tabAdversemedia + '" role="tabpanel" aria-labelledby="' + tabAdversemedia + '-tab">';
    $.each(advermedia, function (index, media) {
        detailedResults += '<div>';
        detailedResults += '<p><a target="_blank" href="' + media.url + '">' + media.title + '</a></p>';
        detailedResults += '<p><strong>Published:</strong> ' + media.date + '</p>';
        detailedResults += '<p>' + media.snippet + '</p>';
        detailedResults += '<hr />';
        detailedResults += '</div>';
    });

    detailedResults += '</div>';


    return { detailedResults: detailedResults};
}

function generateScreeningResults(response) {
    var responseData = response.data.content.data
    var tableData = responseData.hits;
    var matchStatus = responseData.match_status;
    var caseName = responseData.search_term;
    var totalMatches = responseData.total_matches;
    var risk_level = responseData.risk_level;
    var client_ref = responseData.ref;
    var searched_at = responseData.created_at;
    var id = "";

    console.log("Case", responseData);

    var mainResults = '<div class="screening-mainresults">';
    mainResults += '<button id="searchagain" class="btn btn-sm btn-success" style="margin-right:5px;">All Cases</button>';
    mainResults += '<hr />';
    mainResults += '<div class="row">';
    mainResults += '<div class="col-lg-6"><h4>Case: ' + caseName + '</h4><p><strong>' + totalMatches + ' Results </strong>(sorted by relevance)</p></div>';
    mainResults += '<div class="col-lg-2"><p>Risk Level</p>';
    mainResults += '<select id="risklevel" name="risklevel" class="form-control" style="text-transform:capitalize;"><option selected value="' + risk_level + '"> ' + risk_level + '</option><option value="Unknown">Unknown</option><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select>';
    mainResults += '</div>';
    mainResults += '<div class="col-lg-2"><p>Match status</p>';
    mainResults += '<select id="matchstatus" name="matchstatus" class="form-control" style="text-transform:capitalize;"><option selected value="' + matchStatus + '"> ' + matchStatus.replace(/_/g, ' ') + '</option><option value="Unknown">Unknown</option><option value="No_Match">Low</option><option value="Potential_Match">Potential Match</option><option value="False_Positive">False Positive</option><option value="True_Positive">True Positive</option><option value="True_Positive_Approve">True Positive Approve</option><option value="True_Positive_Reject">True Positive Reject</option></select></div>';
    mainResults += '<div class="col-lg-2"><p style="margin-top: 40px;"></p><button class="btn btn-primary" onclick="Convert_HTML_To_PDF();"><i class="fa fa-download"></i> Download</button>';
    mainResults += '</div>';
    mainResults += '</div>';
    mainResults += '<hr />';
    $.each(tableData, function (index, data) {

        id = data.doc.id;
        var sreeningDiv = $('<div class="col-lg-5 screening-results">');
        sreeningDiv.append('<table class="CustomBlueTable table">');
        sreeningDiv.append('<tr>');
        sreeningDiv.append('<td style="width: 110px;">Entity type</td><td style="text-transform:capitalize;"><strong>' + data.doc.entity_type + '</strong></td>');
        sreeningDiv.append('</tr>');
        sreeningDiv.append('<tr>');
        sreeningDiv.append('<td>Entity name</td><td><a id="' + id + '" href="">' + data.doc.name + '</a></td>');
        sreeningDiv.append('</tr>');

        var types = data.doc.types;
        var adversStr = "";
        var adverse = 0;
        var pep = 0;
        var sanction = 0;
        var adverseMedia = "";
        var peps = "";
        var sanctions = "";
        var adverseSingle = "";
        types.forEach(str => {
            if (str.includes("adverse-media-v2")) {
                adversStr = str;
                adverse++;
            }
            else if (str.includes("pep-class")) {
                pep++;
            }
            else if (str.includes("sanction")) {
                sanction++;
            }
        });
        if (adverse > 1) {
            adverseMedia = '<button class="btn btn-sm btn-outline-danger" style="margin-right:5px;">Adverse Media <span class="badge badge-dark" >' + adverse + '</span></button>';
        }
        if (pep > 1) {
            peps = '<button class="btn btn-sm btn-outline-danger" style="margin-right:5px;">PEPs <span class="badge badge-dark" >' + pep + '</span></button>';
        }
        if (pep == 1) {
            peps = '<button class="btn btn-sm btn-outline-danger" style="margin-right:5px;">PEPs</button>';
        }
        if (sanction > 0) {
            sanctions = '<button class="btn btn-sm btn-outline-danger" style="margin-right:5px;">Sanctions</button>';
        }

        if (adverse == 1) {
            var inputString = adversStr;
            // Split the string by "adverse-media-v2-"
            var splitArray = inputString.split("adverse-media-v2-");
            // Get the string after "adverse-media-v2-"
            var adverseString = splitArray.length > 1 ? splitArray[1] : "";
            adverseSingle = '<button class="btn btn-sm btn-outline-danger" style="text-transform:capitalize;">' + adverseString + '</button>';
        }

        sreeningDiv.append('<tr>');
        sreeningDiv.append('<td>Appears on</td><td style="text-transform:capitalize;">' + sanctions + peps + adverseMedia + adverseSingle + '</td>');
        sreeningDiv.append('</tr>');

        var fieldData;
        var fields = data.doc.fields;
        var sources = data.doc.sources;
        $.each(fields, function (index, field) {
            fieldData = field;
            if (field.name == 'Countries') {
                sreeningDiv.append('<tr>');
                sreeningDiv.append('<td>Countries</td><td>' + field.value + '</td>');
                sreeningDiv.append('</tr>');
            }
        });

        sreeningDiv.append('<tr>');
        sreeningDiv.append('<td>Match Status</td><td style="text-transform:capitalize;"><span class="badge badge-info">' + matchStatus.replace(/_/g, ' ') + '</span></td>');
        sreeningDiv.append('</tr>');
        sreeningDiv.append('<tr>');
        sreeningDiv.append('<td></td><td><button id="comments" class="btn" style="font-size:13px;"><i class="fa fa-comment" aria-hidden="true"></i> Add Comment</button></td>');
        sreeningDiv.append('</tr>');
        sreeningDiv.append('</table>');
        sreeningDiv.append('</div>');

        var groupedData = {};
        $.each(sources, function (index, source) {
            groupedData[source] = groupedData[source] || [];

            $.each(fields, function (fieldIndex, field) {
                if (field.source === source) {
                    groupedData[source].push({
                        name: field.name,
                        value: field.value
                    });
                }
            });
        });

        var tabKeydata = 'nav-keydata' + id;
        var tabAdversemedia = 'nav-adversemedia' + id;

        var resultsAndComments = generateDetailedResults(id, tabKeydata, tabAdversemedia, groupedData, data, client_ref);

        $('#screeningContainer').append(sreeningDiv);
       // $('#comments').append(resultsAndComments.comments);

        $('#' + id).click(function (event) {
            event.preventDefault();
            var match = resultsAndComments.detailedResults.match(/id="([^"]+)"/);
            if (match && match[1]) {
                var extractedId = match[1];
                var clickedId = $(this).attr('id');

                if (extractedId !== clickedId) {
                    resultsAndComments.detailedResults = resultsAndComments.detailedResults.replace(/<div id="([^"]+)">/, '');
                }

                $('#detailedResultsModalBody').html(resultsAndComments.detailedResults);
                $('#detailedResultsModal').modal('show');

                $('#scrreningForm').hide();
            }
        });

        $('#screeningContainer').on('click', '#comments', function () {
            $('#commentResponse').hide();
            $('#commentModal').modal('show');
        });

        // Handle adding comment
        $('#btnAddComment').click(function () {
            var addedcomments = $('#commented').val();
            $.ajax({
                type: 'POST',
                url: '/screening/AddComment?client_ref=' + client_ref + "&addedcomments=" + addedcomments + "&entityid=" + id,
                success: function (response) {
                    var commentResponse = '<div class="alert alert-success">' + response.data + '</div>';
                    $('#commentResponse').html(commentResponse);
                    // Optionally, hide the modal after adding comment
                    $('#commentModal').modal('hide');
                }
            });
        });

        
    });

    var caseInfo = '<div class="card">';
    caseInfo += '<div class="card-header">';
    caseInfo += '<h5>Case Information</h5>';
    caseInfo += '</div>';
    caseInfo += '<div class="card-body">';
    caseInfo += '<p><strong>Searched at ' + searched_at + '</strong></p>';
    caseInfo += '<table class="table">';
    caseInfo += '<tr>';
    caseInfo += '<td>Search Term</td>';
    caseInfo += '<td><strong>' + caseName + '</strong></td>';
    caseInfo += '</tr>';
    caseInfo += '<tr>';
    caseInfo += '<td>Fuzziness interval</td>';
    caseInfo += '<td><strong>' + responseData.filters.fuzziness * 100 + '%</strong ></td>';
    caseInfo += '</tr>';
    caseInfo += '<tr>';
    caseInfo += '<td>Entity type</td>';
    caseInfo += '<td style="text-transform: capitalize"><strong>' + responseData.hits[0].doc.entity_type +  '</strong></td>';
    caseInfo += '</tr>';
    caseInfo += '</table>';
    caseInfo += '<a id="viewComments" href="#">View Commnets</a>';
    caseInfo += '</div>';
    caseInfo += '</div>';

    $('#caseIinformation').append(caseInfo);

    $('#mainResultsContainer').append(mainResults);

    $('#viewComments').click(function () {
            $.ajax({
                type: 'POST',
                url: '/screening/ViewComments?client_ref=' + client_ref,
                success: function (response) {
                    var data = response.data;
                    var commentEntries = getComments(data);

                    var comments = commentEntries;

                    var commentsData = generateCommentsTables(comments);

                    $('#commentsContainer').html(commentsData);

                    console.log(commentsData);
                }
            });
    });
}

function getComments(data) {
    var commentEntries = [];
    var uniqueCreatedAtValues = new Set();

    // Check if data.content exists and is not empty
    if (data.content && data.content.length > 0) {
        data.content.forEach(entry => {
            // Extract the date without milliseconds
            var createdAtWithoutMilliseconds = entry.created_at.split('.')[0];
            if (!uniqueCreatedAtValues.has(createdAtWithoutMilliseconds)) {
                commentEntries.push(entry);
                uniqueCreatedAtValues.add(createdAtWithoutMilliseconds);
            }
        });
    }

    return commentEntries;
}

function generateCommentsTables(comments) {
    var commentsDiv = '';
    var commentData = '<div class="card">';
    commentData += '<div class="card-header">';
    commentData += '<h5>Comments</h5>';
    commentData += '</div>';
    commentData += '<div class="card-body">';
    if (comments.length > 0) { // Check if there are comments
        comments.forEach(comment => {
            commentData += '<table class="comment-table">';
            commentData += '<tr><td><strong>Created At:</strong></td><td>' + comment.created_at + '</td></tr>';
            commentData += '<tr><td><strong>User ID:</strong></td><td>' + comment.user_id + '</td></tr>';
            commentData += '<tr><td><strong>Message:</strong></td><td>' + comment.message + '</td></tr>';
            commentData += '</table>';
            commentData += '<hr />';
        });
    } else {
        commentData += '<p>No comments available</p>';
    }
    commentData += '</div>';
    commentData += '</div>';

    commentsDiv += commentData;

    return commentsDiv;
}

function validateSAID(id_number) {
    if (id_number.length !== 13 || !/^\d+$/.test(id_number)) {
        return false;
    }

    let birthYear = parseInt(id_number.substring(0, 2), 10);
    let birthMonth = parseInt(id_number.substring(2, 4), 10);
    let birthDay = parseInt(id_number.substring(4, 6), 10);

    let currentYear = new Date().getFullYear() % 100;
    birthYear += (birthYear <= currentYear ? 2000 : 1900);

    let birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    if (
        birthDate.getFullYear() !== birthYear ||
        birthDate.getMonth() !== birthMonth - 1 ||
        birthDate.getDate() !== birthDay
    ) {
        return false;
    }

    let genderDigit = parseInt(id_number.substring(6, 7), 10);
    if (isNaN(genderDigit) || genderDigit < 0 || genderDigit > 9) {
        return false;
    }

    let citizenshipDigit = parseInt(id_number.substring(10, 11), 10);
    if (citizenshipDigit !== 0 && citizenshipDigit !== 1) {
        return false;
    }

    return luhnCheck(id_number);
}

function luhnCheck(id_number) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = id_number.length - 1; i >= 0; i--) {
        let digit = parseInt(id_number.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
}

function showInvalidIDAlert() {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
                    Invalid South African ID number.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                `;
    alertContainer.appendChild(alert);
}

function clearAlert() {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = '';
}


