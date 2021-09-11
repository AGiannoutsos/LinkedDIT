from django.db import models
from django.contrib.auth.models import AbstractUser


# 30-8 - DONE
class PersonalData(models.Model):

    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True)
    visibility = models.BooleanField(null=False, blank=False)

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.title)


class MyUser(AbstractUser):
    # inherited fields: username, email, first_name, last_name, password, is_staff

    phone = models.CharField(max_length=100, null=True, blank=True)
    avatar = models.FileField(upload_to='user_images', blank=True, null=True)
    personal_data = models.ManyToManyField(PersonalData, blank=True)


# # 31-8
# class Content(models.Model):
#
#     text = models.TextField()
#     file = models.FileField(upload_to='media', blank=True, null=True)
#
#
# class LikeInteraction(models.Model):
#
#     like = models.ForeignKey(MyUser, related_name='like', on_delete=models.CASCADE)
#
#     def __str__(self):
#         return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.like)
#
#
# class Comment(models.Model):
#
#     commenter = models.ForeignKey(MyUser, related_name='commenter', on_delete=models.CASCADE)
#     text = models.ManyToManyField(Content, blank=True)
#
#     def __str__(self):
#         return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.commenter)
#
#
# class Proposal(models.Model):
#
#     author = models.ForeignKey(MyUser, related_name='author', on_delete=models.CASCADE)
#     date = models.CharField(max_length=100, null=True, blank=True)
#     content = models.ManyToManyField(Content, blank=True)
#     likes = models.ManyToManyField(LikeInteraction, blank=True)
#
#     def __str__(self):
#         return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.author)
#
#
# class Post(models.Model):
#
#     poster = models.ForeignKey(MyUser, related_name='poster', on_delete=models.CASCADE)
#     date = models.DateField(auto_now_add=True)        ##
#     content = models.ManyToManyField(Content, blank=True)
#     likes = models.ManyToManyField(LikeInteraction, blank=True)
#     comments = models.ManyToManyField(Comment, blank=True)
#
#     def __str__(self):
#         return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.poster)

# class Friendship(models.Model):
#     friend1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='fr1', on_delete=models.CASCADE)
#     friend2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='fr2', on_delete=models.CASCADE)
#     visibility = models.BooleanField(null=False, blank=False)

# class Message(models.Model):
#     pass
#
# class Chat(models.Model):
#     messages = models.ManyToManyField(Message, blank=True)