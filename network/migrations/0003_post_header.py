# Generated by Django 3.1 on 2020-10-13 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='header',
            field=models.CharField(default='default', max_length=400),
            preserve_default=False,
        ),
    ]