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

$(document).ready(function () {
    $('.custom-file-input').on('change', function (event) {
        var inputFile = event.currentTarget;
        $(inputFile).parent()
            .find('.custom-file-label')
            .html(inputFile.files[0].name);
    });

    $("#submitBtn").click(function (event) {
        clearAlert();
        const idNumberInput = $("#id_number");
        const id_number = idNumberInput.val();

        if (!validateSAID(id_number)) {
            event.preventDefault();

            showInvalidIDAlert();
        } else {
            $('#spinnerScreening').show();
            $('#myForm').hide();
            $('.alert-warning').hide();
        }
    });
});

