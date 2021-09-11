from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import *
from .models import *
import jwt
import datetime


# 29-8 - DONE

# post sign_up
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


# post login
class LoginView(APIView):

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


# get user
class UserAuthView(APIView):

    def get(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = MyUser.objects.filter(id=payload['id']).first()
        serializer = UserAuthSerializer(user)

        return Response(serializer.data)


# post logout
class LogoutView(APIView):

    def post(self, request):

        response = Response()
        response.delete_cookie('jwt')

        response.data = {
            'message': 'ok'
        }
        return response


# post settings/user_data
class ChangeUserView(APIView):

    # permission_classes = [AllowAny]

    def post(self, request):
        user = MyUser.objects.get(username=request.data['username'])
        serializer = ChangeUserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class ChangePersonalDataView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = MyUser.objects.filter(id=payload['id']).first()

        print(user)

        serializer = PersonalDataSerializer(data=request.data, context={"user": user})

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

# 2-9

# # epistrefei ola ta recommended posts
# class AllPostsView(APIView):
#
#     def get(self, request):
#         pass
