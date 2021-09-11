

import testResponses from './testResponses';
import { Notify } from 'quasar'

const axios = require('axios');
// const https = require('https');
// const http = require('http');

// https://f80bef32-b7e6-4e9b-adae-17f58c980406.mock.pstmn.io//test

var apiUrl = '';
// apiUrl = 'https://f80bef32-b7e6-4e9b-adae-17f58c980406.mock.pstmn.io';
// apiUrl = 'https://003da9ea-c296-4616-839e-2c65f99a4872.mock.pstmn.io';
// apiUrl = 'https://df81af3d-3590-43aa-bfa9-ca96a7cd6e83.mock.pstmn.io';
apiUrl = 'https://1d7b2721-b2db-4611-aa92-fbeab0cbddcb.mock.pstmn.io';





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

        var token = getters.token
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
        var token = getters.token
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
        var token = getters.token
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
        var token = getters.token
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

		var token = getters.token
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

		var token = getters.token
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

		var token = getters.token
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

		var token = getters.token
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

		var token = getters.token
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

		var token = getters.token
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

    async postLogin({ commit, getters, dispatch }, postLoginForm) {

		var token = getters.token
        var url = "/login"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postLoginTESTING", postLoginForm)
				if (postLoginForm.username === "admin"){
					commit("STORE_TOKEN_ADMIN", "123")
				} else {
					commit("STORE_TOKEN", "admin123")
				}
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postLoginForm, { headers: headers })
			.then(response => {
				console.log("postLogin", response.data)
                // should return a token
				if (postLoginForm.username === "admin"){
					commit("STORE_TOKEN_ADMIN", response.data)
				} else {
					commit("STORE_TOKEN", response.data)
				}
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

		var token = getters.token
        var url = "/logout"

        let headers = { "Authorization": `${token}` ,  "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postLogoutTESTING")
				commit("DELETE_TOKEN")
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, {}, { headers: headers })
			.then(response => {
				console.log("postLogout", response.data)
				Notify.create({ 
					type: 'positive', 
					message: "You have been successfully loged out.", 
					position: "top" })
				commit("DELETE_TOKEN")
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

		var token = getters.token
        var url = "/login/forgot_password"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postForgotPasswordTESTING", postForgotPasswordForm)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postForgotPasswordForm, { headers: headers })
			.then(response => {
				console.log("postForgotPassword", response.data)
				Notify.create({ 
						type: 'positive', 
						message: "A new password has been sent to your email", 
						position: "top" })
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

		var token = getters.token
        var url = "/sign_up"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postSignUpTESTING", postSignUpForm)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postSignUpForm, { headers: headers })
			.then(response => {
				console.log("postSignUp", response.data)
				Notify.create({ 
						type: 'positive', 
						message: "Your account has been created. Please verify email to log in.", 
						position: "top" })
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

	async postUserSettings({ commit, getters, dispatch }, postUserSettingsForm) {

		var token = getters.token
        var url = "/app/settings/user_data"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postUserSettingsTESTING", postUserSettingsForm)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postUserSettingsForm, { headers: headers })
			.then(response => {
				console.log("postUserSettings", response.data)
				commit("STORE_USER_SETTINGS", postUserSettingsForm)
				Notify.create({ 
						type: 'positive', 
						message: "Your account settings have been updated", 
						position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'negative', 
					message: "Error during account settings", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },

	async postUserSettingsPassword({ commit, getters, dispatch }, postUserSettingsPasswordForm) {

		var token = getters.token
        var url = "/app/settings/change_password"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postUserSettingsPasswordTESTING", postUserSettingsPasswordForm)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postUserSettingsPasswordForm, { headers: headers })
			.then(response => {
				console.log("postUserSettingsPassword", response.data)
				Notify.create({ 
						type: 'positive', 
						message: "Your Password has changed", 
						position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'negative', 
					message: "Error during Password change", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },



    async postConnectionRequest({ commit, getters, dispatch }, answer) {

		var token = getters.token
        var url = "/app/notifications/requests/respond"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postConnectionRequestTESTING", answer)
				commit("POST_CONNECTION_REQUEST", answer)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, answer, { headers: headers })
			.then(response => {
				console.log("postConnectionRequest", response.data)
				commit("POST_CONNECTION_REQUEST", answer)

				Notify.create({ 
						type: 'positive', 
						message: answer.answer === "accept" ? "User has been added to your connections." : "Connection has been rejected", 
						position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'negative', 
					message: "Error in connection of users.", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },

	async postSearchResults({ commit, getters, dispatch }, postSearchResultsForm) {

		var token = getters.token
        var url = "/app/search_results"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postSearchResultsTESTING", testResponses.searchUserResultsTest)
				commit("STORE_SEARCH_RESULTS", testResponses.searchUserResultsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postSearchResultsForm, { headers: headers })
			.then(response => {
				console.log("postSearchResults", response.data)
				commit("STORE_SEARCH_RESULTS", response.data)

				Notify.create({ 
						type: 'positive', 
						message: "Search was successfull.", 
						position: "top" })
			})
			.catch(error => { 
				commit("DELETE_SEARCH_RESULTS")
				Notify.create({ 
					type: 'negative', 
					message: "Error in Search.", 
					icon: 'report_problem',
					position: "top" })
				throw error
			})
		}
    },

	async postDiscussion({ commit, getters, dispatch }, otherUserId) {
		
		var token = getters.token
        var url = "/app/discussions/id"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postDiscussionTESTING")
				commit("STORE_CURRENT_DISCUSSION", "*")
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, otherUserId, { headers: headers })
			.then(response => {
				console.log("postDiscussion", response.data)
				commit("STORE_CURRENT_DISCUSSION", response.data)

			})
			.catch(error => { 
				commit("STORE_CURRENT_DISCUSSION", "*")
				throw error
			})
		}
    },

	async postMessage({ commit, getters, dispatch }, message) {   

		var token = getters.token
        var url = "/app/discussions/message"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postMessageTESTING", message)
				commit("POST_MESSAGE", message)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, message, { headers: headers })
			.then(response => {
				console.log("postMessage", response.data)
				commit("POST_MESSAGE", message)

			})
			.catch(error => { 
				throw error
			})
		}
    },


    async postComment({ commit, getters, dispatch }, comment) {

		var token = getters.token
        var url = "/app/posts/comment"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postCommentTESTING", comment)
				commit("POST_COMMENT", comment)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, comment, { headers: headers })
			.then(response => {
				console.log("postComment", response.data)
				commit("POST_COMMENT", comment)

			})
			.catch(error => { 
				throw error
			})
		}
    },

    
    async postPersonalData({ commit, getters, dispatch }, personalData) {

		var token = getters.token
        var url = "/app/personal_data"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postPersonalDataTESTING", personalData)
				commit("POST_PERSONAL_DATA", personalData)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, personalData, { headers: headers })
			.then(response => {
				console.log("postPersonalData", response.data)
				commit("POST_PERSONAL_DATA", personalData)
				Notify.create({ 
					type: 'positive', 
					message: "Peronal data updated successfully.", 
					position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'error', 
					message: "Error in peronal data update.", 
					position: "top" })
				throw error
			})
		}
    },
    
    // async postPost({ commit, getters, dispatch }, post) {
    //     commit("POST_POST", post)
    // },

    async postThumbsUp({ commit, getters, dispatch }, postThumbsUpForm) {

		var token = getters.token
        var url = "/app/posts/thumbs"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postThumbsUpTESTING", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postThumbsUpForm, { headers: headers })
			.then(response => {
				console.log("postThumbsUp", response.data)
				if (postThumbsUpForm.thumbs === "up")
					commit("THUMBS_UP", postThumbsUpForm.id)
				else
					commit("THUMBS_DOWN", postThumbsUpForm.id)

			})
			.catch(error => { 
				throw error
			})
		}
    },


    // async postProposal({ commit, getters, dispatch }, proposal) {
    //     commit("POST_PROPOSAL", proposal)
    // },
    
    async postApplyUp({ commit, getters, dispatch }, postApplyUpForm) {

		var token = getters.token
        var url = "/app/proposals/apply"

        let headers = { "Authorization": `${token}` , "x-mock-match-request-body":true, "Content-Type":"application/json" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postApplyUpTESTING", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postApplyUpForm, { headers: headers })
			.then(response => {
				console.log("postApplyUp", response.data)
				if (postApplyUpForm.apply === "up")
					commit("APPLY_UP", postApplyUpForm.id)
				else
					commit("APPLY_DOWN", postApplyUpForm.id)

			})
			.catch(error => { 
				throw error
			})
		}
    },


	async postProfileImage({ commit, getters, dispatch }, postProfileImageForm) {

		var token = getters.token
        var url = "/app/settings/profile_image"

        let headers = { "Authorization": `${token}` , "Content-Type":"multipart/form-data" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postProfileImageTESTING", testResponses.myProposalsTest)
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postProfileImageForm, { headers: headers })
			.then(response => {
				console.log("postProfileImage", response.data)
				Notify.create({ 
					type: 'positive', 
					message: "Profile image updated successfully.", 
					position: "top" })
				dispatch("getUser")
			})
			.catch(error => { 
				Notify.create({ 
					type: 'error', 
					message: "Error in profile image.", 
					position: "top" })
				throw error
			})
		}
    },

	async postPost({ commit, getters, dispatch }, postPostForm) {

		var token = getters.token
        var url = "/app/posts/upload"

        let headers = { "Authorization": `${token}` , "Content-Type":"multipart/form-data" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postPostTESTING")
				commit("POST_POST", JSON.parse(postPostForm.get("json")))
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postPostForm, { headers: headers })
			.then(response => {
				console.log("postPost", response.data)
				commit("POST_POST", JSON.parse(postPostForm.get("json")))
				Notify.create({ 
					type: 'positive', 
					message: "Post was uploaded successfully.", 
					position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'error', 
					message: "Error in posting.", 
					position: "top" })
				throw error
			})
		}
    },

	async postProposal({ commit, getters, dispatch }, postProposalForm) {

		var token = getters.token
        var url = "/app/proposals/upload"

        let headers = { "Authorization": `${token}` , "Content-Type":"multipart/form-data" };

		if (TESTING){
			return Promise.resolve()
			.then( response => {
				console.log("postProposalTESTING")
				commit("POST_PROPOSAL", JSON.parse(postProposalForm.get("json")))
			})
		} else {
			return axios.post(`${apiUrl}/${url}`, postProposalForm, { headers: headers })
			.then(response => {
				console.log("postProposal", response.data)
				commit("POST_PROPOSAL", JSON.parse(postProposalForm.get("json")))
				Notify.create({ 
					type: 'positive', 
					message: "Proposal was uploaded successfully.", 
					position: "top" })
			})
			.catch(error => { 
				Notify.create({ 
					type: 'error', 
					message: "Error in proposal upaloading.", 
					position: "top" })
				throw error
			})
		}
    },


    async selectUser({ commit, getters, dispatch }, userId) {
        commit("SELECT_USER", userId)
    },
  

    



    
    
}

