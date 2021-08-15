# Generated by Django 3.2.5 on 2021-08-14 01:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210812_1106'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentReply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, max_length=500, null=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.blogpostcomment')),
            ],
        ),
    ]
