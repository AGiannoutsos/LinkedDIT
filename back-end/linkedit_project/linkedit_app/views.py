from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import *
from .models import *
import jwt
import datetime
from django.shortcuts import get_object_or_404
import json


def authorize(request):
    # token = request.COOKIES.get('jwt')
    token = request.META['HTTP_AUTHORIZATION']

    if not token:
        raise AuthenticationFailed('Unauthenticated')

    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    return payload['id']


#######################################          USER          ########################################

class GetAllUsersView(APIView):
    def get(self, request):
        id = authorize(request)
        users = MyUser.objects.all()
        serializer = UserAuthSerializer(users, many=True, context={'request': request})

        return Response(serializer.data)


class GetConnectedUsers(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        requests = FriendRequest.objects.filter(receiver=user)
        serializer = FriendRequestSerializer(requests, many=True, context={'request': request})
        return Response(serializer.data)


class SignUpView(APIView):

    def post(self, request):

        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class LoginView(APIView):

    def get(self, request):

        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        if user.personal_data.count()==0:
            profession = PersonalData.objects.create(title='Profession', visibility=True)
            current_job = PersonalData.objects.create(title='Current Job Position', visibility=True)
            experience = PersonalData.objects.create(title='Professional Experience', visibility=True)
            education = PersonalData.objects.create(title='Education', visibility=True)
            skills = PersonalData.objects.create(title='Skills', visibility=True)
            user.personal_data.add(profession, current_job, experience, education, skills)

        serializer = UserAuthSerializer(user, context={'request': request})

        return Response(serializer.data)

    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = MyUser.objects.filter(username=username).first()
        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        # Make jw token for authentication
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        # Send token via cookies
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'token': token
        }
        return response


class LogoutView(APIView):

    def post(self, request):

        response = Response()
        response.delete_cookie('jwt')

        response.data = {
            'message': 'ok'
        }
        return response


class ChangeUserDataView(APIView):

    # permission_classes = [AllowAny]

    def post(self, request):
        user = MyUser.objects.get(username=request.data['username'])
        serializer = ChangeUserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class ChangePasswordView(APIView):

    # permission_classes = [AllowAny]

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        request.data.pop('old')
        serializer = ChangePasswordSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class ChangePersonalDataView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        # print(user)

        serializer = PersonalDataSerializer(data=request.data, context={"user": user})

        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class PostProfileImage(APIView):

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        image = request.data.get('image')
        serializer = ProfileImageSerializer(user, data=request.data, context={'image': image})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class ForgotPasswordView(APIView):

    def post(self, request):
        # handles password retrieving via email
        email = request.data['email']
        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class SearchUserView(APIView):

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        first_name = request.data['first_name']
        last_name = request.data['last_name']

        users = MyUser.objects.filter(first_name__contains=first_name).filter(last_name__contains=last_name).exclude(id=user.id)
        serializer = FriendSerializer(users, many=True, context={'request': request})

        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, person in enumerate(serializer_data):
            other_user = person['id']
            other_user = MyUser.objects.filter(id=other_user).first()
            if not friends.friends.filter(username__contains=other_user.username).exists() and not user == other_user:
                person['connected'] = False

        return Response(serializer_data)


######################################         FRIENDS         #######################################

class GetFriendsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        queryset = FriendshipList.objects.get(user=user)
        serializer = FriendShipSerializer(queryset, context={'request': request})

        return Response(serializer.data)


class FriendRequestView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        requests = FriendRequest.objects.filter(receiver=user)
        serializer = FriendRequestSerializer(requests, many=True, context={'request': request})

        return Response(serializer.data)

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        other_user = MyUser.objects.get(id=request.data['id'])
        friend_request = FriendRequest.objects.get(sender=other_user)

        if request.data['answer']=='accept':

            users_friendships = FriendshipList.objects.get(user=user)
            users_friendships.friends.add(other_user)

            other_user_friendships = FriendshipList.objects.get(user=other_user)
            other_user_friendships.friends.add(user)

        friend_request.delete()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


