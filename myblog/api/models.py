from django.db import models

# Create your models here.

class Fact(models.Model):
    para = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str( self.pk)

class BlogPost(models.Model):
    heading = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to='media/')
    def get_comments (self):
        return list(self.blogpostcomment_set.all())
    def __str__(self):
        return str( self.heading)

class BlogPostComment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    text = models.CharField(max_length=500, blank=True, null=True)
    def __str__(self):
        return str( self.text)


class TravelBulletPoint(models.Model):
    text = models.CharField(max_length=500, blank=True, null=True)
    def __str__(self):
        return str( self.text)



class TravelPost(models.Model):
    heading = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=50000, blank=True, null=True)
    bullets = models.ForeignKey(TravelBulletPoint, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='media/travel')

    def get_post_id(self):
        return 'travel_main_post_{0}'.format(self.pk)

    def get_comments (self):
        return ''

    def __str__(self):
        return str( self.heading)


