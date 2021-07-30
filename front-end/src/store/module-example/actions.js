

import testResponses from './testResponses';
import { Notify } from 'quasar'

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

    async getAdminAllUsers({ commit, getters, dispatch }) {

        var token = "token123"
        var url = "/admin/users"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getAdminAllUsersTESTING", testResponses.adminAllUsersTest)
                var allUsers = testResponses.adminAllUsersTest
                allUsers.forEach(element => {element.selected = false});
				commit("STORE_ADMIN_ALL_USERS", testResponses.adminAllUsersTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getUser", response.data)
                var allUsers = response.data
                allUsers.forEach(element => {element.selected = false});
				commit("STORE_ADMIN_ALL_USERS", allUsers)
			})
			.catch(error => { 
				throw error
			})
		}
    },

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
        var url = "/app/posts/recommended"

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

    async getMyPosts({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/posts/my"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getMyPostsTESTING", testResponses.myPostsTest)
				commit("STORE_MY_POSTS", testResponses.myPostsTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getMyPosts", response.data)
				commit("STORE_MY_POSTS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

    async getProposals({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/proposals/recommended"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getProposalsTESTING", testResponses.proposalsTest)
				commit("STORE_PROPOSALS", testResponses.proposalsTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getProposals", response.data)
				commit("STORE_PROPOSALS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

    async getMyProposals({ commit, getters, dispatch }) {

		var token = "token123"
        var url = "/app/proposals/my"

        let headers = { "Authorization": `${token}` };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("getMyProposalsTESTING", testResponses.myProposalsTest)
				commit("STORE_MY_PROPOSALS", testResponses.myProposalsTest)
			})
		} else {
			return axios.get(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("getMyProposals", response.data)
				commit("STORE_MY_PROPOSALS", response.data)
			})
			.catch(error => { 
				throw error
			})
		}
    },

    async postLogin({ commit, getters, dispatch }, postLogin) {

		var token = "Bearer token12"
        var url = "/login"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postLoginTESTING", testResponses.myProposalsTest)
				// commit("STORE_MY_PROPOSALS", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postLogin, { headers: headers })
			.then(response => {
				console.log("postLogin", response.data)
                // should return a token
				commit("STORE_TOKEN", response.data)
			})
			.catch(error => { 
				Notify.create({ 
						type: 'negative', 
						message: "User not Found", 
						icon: 'report_problem',
						position: "top" })
				throw error
			})
		}
    },

	async postLogout({ commit, getters, dispatch }) {

		var token = "Bearer token12"
        var url = "/logout"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postLogoutTESTING", testResponses.myProposalsTest)
				// commit("STORE_MY_PROPOSALS", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("postLogout", response.data)
				Notify.create({ 
					type: 'positive', 
					message: "You have been successfully loged out.", 
					position: "top" })
				commit("DELETE_TOKEN", response.data)
			})
			.catch(error => { 
				Notify.create({ 
						type: 'negative', 
						message: "User not Found", 
						icon: 'report_problem',
						position: "top" })
				throw error
			})
		}
    },


	async postForgotPassword({ commit, getters, dispatch }, postForgotPasswordForm) {

		var token = "Bearer token12"
        var url = "/login/forgot_password"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postForgotPasswordTESTING", testResponses.myProposalsTest)
				// commit("STORE_MY_PROPOSALS", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postForgotPasswordForm, { headers: headers })
			.then(response => {
				console.log("postForgotPassword", response.data)
				Notify.create({ 
						type: 'positive', 
						message: "A new password has been sent to your email", 
						position: "top" })
                // should return a token
				// commit("STORE_MY_PROPOSALS", response.data)
			})
			.catch(error => { 
				Notify.create({ 
					type: 'negative', 
					message: "Email not Found", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },

	async postSignUp({ commit, getters, dispatch }, postSignUpForm) {

		var token = "Bearer token12"
        var url = "/sign_up"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postSignUpTESTING", testResponses.myProposalsTest)
				// commit("STORE_MY_PROPOSALS", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postSignUpForm, { headers: headers })
			.then(response => {
				console.log("postSignUp", response.data)
				Notify.create({ 
						type: 'positive', 
						message: "Your account has been created. Please verify email to log in.", 
						position: "top" })
                // should return a token
				// commit("STORE_MY_PROPOSALS", response.data)
			})
			.catch(error => { 
				Notify.create({ 
					type: 'negative', 
					message: "Error during Sign Up", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },


    async respondConnectionRequest({ commit, getters, dispatch }, answer) {
        commit("RESPOND_CONNECTION_REQUEST", answer)
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

