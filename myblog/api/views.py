import json
from django.db import connections
from django.db.models.expressions import F
from django.shortcuts import redirect, render
from .models import *
from django.views import View
from django.http import HttpResponse, JsonResponse
# Create your views here.


class CreateFact(View):
    def get(self, request, *args, **kwargs ):
        print('get request')
        para = list(Fact.objects.order_by('-pk'))[0].para
        return JsonResponse({'fact_data': {'para': para}})
    def post(self, *args, **kwargs):
        fact_field = json.loads(self.request.body.decode('utf-8'))['fact_field'][0]
        print(fact_field)
        x = Fact.objects.create(para = fact_field)
        print(type(x.para))
        return JsonResponse({'fact_data': {'para': x.para}}, safe=False)


class CreateBlogPost(View):
    def get(self, request, *args, **kwargs ):
        print('get request')
        post = list(BlogPost.objects.order_by('-pk').values('heading', 'content', 'pk', 'image'))
        
        return JsonResponse({'wall_data': post }, safe=False)
    def post(self, *args, **kwargs):
        post_fields = self.request.POST.dict()
        print(post_fields)
        BlogPost.objects.create(heading = post_fields['heading_field'],content = post_fields['content_field'])

        return redirect('api:create_post')

class CreateBlogPostComment(View):
    
    def post(self, *args, **kwargs):
        comment_field = json.loads(self.request.body.decode('utf-8'))
        print(comment_field)
        BlogPostComment.objects.create(text = comment_field['text'][0])

        return redirect('api:create_post')

class CreateTravelPost(View):
    def get(self, request, *args, **kwargs ):
        print('get request')
        post = list(TravelPost.objects.order_by('-pk').values('heading', 'content', 'pk', 'image'))
        print(post)
        
        return JsonResponse({'travel_data': post }, safe=False)
    def post(self, *args, **kwargs):
       
        print(self.request.FILES)

        post_fields = self.request.POST.dict()
        image = self.request.FILES.values()
        if 'pk' in post_fields:
            pk = int(post_fields['pk'])
            print(pk)
            travelpost = TravelPost.objects.get(pk=pk)
            print(travelpost)
            travelpost.heading = post_fields['heading_field']
            travelpost.content = post_fields['content_field']
            
        else:
            travelpost = TravelPost.objects.create(heading = post_fields['heading_field'],content = post_fields['content_field']) 
        
        if image:
            for i in image:
                travelpost.image = i
        travelpost.save()       

        return redirect('api:create_travel_post')