##################################        POSTS AND PROPOSALS        ###################################

class PostsView(APIView):

    def get(self, request):

        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        posts = Post.objects.all().exclude(user=user)
        serializer = PostsSerializer(posts, many=True, context={'request': request})

        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, post in enumerate(serializer_data):
            likes = post['likes']
            for j, like in enumerate(likes):
                other_user = like['id']
                other_user = MyUser.objects.filter(id=other_user).first()
                if not friends.friends.filter(
                        username__contains=other_user.username).exists() and not user == other_user:
                    likes[j]['connected'] = False

        return Response(serializer_data)

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        jason = json.loads(request.data.get('json'))
        date = jason['date']
        text = jason['content']['text']
        file = jason['file']['type']

        content_obj = Content.objects.create(text=text, type=type, url=file)
        post_obj = Post.objects.create(user=user, date=date, content=content_obj)
        serializer = PostsSerializer(post_obj)

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class MyPostsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        posts = Post.objects.filter(user=user)

        serializer = PostsSerializer(posts, many=True, context={'request': request})

        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, post in enumerate(serializer_data):
            likes = post['likes']
            for j, like in enumerate(likes):
                other_user = like['id']
                other_user = MyUser.objects.filter(id=other_user).first()
                if not friends.friends.filter(username__contains=other_user.username).exists() and not user==other_user:
                    likes[j]['connected'] = False

        return Response(serializer_data)


class MyProposalsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        proposals = JobProposal.objects.filter(user=user)

        serializer = ProposalsSerializer(proposals, many=True, context={'request': request})

        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, proposal in enumerate(serializer_data):
            likes = proposal['likes']
            for j, like in enumerate(likes):
                other_user = like['id']
                other_user = MyUser.objects.filter(id=other_user).first()
                if not friends.friends.filter(username__contains=other_user.username).exists() and not user == other_user:
                    likes[j]['connected'] = False

        return Response(serializer_data)


class ProposalsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        proposals = JobProposal.objects.all().exclude(user=user)
        serializer = ProposalsSerializer(proposals, many=True, context={'request': request})

        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, post in enumerate(serializer_data):
            likes = post['likes']
            for j, like in enumerate(likes):
                other_user = like['id']
                other_user = MyUser.objects.filter(id=other_user).first()
                if not friends.friends.filter(
                        username__contains=other_user.username).exists() and not user == other_user:
                    likes[j]['connected'] = False

        return Response(serializer_data)

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        jason = json.loads(request.data.get('json'))
        date = jason['date']
        text = jason['content']['text']
        file = jason['file']['type']

        content_obj = Content.objects.create(text=text, type=type, url=file)
        proposal_obj = JobProposal.objects.create(user=user, date=date, content=content_obj)
        serializer = ProposalsSerializer(proposal_obj)

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response

class UserInteractionsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        # my_posts = Post.objects.filter(user=user)
        # my_proposals = JobProposal.objects.filter(user=user)
        # if my_posts.exists() and not my_proposals.exists():
        #     print("hiii")
        #     like = PostLikeInteraction(my_posts, many=True)
        #     comments = PostCommentInteraction(my_posts, many=True)
        #     return Response({'likes': like.data,
        #                      'comments': comments.data})
        # if my_proposals.exists() and not my_posts.exists():
        #     apply = ProposalLikeInteraction(my_proposals, many=True)
        #     return Response({'likes': apply.data})
        # if my_proposals.exists() and my_posts.exists():
        #     like = PostLikeInteraction(my_posts, many=True)
        #     comments = CommentInteraction(my_posts, many=True)
        #     apply = ProposalLikeInteraction(my_proposals, many=True)
        #     return Response({'likes': like.data,
        #                      'apply': apply.data,
        #                      'comments': comments.data})

        interactions = {}
        interactions['likes'] = Post.objects.filter(user=user)
        interactions['comments'] = Post.objects.filter(user=user)
        interactions['apply'] = JobProposal.objects.filter(user=user)
        serializer = InteractionsSerializer(interactions, context={'request': request})

        return Response(serializer.data)


