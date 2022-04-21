import { Form, useLoaderData } from "@remix-run/react";

import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import client from "../../../../utils/client";

export const loader = async () => {
	const artists = await client.fetch(`*[_type == "artist"]`);

	return { artists };
};

export const action = async ({ request, params }) => {
	const uploadHandler = async ({ name, stream }) => {
		if (name !== "cover") {
			stream.resume();
			return;
		}

		const { _id } = await client.assets.upload("image", stream, {
			filename: "cover.jpg"
		});

		return _id;
	};

	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	);

	const file = formData.get("cover");
	const name = formData.get("name");

	const doc = {
		_type: "album",
		cover: {
			_type: "image",
			asset: {
				_ref: file,
				_type: "reference"
			}
		},
		title: name,
		artist: {
			_ref: params.artistId,
			_type: "reference"
		}
	};

	await client.create(doc);

	return redirect(`/artist/details/${params.artistId}`);
};

export default function NewAlbum() {
	return (
		<Form method="post" encType="multipart/form-data">
			<label htmlFor="name">Nombre</label>
			<input type="text" name="name" />
			<label htmlFor="avatar-input">Cover</label>
			<input id="avatar-input" type="file" name="cover" />
			<button>Upload</button>
		</Form>
	);
}
