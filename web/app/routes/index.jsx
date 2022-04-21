import { Link, useLoaderData } from "@remix-run/react";
import client from "../../utils/client";

export const loader = async () => {
	const artists = await client.fetch(`*[_type == "artist"]`);

	return {
		artists
	};
};

export default () => {
	const { artists } = useLoaderData();
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Artistas:</h1>

			<ul>
				{artists.map((artist) => (
					<li key={artist._id}>
						<Link to={`/artist/detail/${artist._id}`}>{artist.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
