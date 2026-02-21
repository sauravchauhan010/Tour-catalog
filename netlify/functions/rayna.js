exports.handler = async function (event) {

  const BASE_URL = "https://sandbox.raynatours.com";

  const authToken = process.env.RAYNA_TOKEN;

  try {
    const { endpoint, payload } = JSON.parse(event.body);

    const response = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};