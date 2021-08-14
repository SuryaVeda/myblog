from django.db import models
from accounts.models import User
from django.dispatch import receiver
from django.db.models.signals import post_delete


# Create your models here.

class SomePost(models.Model):
    def get_comments (self):
        return list(self.blogpostcomment_set.all())
    def get_replies(self):
        return list(self.commentreply_set.all())
class Fact(models.Model):
    para = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str( self.pk)

class BlogPost(models.Model):
    comments = models.OneToOneField(SomePost, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    heading = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to='media/')
    def delete(self, *args, **kwargs):
        return self.comments.delete()

    def get_user(self):
        if self.user:
            user = {}
            user['username'] = self.user.username
            user['email'] = self.user.email
            user['staff'] = self.user.staff
            user['admin'] = self.user.admin
            user['is_authenticated'] = True  
            return user
        else:
            return {'username':'Anonymous'}
    def get_comments (self):
        return self.comments.get_comments()
    def __str__(self):
        return str( self.heading)

class BlogPostComment(models.Model):
    replies = models.OneToOneField(SomePost, related_name='replies', on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    post = models.ForeignKey(SomePost, on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=500, blank=True, null=True)
    def get_user(self):
        if self.user:
            user = {}
            user['username'] = self.user.username
            user['email'] = self.user.email
            user['staff'] = self.user.staff
            user['admin'] = self.user.admin
            user['is_authenticated'] = True  
            return user
        else:
            return {'username':'Anonymous'}
    def __str__(self):
        return str( self.text)

    def get_replies(self):
        return self.replies.get_replies()

class CommentReply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    post = models.ForeignKey(SomePost, on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=500, blank=True, null=True)
    def get_user(self):
        if self.user:
            user = {}
            user['username'] = self.user.username
            user['email'] = self.user.email
            user['staff'] = self.user.staff
            user['admin'] = self.user.admin
            user['is_authenticated'] = True  
            return user
        else:
            return {'username':'Anonymous'}
    def __str__(self):
        return str( self.text)

class TravelBulletPoint(models.Model):
    text = models.CharField(max_length=500, blank=True, null=True)
    def __str__(self):
        return str( self.text)



class TravelPost(models.Model):
    comments = models.OneToOneField(SomePost, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    heading = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=50000, blank=True, null=True)
    bullets = models.ForeignKey(TravelBulletPoint, on_delete=models.CASCADE, null=True, blank=True)
    def get_user(self):
        if self.user:
            user = {}
            user['username'] = self.user.username
            user['email'] = self.user.email
            user['staff'] = self.user.staff
            user['admin'] = self.user.admin
            user['is_authenticated'] = True  
            return user
        else:
            return {'username':'Anonymous'}

    def get_images(self):
        x = []
        images=  list(self.imageupload_set.all())
        for i in images:
            x.append(i.image.url)

        return x

    def get_post_id(self):
        return 'travel_main_post_{0}'.format(self.pk)

    def get_comments (self):
        return self.comments.get_comments()

    def __str__(self):
        return str( self.heading)

class ImageUpload(models.Model):
    post = models.ForeignKey(TravelPost, on_delete=models.CASCADE)
    image = models.ImageField( upload_to='travel', blank= True, null=True)

@receiver(post_delete, sender=BlogPost)
def post_delete_blogpost(sender, instance, *args, **kwargs):
    if instance.comments: # just in case user is not specified
        instance.comments.delete()

@receiver(post_delete, sender=TravelPost)
def post_delete_travelpost(sender, instance, *args, **kwargs):
    if instance.comments: # just in case user is not specified
        instance.comments.delete()

@receiver(post_delete, sender=BlogPostComment)
def post_delete_blogpostcomment(sender, instance, *args, **kwargs):
    if instance.replies: # just in case user is not specified
        instance.replies.delete()
