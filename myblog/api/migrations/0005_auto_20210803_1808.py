# Generated by Django 3.2.5 on 2021-08-03 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_travelpost'),
    ]

    operations = [
        migrations.CreateModel(
            name='TravelBulletPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='travelpost',
            name='content',
            field=models.CharField(blank=True, max_length=50000, null=True),
        ),
        migrations.AddField(
            model_name='travelpost',
            name='bullets',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.travelbulletpoint'),
            preserve_default=False,
        ),
    ]
