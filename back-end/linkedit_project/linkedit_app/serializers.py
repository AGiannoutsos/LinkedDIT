from rest_framework import serializers
from rest_framework.response import Response
from .models import *


#######################################          USER          ########################################

class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'first_name', 'last_name', 'phone', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    # Overriding create() for password hashing https://www.youtube.com/watch?v=PUzgZrS_piQ
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return Response(instance)           ## instance.email


# POST personal_data    -   UNDER TESTING
class PersonalDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalData
        fields = ['id', 'title', 'content', 'visibility']

    def create(self, validated_data):
        user = self.context.get('user')
        title = validated_data.pop('title')

        user_existance = MyUser.objects.get(id=user.id)

        if user_existance.personal_data.filter(title__contains=title).exists():
            pdata = user_existance.personal_data.get(title__contains=title)
            user_existance.personal_data.remove(pdata)

        personal_data_instance = PersonalData.objects.create(title=title,
                                                             content=validated_data.pop('content'),
                                                             visibility=validated_data.pop('visibility'))
        user.personal_data.add(personal_data_instance)
        user.save()
        return(personal_data_instance)


# POST user/  UserAuthView  -   DONE
class UserAuthSerializer(serializers.ModelSerializer):
    # avatar = serializers.SerializerMethodField('get_avatar_url')
    personal_data = PersonalDataSerializer(many=True)

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']

    # def get_avatar_url(self, obj):
    #     # request = self.context.get('request')
    #     # photo_url = obj.fingerprint.url
    #     return request.build_absolute_uri(photo_url)


class SimpleUserSerializer(serializers.ModelSerializer):
    # avatar = serializers.SerializerMethodField('get_avatar_url')

    class Meta:
        model = MyUser
        fields = ['id', 'avatar', 'first_name', 'last_name']

    # def get_avatar_url(self, obj):
    #     request = self.context.get('request')
    #     photo_url = obj.fingerprint.url
    #     return request.build_absolute_uri(photo_url)


# POST settings/user_data   -   DONE
class ChangeUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']


# POST settings/user_data   -   DONE
class ChangePasswordSerializer(serializers.ModelSerializer):
    new = serializers.CharField(source='password')

    class Meta:
        model = MyUser
        fields = ['id', 'new']

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('password'))
        instance.save()
        return instance


# POST settings/user_data   -   DONE
class ProfileImageSerializer(serializers.ModelSerializer):
    # image_url = serializers.SerializerMethodField('get_url')
    class Meta:
        model = MyUser
        fields = ['id', 'avatar']

    def update(self, instance, validated_data):
        image = self.context.get('image')
        instance.avatar = image
        instance.save()
        return instance


######################################         FRIENDS         #######################################


class NotAFriendSerializer(serializers.ModelSerializer):
    connected = serializers.SerializerMethodField()
    personal_data = PersonalDataSerializer(many=True)

    class Meta:
        model = MyUser
        fields = ['id', 'connected', 'username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']

    def get_connected(self, obj):
        return False


class FriendSerializer(serializers.ModelSerializer):
    connected = serializers.SerializerMethodField()
    personal_data = PersonalDataSerializer(many=True)

    class Meta:
        model = MyUser
        fields = ['id', 'connected','username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']

    def get_connected(self, obj):
        return True


class FriendShipSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True)

    class Meta:
        model = FriendshipList
        fields = ['friends']


class FriendRequestSerializer(serializers.ModelSerializer):
    # connected = SerializerMethodField('exists_in_list')
    # personal_data = PersonalDataSerializer(many=True)
    sender = NotAFriendSerializer(read_only=False)

    class Meta:
        model = FriendRequest
        fields = ['id', 'sender']


##################################        POSTS AND PROPOSALS        ###################################

class TheFileField(serializers.Field):

    def to_representation(self, value):
        ret = {
            "type": value.type,
            "url": value.url.url
        }
        return ret

    def to_internal_value(self, data):

        ret = {
            "type": data['type'],
            "url": data['url']
        }
        return ret


class ContentSerializer(serializers.ModelSerializer):
    file = TheFileField(source='*')

    class Meta:
        model = Content
        fields = ['text', 'file']


class TextContentField(serializers.Field):

    def to_representation(self, value):
        ret = {
            "text": value.text
        }
        return ret

    def to_internal_value(self, data):
        ret = {'content': {
            'text': data['text']
        }}
        return ret


class CommentInteraction(serializers.ModelSerializer):
    user = FriendSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['user']


class CommentSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=False)
    content = TextContentField(source='*')

    class Meta:
        model = Comment
        fields = ['user', 'content']

    def create(self, validated_data):
        text = self.context.get('text')
        comment_instance = Comment.objects.create(text=text, user=self.context.get('user'))
        post = self.context.get('post')
        post.comments.add(comment_instance)
        post.save()

        return comment_instance


class PostCommentInteraction(serializers.ModelSerializer):
    comments = CommentInteraction(many=True)

    class Meta:
        model = Post
        fields = ['comments']


class PostLikeInteraction(serializers.ModelSerializer):
    likes = FriendSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ['likes']


# GET recommended or my posts   -
class PostsSerializer(serializers.ModelSerializer):
    content = ContentSerializer()
    likes = FriendSerializer(many=True)
    comments = CommentSerializer(many=True)
    user = SimpleUserSerializer(read_only=False)

    class Meta:
        model = Post
        fields = ['id', 'date', 'user', 'content', 'likes', 'comments']


class ProposalLikeInteraction(serializers.ModelSerializer):
    likes = FriendSerializer(read_only=True, many=True)

    class Meta:
        model = JobProposal
        fields = ['likes']


# GET recommended or my job proposals   -
class ProposalsSerializer(serializers.ModelSerializer):
    content = ContentSerializer()
    likes = FriendSerializer(many=True)
    user = SimpleUserSerializer(read_only=False)

    class Meta:
        model = JobProposal
        fields = ['id', 'date', 'user', 'content', 'likes']


class InteractionsSerializer(serializers.Serializer):
    likes = PostLikeInteraction(read_only=True, many=True)
    apply = ProposalLikeInteraction(read_only=True, many=True)
    comments = PostCommentInteraction(read_only=True, many=True)


#######################################          CHAT          ########################################

class MessageSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(required=False, read_only=False)
    content = TextContentField(source='*')

    class Meta:
        model = Message
        fields = ['user', 'content']

    def create(self, validated_data):
        text = self.context.get('text')
        message_instance = Message.objects.create(text=text, user=self.context.get('user'))

        chat = self.context.get('chat')
        chat.messages.add(message_instance)
        chat.save()

        return message_instance


class ChatSerializer(serializers.ModelSerializer):
    user1 = FriendSerializer(read_only=True)
    user2 = FriendSerializer(read_only=True)
    messages = MessageSerializer(read_only=True, many=True)

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2', 'messages']
