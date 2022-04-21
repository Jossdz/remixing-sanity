import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
	projectId: "frmqhd0m",
	dataset: "production",
	apiVersion: "2022-04-19",
	token: "your_api_token",
	useCdn: false
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
