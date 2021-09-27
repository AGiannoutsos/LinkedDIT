from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(MyUser)
admin.site.register(PersonalData)
admin.site.register(Post)
admin.site.register(JobProposal)
admin.site.register(Content)
admin.site.register(Comment)
admin.site.register(Message)
admin.site.register(Chat)
admin.site.register(FriendRequest)
admin.site.register(FriendshipList)