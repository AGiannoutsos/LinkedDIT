from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'settings/user_data', ChangeUserView, basename='settings/user_data/')

urlpatterns = [
    path('sign_up/', SignUpView.as_view(), name='sign_up'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserAuthView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('settings/user_data/', ChangeUserView.as_view(), name='user_data'),
    path('personal_data/', ChangePersonalDataView.as_view(), name='personal_data'),
    # path('posts/recommended', AllPostsView.as_view(), name='all_posts')
]
              # + router.urls
