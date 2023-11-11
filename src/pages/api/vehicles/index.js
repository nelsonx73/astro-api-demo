import { XataClient } from "../../../xata";

const client = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });

export async function GET() {
  try {
    const data = await client.db.Vehicles.getAll();

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
    const unitToCreate = await client.db.Vehicles.create(body);

    return new Response(JSON.stringify(unitToCreate), {
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
    const updatedVehicle = await client.db.Vehicles.update(body.id, body);

    return new Response(
      JSON.stringify({
        updatedVehicle,
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
    const deletedVehicle = await client.db.Vehicles.delete(body.id);
    return new Response(
      JSON.stringify({
        deletedVehicle,
      })
    );
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
