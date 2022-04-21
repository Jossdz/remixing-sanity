export default {
	name: "album",
	title: "Album",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string"
		},
		{
			name: "cover",
			title: "Cover",
			type: "image"
		},
		{
			name: "artist",
			title: "Artist",
			type: "reference",
			to: [{ type: "artist" }]
		}
	]
};
