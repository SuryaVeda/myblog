import json, bleach
from django.db import connections
from django.db.models.expressions import F
from django.shortcuts import redirect, render
from .models import *
from django.views import View
from django.http import HttpResponse, JsonResponse
from accounts.models import User
from .decorators import *
from django.utils.decorators import method_decorator

# Create your views here.

class CheckUser(View):
    def get(self, request, *args, **kwargs ):
    
        try:
            if request.session['user_id']:
                user = {}
                u = User.objects.get(id = request.session['user_id'])
                user['username'] = u.username
                user['email'] = u.email
                user['staff'] = u.staff
                user['admin'] = u.admin
                user['is_authenticated'] = True                    
                return JsonResponse({'user': user})
            
            else:
                
                return JsonResponse({'user': ''})
        except:
            return JsonResponse({'user': ''})


@method_decorator(staff_required, name='post')
class CreateFact(View):
    def get(self, request, *args, **kwargs ):
        print('get request')
        para = list(Fact.objects.order_by('-pk'))[0].para
        return JsonResponse({'fact_data': {'para': para}})
    def post(self, *args, **kwargs):
        fact_field = self.request.POST.dict()
        print(fact_field)
        x = Fact.objects.create(para = fact_field['fact_field'])
        print(type(x.para))
        return JsonResponse({'fact_data': {'para': x.para}}, safe=False)


@method_decorator(staff_required, name='post')
class CreateBlogPost(View):
    def get(self, request, *args, **kwargs ):
        
        print('get request')
        post = list(BlogPost.objects.order_by('-pk'))
        def get_post_dict(i):
            comments = []
            for j in i.get_comments():
                replies = []
                for k in j.get_replies():
                    try:
                        replies.append({'text': k.text, 'image':k.image.url, 'pk':k.pk, 'user':k.get_user()})
                    except:
                        replies.append({'text': k.text, 'image':'', 'pk':k.pk,'user':k.get_user()})
                try: 
                    comments.append({'text': j.text, 'image':j.image.url, 'pk':j.pk, 'replies': replies, 'user':j.get_user()})
                except:
                    comments.append({'text': j.text, 'image':'', 'pk':j.pk, 'replies': replies, 'user':j.get_user()})

            try:
                return {'heading':i.heading, 'content':i.content, 'image':i.image.url, 'comments':comments, 'pk':i.pk, 'user':i.get_user()}
            except:
                return {'heading':i.heading, 'content':i.content, 'image':'', 'comments':comments, 'pk':i.pk, 'user':i.get_user()}

        post = list(map(get_post_dict, post))
        
        return JsonResponse({'wall_data': post }, safe=False)
    def post(self, *args, **kwargs): 
        if self.request.session['user_id']:
            user = User.objects.get(id = self.request.session['user_id'])
            post_fields = self.request.POST.dict()
            somepost = SomePost.objects.create()
            BlogPost.objects.create(comments = somepost, user = user,heading = post_fields['heading_field'],content = post_fields['content_field'])
        return redirect('api:create_post')

@method_decorator(staff_required, name='post')
class CreateBlogPostComment(View):
    
    def post(self, *args, **kwargs):
        if self.request.session['user_id']:
            user = User.objects.get(id = self.request.session['user_id'])
            comment_field = self.request.POST
            post = BlogPost.objects.get(pk = int(comment_field.get('fk_pk'))).comments
            somepost = SomePost.objects.create()
            BlogPostComment.objects.create(replies = somepost,user=user, post = post, text = comment_field.get('content_field'))
        
        return redirect('api:create_post')
@method_decorator(staff_required, name='post')
class CreateTravelPostComment(View):
    
    def post(self, *args, **kwargs):
        if self.request.session['user_id']:
            user = User.objects.get(id = self.request.session['user_id'])
            comment_field = self.request.POST
            post = TravelPost.objects.get(pk = int(comment_field.get('fk_pk'))).comments
            somepost = SomePost.objects.create()
            BlogPostComment.objects.create(replies = somepost,user=user, post = post, text = comment_field.get('content_field'))
        
        return redirect('api:create_travel_post')

@method_decorator(staff_required, name='post')
class CreateCommentReply(View):
    
    def post(self, *args, **kwargs):
        try:
            redirect_url = self.request.POST.get('redirect_url')
        except:
            redirect_url = '/app'
        if self.request.session['user_id']:
            user = User.objects.get(id = self.request.session['user_id'])
            reply_field = self.request.POST
            post = BlogPostComment.objects.get(pk = int(reply_field.get('fk_pk'))).replies
            CommentReply.objects.create(user =user, post = post, text = reply_field.get('reply_field'))
        
        return redirect(redirect_url)

@method_decorator(staff_required, name='post')
class CreateTravelPost(View):
    def get(self, request, *args, **kwargs ):
        print('get request kjlkj')
        
        post = list(TravelPost.objects.order_by('-pk'))
        def get_post_dict(i):
           
            comments = []
            
            for j in i.get_comments():
                replies = []
                for k in j.get_replies():
                    try:
                        replies.append({'text': k.text, 'image':k.image.url, 'pk':k.pk, 'user':k.get_user()})
                    except:
                        replies.append({'text': k.text, 'image':'', 'pk':k.pk,'user':k.get_user()})
                try: 
                    comments.append({'text': j.text, 'image':j.image.url, 'pk':j.pk, 'replies': replies, 'user':j.get_user()})
                except:
                    comments.append({'text': j.text, 'image':'', 'pk':j.pk, 'replies': replies, 'user':j.get_user()})
            return {'heading':i.heading, 'content':i.content, 'image':i.get_images(), 'comments':comments, 'pk':i.pk, 'user':i.get_user()}

            
        post = list(map(get_post_dict, post))
        print('hey')
        
        return JsonResponse({'travel_data': post }, safe=False)


    def post(self, *args, **kwargs):
       
        files = self.request.FILES
        image = []
        for key in files:
            image.append(files.getlist(key))
        post_fields = self.request.POST.dict()
        
        
        if self.request.session['user_id']:
            user = User.objects.get(id = self.request.session['user_id'])
            post_fields = self.request.POST.dict()
            if 'pk' in post_fields:
                pk = int(post_fields['pk'])
                travelpost = TravelPost.objects.get(pk=pk)
                travelpost.heading = bleach.clean(post_fields['heading_field'],strip=True)
                travelpost.content = bleach.clean(post_fields['content_field'],tags=['h2', 'b'],attributes=['style', 'class'],styles=['color', 'font-weight', 'font-size'], strip = True)
                travelpost.save()
            else:
                somepost = SomePost.objects.create()
                travelpost = TravelPost.objects.create(user=user, comments = somepost, heading = bleach.clean(post_fields['heading_field'],strip=True),content = bleach.clean(post_fields['content_field'],tags=['h2', 'b'],attributes=['style', 'class'],styles=['color', 'font-weight', 'font-size'], strip = True))
        if image:
            for i in image[0]:
                print(i)
                ImageUpload.objects.create(post = travelpost, image = i)
        travelpost.save()
               

        return redirect('api:create_travel_post')
