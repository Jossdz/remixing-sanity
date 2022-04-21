import { useLoaderData } from "@remix-run/react";
import client, { urlFor } from "../../../../utils/client";

export const loader = async ({ params }) => {
	const { artistId } = params;
	const albums = await client.fetch(
		`*[_type == "album" && artist._ref == $artistId]{
      ...,
      artist->
    }`,
		{
			artistId
		}
	);
	return {
		albums
	};
};

export default () => {
	const { albums } = useLoaderData();
	return (
		<div>
			<h1>Artist: {albums[0] && albums[0].artist.name}</h1>
			{albums.map((album) => (
				<div key={album._id}>
					<h2>{album.title}</h2>
					<img alt={album.name} src={urlFor(album.cover).width(200).url()} />
				</div>
			))}
		</div>
	);
};
