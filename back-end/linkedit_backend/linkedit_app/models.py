from django.db import models
from django.contrib.auth.models import AbstractUser


#######################################          USER          ########################################

class PersonalData(models.Model):

    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True)
    visibility = models.BooleanField(null=False, blank=False)

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.title)


class MyUser(AbstractUser):
    # inherited fields: username, email, first_name, last_name, password, is_staff

    phone = models.CharField(max_length=100, null=True, blank=True)
    avatar = models.FileField(upload_to='user_images/', blank=True, null=True)
    personal_data = models.ManyToManyField(PersonalData, blank=True)
    # friends = models.ManyToManyField(FriendShip, blank=True)


######################################         FRIENDS         #######################################

class FriendRequest(models.Model):
    sender = models.ForeignKey(MyUser, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(MyUser, related_name='receiver', on_delete=models.CASCADE)

    def __str__(self):
        return '%s object (%s) : %s --> %s' % (self.__class__.__name__, self.pk, self.sender, self.receiver)


class FriendshipList(models.Model):
    user = models.ForeignKey(MyUser, related_name='current_user', on_delete=models.CASCADE)
    friends = models.ManyToManyField(MyUser, blank=True)

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.user)


##################################        POSTS AND PROPOSALS        ###################################

class Content(models.Model):

    text = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=20, null=True, blank=True)
    url = models.FileField(upload_to='user_files/', blank=True, null=True)


class Comment(models.Model):

    user = models.ForeignKey(MyUser, related_name='commenter', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.user)


class JobProposal(models.Model):

    user = models.ForeignKey(MyUser, related_name='author', on_delete=models.CASCADE)
    date = models.CharField(max_length=22, null=True, blank=True)
    content = models.ForeignKey(Content,  related_name='proposal', on_delete=models.CASCADE, null=True)
    likes = models.ManyToManyField(MyUser, blank=True)

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.user)


class Post(models.Model):

    user = models.ForeignKey(MyUser, related_name='poster', on_delete=models.CASCADE)
    date = models.CharField(max_length=22, null=True, blank=True)
    content = models.ForeignKey(Content,  related_name='post', on_delete=models.CASCADE, null=True)
    likes = models.ManyToManyField(MyUser, blank=True)
    comments = models.ManyToManyField(Comment, blank=True)

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.user)


#######################################          CHAT          ########################################

class Message(models.Model):
    user = models.ForeignKey(MyUser, related_name='texter', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return '%s object (%s) : %s' % (self.__class__.__name__, self.pk, self.user)


class Chat(models.Model):
    user1 = models.ForeignKey(MyUser, related_name='participant1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(MyUser, related_name='participant2', on_delete=models.CASCADE)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return '%s object (%s) : %s - %s' % (self.__class__.__name__, self.pk, self.user1, self.user2)
