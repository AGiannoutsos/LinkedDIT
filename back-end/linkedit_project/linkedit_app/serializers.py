from rest_framework import serializers
from rest_framework.response import Response
from .models import *


# 29-8 - DONE
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
        return Response(instance.email)



class PersonalDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalData
        fields = ['id', 'title', 'content', 'visibility']

    def create(self, validated_data):
        personal_data_instance, created = PersonalData.objects.get_or_create(validated_data)

        user = self.context.get('user')
        user.personal_data.add(personal_data_instance)
        user.save()
        return(personal_data_instance)


class UserAuthSerializer(serializers.ModelSerializer):
    personal_data = PersonalDataSerializer(many=True)

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']



class ChangeUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'avatar', 'first_name', 'last_name', 'phone', 'email', 'personal_data']



# # 1-9
# class ContentSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Content
#         fields = ['text', 'file']
#
#
# class LikeSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = LikeInteraction
#         fields = ['like']
#
#
# class CommentSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Comment
#         fields = ['commenter', 'text']
#
#
# class AllPostsSerializer(serializers.ModelSerializer):
#     content = ContentSerializer(read_only=True, many=True)
#     likes = LikeSerializer(read_only=True, many=True)
#     comments = CommentSerializer(read_only=True, many=True)
#     # poster = serializers.
#
#     class Meta:
#         model = Post
#         fields = ['poster', 'date', 'content', 'likes', 'comments']
