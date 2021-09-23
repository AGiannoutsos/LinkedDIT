var testing = false

var userEmpty = {
	id: "",
	username: "",
	avatar: "",
	first_name: "",
	last_name: "",
	email: "",
	phone: "",
	personal_data: [
		{
			title: "Profession",
			content: "",
			visibility: true
		},
		{
			title: "Current Job Position",
			content: "",
			visibility: true
		},
		{
			title: "Professional Experience",
			content: "",
			visibility: true
		},
		{
			title: "Education",
			content: "",
			visibility: true
		},
		{
			title: "Skills",
			content: "",
			visibility: true
		},
	]
}

export default  {
  user: userEmpty,
  posts: [],
  myPosts: [],
  proposals: [],
  myProposals: [],
  connectedUsers: [],
  searchUserResults: [],
  connectionRequests: [],
  interactions: [],
  discussions: [],
  currentDiscussionId: null,
  adminAllUsers: [],
}
