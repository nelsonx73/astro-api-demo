import { XataClient } from "../../../xata";

const client = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });

export async function GET() {
  const headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*"); // Adjust this as needed
  headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.append("Access-Control-Allow-Headers", "Content-Type");

  try {
    const data = await client.db.Officials.getAll();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function POST({ request }) {
  const body = await request.json();

  try {
    const data = await client.db.Officials.create(body);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function PUT({ request }) {
  const body = await request.json();

  if (!body.id) {
    return new Response(
      JSON.stringify(
        { err: "Id is required" },
        {
          status: 400,
        }
      )
    );
  }

  try {
    const data = await client.db.Officials.update(body.id, body);

    return new Response(
      JSON.stringify({
        data,
      })
    );
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export async function DELETE({ request }) {
  const body = await request.json();

  if (!body.id) {
    return new Response(
      JSON.stringify(
        { err: "Id is required" },
        {
          status: 400,
        }
      )
    );
  }

  try {
    const data = await client.db.Officials.delete(body.id);
    return new Response(
      JSON.stringify({
        data,
      })
    );
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
