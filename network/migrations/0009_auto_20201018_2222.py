# Generated by Django 3.1 on 2020-10-18 22:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_auto_20201018_2220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='network.post'),
        ),
        migrations.RemoveField(
            model_name='like',
            name='user',
        ),
        migrations.AddField(
            model_name='like',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='network.user'),
            preserve_default=False,
        ),
    ]