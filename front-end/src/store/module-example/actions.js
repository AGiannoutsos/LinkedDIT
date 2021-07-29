var testAdminAllUsers = [
    {
        id: "12312312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos1",
        email: "andreas.giannoutsos@gmail.com",
        phone: "6912345678",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
	},
    {
        id: "12312sdfd312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos2",
        email: "andreas.giannoutsos@gmail.com",
        phone: "6912345678",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    },
    {
        id: "1231s1232dfsd2312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos3",
        email: "andreas.giannoutsos@gmail.com",
        phone: "6912345678",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    },
    {
        id: "12312g4333fgs312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos4",
        email: "andreas.giannoutsos@gmail.com",
        phone: "6912345678",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    }
]



import testResponses from './testResponses';

const axios = require('axios');
// const https = require('https');
// const http = require('http');

// https://f80bef32-b7e6-4e9b-adae-17f58c980406.mock.pstmn.io//test

const apiUrl = 'https://f80bef32-b7e6-4e9b-adae-17f58c980406.mock.pstmn.io';


// const agent = new http.Agent({
// // const agent = new http.Agent({
//     rejectUnauthorized: false, // (NOTE: this will disable client verification)
// })

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// axios.defaults.options = agent
// console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)

var TESTING = false

export default {

    async getUser({ commit, getters, dispatch }) {
        var token = "token123"
        var url = "/app/user"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getUserTESTING", testResponses.userTest)
				commit("STORE_USER", testResponses.userTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getUser", response.data)
				commit("STORE_USER", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

	async getConnectionRequests({ commit, getters, dispatch }) {
        var token = "token123"
        var url = "/app/notifications/requests"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getConnectionRequestsTESTING", testResponses.connectionRequests)
				commit("STORE_CONNECTION_REQUESTS", testResponses.connectionRequests)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getConnectionRequests", response.data)
				commit("STORE_CONNECTION_REQUESTS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

	
	async getInteractions({ commit, getters, dispatch }) {
        var token = "token123"
        var url = "/app/notifications/interactions"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getInteractionsTESTING", testResponses.interactionsTest)
				commit("STORE_INTERACTIONS", testResponses.interactionsTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getInteractions", response.data)
				commit("STORE_INTERACTIONS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },


	async getDiscussions({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/discussions"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getDiscussionsTESTING", testResponses.testDiscussions)
				commit("STORE_DISCUSSIONS", testResponses.testDiscussions)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getDiscussions", response.data)
				commit("STORE_DISCUSSIONS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

	async getConnectedUsers({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/connected_users"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getConnectedUsersTESTING", testResponses.connectedUsersTest)
				commit("STORE_CONNECTED_USERS", testResponses.connectedUsersTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getConnectedUsers", response.data)
				commit("STORE_CONNECTED_USERS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

	async getRecommendedPosts({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/recommended_posts"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getRecommendedPostsTESTING", testResponses.postsTest)
				commit("STORE_RECOMMENDED_POSTS", testResponses.postsTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getRecommendedPosts", response.data)
				commit("STORE_RECOMMENDED_POSTS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },
	

    async postComment({ commit, getters, dispatch }, comment) {
        commit("POST_COMMENT", comment)
    },

    
    async editPersonalData({ commit, getters, dispatch }, personalData) {
        commit("EDIT_PERSONAL_DATA", personalData)
    },
    
    async postPost({ commit, getters, dispatch }, post) {
        commit("POST_POST", post)
    },

    async thumbsUp({ commit, getters, dispatch }, postId) {
        commit("THUMBS_UP", postId)
    },

    async thumbsDown({ commit, getters, dispatch }, postId) {
        commit("THUMBS_DOWN", postId)
    },

    async postProposal({ commit, getters, dispatch }, proposal) {
        commit("POST_PROPOSAL", proposal)
    },
    
    async applyUp({ commit, getters, dispatch }, proposalId) {
        commit("APPLY_UP", proposalId)
    },

    async applyDown({ commit, getters, dispatch }, proposalId) {
        commit("APPLY_DOWN", proposalId)
    },

    async adminGetAllUsers({ commit, getters, dispatch }) {

        var allUsers = testAdminAllUsers
        // add selected attribute
        allUsers.forEach(element => {element.selected = false});

        commit("STORE_ADMIN_ALL_USERS", allUsers)
    },

    async selectUser({ commit, getters, dispatch }, userId) {
        commit("SELECT_USER", userId)
    },

    

    async sendMessage({ commit, getters, dispatch }, message) {
        commit("SEND_MESSAGE", message)
    },

    async getDiscussionId({ commit, getters, dispatch }) {
        return "100021"
    },
    
}

