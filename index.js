function pageLoad() {

  document.getElementById("submitPostcode").addEventListener("click", checkPostcode);

}

function checkPostcode(event) {

  event.preventDefault();

  let postcode1 = document.getElementById("postcodeText1").value;
  let postcode2 = document.getElementById("postcodeText2").value;

  fetch("https://api.postcodes.io/postcodes/" + postcode1, {method: 'get'}
  ).then(response => response.json()
  ).then(info1 => {

    if (info1.hasOwnProperty("error")) {

      document.getElementById("postcodeInfo").innerHTML = "<p>Error: " + info.error + "</p>";

    } else {

      fetch("https://api.postcodes.io/postcodes/" + postcode2, {method: 'get'}
      ).then(response => response.json()
      ).then(info2 => {

        if (info1.hasOwnProperty("error")) {

          document.getElementById("postcodeInfo").innerHTML = "<p>Error: " + info.error + "</p>";

        } else {

          let postcodeHTML = '<h3>Postcode 1: ' + postcode1 + "</h3>";

          postcodeHTML += `<p>${info1.result.admin_district}</p>`;
          postcodeHTML += `<p>${info1.result.admin_county}</p>`;
          postcodeHTML += `<p>${info1.result.country}</p>`;
          postcodeHTML += `<p>${info1.result.longitude}</p>`;
          postcodeHTML += `<p>${info1.result.latitude}</p>`;

          postcodeHTML += '<h3>Postcode 2: ' + postcode2 + "</h3>";

          postcodeHTML += `<p>${info2.result.admin_district}</p>`;
          postcodeHTML += `<p>${info2.result.admin_county}</p>`;
          postcodeHTML += `<p>${info2.result.country}</p>`;
          postcodeHTML += `<p>${info2.result.longitude}</p>`;
          postcodeHTML += `<p>${info2.result.latitude}</p>`;

          let R = 6371e3;
          let psi1 = Number(info1.result.latitude) * Math.PI/180;
          let psi2 = Number(info2.result.latitude) * Math.PI/180;
          let deltaPsi = (Number(info2.result.latitude)-Number(info1.result.latitude)) * Math.PI/180;
          let deltaLambda = (Number(info2.result.longitude)-Number(info1.result.longitude)) * Math.PI/180;
          let a = Math.sin(deltaPsi/2) * Math.sin(deltaPsi/2) + Math.cos(psi1) * Math.cos(psi2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

          let d = Math.floor((R * c)/100)/10; // Round to 0.1 km.

          postcodeHTML += '<h3>Distance: ' + d + "km</h3>";

          document.getElementById("postcodeInfo").innerHTML = postcodeHTML;

        }

      });

    }

  });

}