class PostCommentView(APIView):

    def post(self, request):
        id = authorize(request)

        post_id = request.data.get('id')
        text = request.data.get('comment').get('content').get('text')
        post = Post.objects.filter(id=post_id).first()

        user_data = request.data.get('comment').get('user')
        if user_data:
            user_instance = MyUser.objects.filter(id=user_data.get('id')).first()
        else:
            user_instance = None

        serializer = CommentSerializer(data=request.data.get('comment'), context={"post": post, "user": user_instance,
                                                                                  "text": text})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


class ThumbsUpView(APIView):

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.get(id=id)

        if request.data.get('thumbs'):

            post_id = request.data.get('id')
            post = Post.objects.filter(id=post_id).first()

            if request.data.get('thumbs')=='down':
                post.likes.remove(user)
            else:
                post.likes.add(user)
            # Important!!!
            # try:
            #     obj = MyModel.objects.get(pk=1)
            # except MyModel.DoesNotExist:
            #     raise Http404("No MyModel matches the given query.")

        else:

            proposal_id = request.data.get('id')
            proposal = JobProposal.objects.filter(id=proposal_id).first()

            if request.data.get('apply')=='down':
                proposal.likes.remove(user)
            else:
                proposal.likes.add(user)

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response


#######################################          CHAT          ########################################

class GetChatsView(APIView):

    def get(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()

        chats1 = Chat.objects.filter(user1=user)
        chats2 = Chat.objects.filter(user2=user)
        chats = chats1 | chats2

        serializer = ChatSerializer(chats, many=True, context={'request': request})
        serializer_data = serializer.data
        friends = FriendshipList.objects.filter(user=user).first()
        for index, chat in enumerate(serializer_data):
            user1 = chat['user1']['id']
            user2 = chat['user2']['id']
            if user1 == user.id:
                other_user = MyUser.objects.filter(id=user2).first()
                print(other_user.username)
                if not friends.friends.filter(username__contains=other_user.username).exists():
                    serializer_data[index]['user2']['connected'] = False
            if user2 == user.id:
                other_user = MyUser.objects.filter(id=user1).first()
                if not friends.friends.filter(username__contains=other_user.username).exists():
                    serializer_data[index]['user1']['connected'] = False

        return Response(serializer_data)


class GetChatfromIdView(APIView):

    def post(self, request):
        id = authorize(request)
        user = MyUser.objects.filter(id=id).first()
        other_user_id = request.data['otherUserId']
        other_user = MyUser.objects.filter(id=other_user_id).first()

        chats1 = Chat.objects.filter(user1=user, user2=other_user)
        chats2 = Chat.objects.filter(user1=other_user, user2=user)
        chats = chats1 | chats2

        if not chats1.exists() and not chats2.exists():
            chats = Chat.objects.create(user1=user, user2=other_user)

        serializer = ChatSerializer(chats, many=True, context={'request': request})

        # hack
        serializer_data = serializer.data
        for index, chat in enumerate(serializer_data):
            user1 = chat['user1']['id']
            user2 = chat['user2']['id']
            friends = FriendshipList.objects.filter(user=user).first()
            if not friends.friends.filter(username__contains=other_user.username).exists():
                if user1 == user.id:
                    serializer_data[index]['user2']['connected'] = False
                if user2 == user.id:
                    serializer_data[index]['user1']['connected'] = False

        return Response(serializer_data)


class SendMessageView(APIView):

    def post(self, request):
        id = authorize(request)
        user_data = request.data.get('message').get('user')
        chat_id = request.data.get('id')
        text = request.data.get('message').get('content').get('text')
        chat = Chat.objects.filter(id=chat_id).first()

        if user_data:
            user_instance = MyUser.objects.filter(id=user_data.get('id')).first()
        else:
            user_instance = None

        serializer = MessageSerializer(data=request.data.get('message'), context={"chat": chat, "user": user_instance,
                                                                   "text": text, "request": request})

        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            'message': 'ok'
        }
        return response
