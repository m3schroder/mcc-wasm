import emailjs from "emailjs-com";
const vCardsJS = require("vcards-js");

window.functions = {
    contactSubmit: (e) => {
        e.preventDefault();
        let { first, last, email, number, street, city, rooms, hallways } =
            e.target;
        let contactCard = createContactCard(
            first.value,
            last.value,
            email.value,
            number.value,
            street.value,
            city.value
        );
        var base64 = btoa(contactCard);
        emailjs
            .send(
                "service_8xdwyfp",
                "template_3zgcky8",
                {
                    first: first.value,
                    last: last.value,
                    rooms: rooms.value,
                    hallways: hallways.value,
                    email: email.value,
                    number: number.value,
                    street: street.value,
                    city: city.value,
                    content: base64,
                },
                "user_IW2ooKqhMLZoZM5ipPIyj"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    },
    createContactCard: (firstName,lastName,email,number,street,city) => {
          var vCard = vCardsJS();
          vCard.firstName = firstName;
          vCard.lastName = lastName;
          vCard.email = email;
          vCard.cellPhone = number;
          vCard.homeAddress.label = "Home Address";
          vCard.homeAddress.street = street;
          vCard.homeAddress.city = city;
          vCard.homeAddress.stateProvince = "Tennessee";

          return vCard.getFormattedString();
    }
}