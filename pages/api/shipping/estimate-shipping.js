const handler = async (req, res) => {
  const { zipcode } = req.body;
  var myHeaders = new Headers();
  myHeaders.append("Host", "api.shipengine.com");
  myHeaders.append("API-Key", process.env.SHIPENGINE_KEY);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    rate_options: {
      carrier_ids: [process.env.POST_OFFICE_ID],
      service_codes: [
        "usps_first_class_mail",
        "usps_priority_mail",
        "ups_next_day_air_early_am",
      ],
      package_types: ["flat_rate_envelope", "medium_flat_rate_box"],
    },
    from_country_code: "US",
    from_postal_code: "48307",
    to_country_code: "US",
    to_postal_code: zipcode,
    service_codes: [
      "usps_first_class_mail",
      "usps_priority_mail",
      "ups_next_day_air_early_am",
    ],
    package_types: ["flat_rate_envelope", "medium_flat_rate_box"],
    packages: [
      {
        weight: {
          value: 17,
          unit: "pound",
        },
        dimensions: {
          unit: "inch",
          length: 5,
          width: 5,
          height: 5,
        },
      },
    ],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.shipengine.com/v1/rates/estimate", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
};
export default handler;
