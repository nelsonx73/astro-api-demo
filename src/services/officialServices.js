function getUrl() {
  // return "http://localhost:4321/api/officials";
  return "https://astro-api-demo-git-main-nelsonx73.vercel.app/api/officials";
}

async function getOfficials() {
  const url = getUrl();
  const request = await fetch(url);
  const response = await request.json();

  return response;
}

async function postOfficials(values) {
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

async function putOfficials(values) {
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

export { getOfficials, postOfficials, putOfficials };
