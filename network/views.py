from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from rest_framework import viewsets
from .serializers import LikeSerializer, PostSerializer


from .models import User, Post, Profile, Like
from .forms import NewPostForm

class LikeView(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

def index(request):
    posts = Post.objects.all()
    paginator = Paginator(posts,10)
    page = request.GET.get('page')
    posts = paginator.get_page(page)
    return render(request, "network/index.html", {
        'form': NewPostForm(),
        'posts': posts,
    })


@csrf_exempt
@login_required
def create(request):
    if request.method == "POST":
        form = NewPostForm(request.POST)
        if form.is_valid():
            post = Post()
            post.author = request.user
            post.body = form.cleaned_data['body']
            post.save()
            return HttpResponseRedirect(reverse('index'))
        else: 
            return render(request, "network/index.html", {
                'form': NewPostForm(),
            })
    else: 
        return HttpResponseRedirect(reverse("index"))


def user_view(request, username):
    posts = Post.objects.filter(author__username=username)
    user = User.objects.get(username=username)
    profile = Profile.objects.get(user__username=username)
    if User.objects.get(username=request.user.username) in profile.follower.all():
        already_follows = True
    else:
        already_follows = False
    if request.user.username == user.username:
        own_profile = True
    else:
        own_profile = False
    return render(request, "network/user_view.html", {
        'posts': posts,
        'user': user,
        'username': username,
        'own_profile': own_profile,
        'follower_count': profile.follower.count(),
        'following_count': profile.following.count(),
        'already_follows': already_follows,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
@login_required
def following(request):
    following = Profile.objects.get(user=request.user).following.all()
    posts = Post.objects.filter(author__in=following)
    return render(request, "network/following_view.html", {
        'form': NewPostForm(),
        'posts': posts,
    })


def follow(request, username):
    #add user to "following"
    main_user = Profile.objects.get(user__username=request.user.username)
    follow = User.objects.get(username=username)
    main_user.following.add(follow)

    #add user to "follower"
    user = Profile.objects.get(user__username=username)
    follower = User.objects.get(username=request.user.username)
    user.follower.add(follower)
    return HttpResponseRedirect(f'/user/{username}')


def unfollow(request, username):
    #remove user to "following"
    main_user = Profile.objects.get(user__username=request.user.username)
    follow = User.objects.get(username=username)
    main_user.following.remove(follow)

    #remove user to "follower"
    user = Profile.objects.get(user__username=username)
    follower = User.objects.get(username=request.user.username)
    user.follower.remove(follower)
    return HttpResponseRedirect(f'/user/{username}')

@csrf_exempt
@login_required
def like(request):
    pass


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            profile = Profile()
            profile.user = user
            profile.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
