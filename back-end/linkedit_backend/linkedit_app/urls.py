from django.urls import path
from .views import *
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'settings/user_data', ChangeUserView, basename='settings/user_data/')

urlpatterns = [
    #####################################          USER          ######################################
    path('sign_up', SignUpView.as_view(), name='sign_up'),
    path('login', LoginView.as_view(), name='login'),
    path('user', LoginView.as_view(), name='user'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('settings/user_data', ChangeUserDataView.as_view(), name='user_data'),
    path('personal_data', ChangePersonalDataView.as_view(), name='personal_data'),
    path('settings/profile_image', PostProfileImage.as_view(), name='profile_image'),
    path('settings/change_password', ChangePasswordView.as_view(), name='change_password'),
    path('login/forgot_password', ForgotPasswordView.as_view(), name='forgot_password'),
    path('adminsite/users', GetAllUsersView.as_view(), name='all_users'),
    path('search_results', SearchUserView.as_view(), name='search_user'),

    ####################################         FRIENDS         #####################################
    path('notifications/requests', FriendRequestView.as_view(), name='friend_requests'),
    path('notifications/requests/respond', FriendRequestView.as_view(), name='respond_to_friend_request'),
    path('connected_users', GetFriendsView.as_view(), name='users_friends'),
    path('notifications/requests/send', GetFriendsView.as_view(), name='send_request'),#

    ###############################        POSTS AND PROPOSALS        ################################
    path('posts/recommended/', PostsView.as_view(), name='all_posts'),
    path('posts/upload', PostsView.as_view(), name='post_post'),
    path('posts/my', MyPostsView.as_view(), name='my_posts'),
    path('proposals/apply', ThumbsUpView.as_view(), name='like_post_proposal'),
    path('posts/comment', PostCommentView.as_view(), name='post_comment'),
    path('proposals/recommended', ProposalsView.as_view(), name='all_proposals'),
    path('proposals/upload', ProposalsView.as_view(), name='post_proposal'),
    path('proposals/my', MyProposalsView.as_view(), name='my_proposals'),
    path('notifications/interactions', UserInteractionsView.as_view(), name='interactions'),#

    #####################################          CHAT          ######################################
    path('discussions', GetChatsView.as_view(), name='get_chats'),
    path('discussions/id', GetChatfromIdView.as_view(), name='get_a_chat'),
    path('discussions/message', SendMessageView.as_view(), name='send_message'),

]
