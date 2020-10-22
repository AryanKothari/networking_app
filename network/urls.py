
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create", views.create, name="create"),
    path("following", views.following, name="following"),
    path("user/<str:username>", views.user_view, name="user_view"),
    path("user/<str:username>/follow", views.follow, name="follow"),
    path("user/<str:username>/unfollow", views.unfollow, name="unfollow"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("likes", views.like, name="like"),
    
]
