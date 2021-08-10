from django.urls import path
from . import views
app_name = 'api'
urlpatterns = [
 path('factForm', views.CreateFact.as_view(), name= 'create_fact'),
path('postForm', views.CreateBlogPost.as_view(), name= 'create_post'),  
path('travelPostForm', views.CreateTravelPost.as_view(), name= 'create_travel_post'),  
path('blogCommentForm', views.CreateBlogPostComment.as_view(), name= 'create_post_comment'),


]
