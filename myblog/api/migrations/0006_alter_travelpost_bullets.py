# Generated by Django 3.2.5 on 2021-08-03 12:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210803_1808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelpost',
            name='bullets',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.travelbulletpoint'),
        ),
    ]
