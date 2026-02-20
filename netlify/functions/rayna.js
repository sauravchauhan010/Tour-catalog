exports.handler = async (event) => {
  try {
    const response = await fetch(
      "https://sandbox.raynatours.com/api/Tour/tourstaticdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.AUTH_TOKEN}`
        },
        body: event.body
      }
    );

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
