# Generated by Django 3.2.5 on 2021-07-26 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(blank=True, max_length=500, null=True)),
                ('content', models.CharField(blank=True, max_length=500, null=True)),
                ('image', models.ImageField(upload_to='media/')),
            ],
        ),
    ]
