import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import client from "../../../../utils/client";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get("name");

	const doc = {
		_type: "artist",
		name
	};

	await client.create(doc);

	return redirect("/artists");
};

export default () => {
	return (
		<Form method="post">
			<label htmlFor="name">Nombre</label>
			<input type="text" name="name" />
			<button type="submit">Crear</button>
		</Form>
	);
};
