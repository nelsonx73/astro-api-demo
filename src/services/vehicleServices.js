function getUrl() {
  // return "http://localhost:4321/api/vehicles";
  return "https://astro-api-demo-git-main-nelsonx73.vercel.app/api/vehicles";
}

async function getVehicles() {
  const url = getUrl();
  const request = await fetch(url);
  const response = await request.json();

  return response;
}

async function postVehicles(values) {
  const url = getUrl();
  try {
    await fetch(url, {
      method: "POST",
      "Content-Type": "appication/json",
      body: JSON.stringify(values),
    });
  } catch (error) {
    console.error(error);
  }
}

async function putVehicles(values) {
  const url = getUrl();
  try {
    await fetch(url, {
      method: "PUT",
      "Content-Type": "appication/json",
      body: JSON.stringify(values),
    });
  } catch (error) {
    console.error(error);
  }
}

export { getVehicles, postVehicles, putVehicles };
