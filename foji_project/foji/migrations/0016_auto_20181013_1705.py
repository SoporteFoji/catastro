# Generated by Django 2.1.1 on 2018-10-13 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0015_administrator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrator',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='administrator', to='foji.User'),
        ),
        migrations.AlterField(
            model_name='coordinator',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='coordinator', to='foji.User'),
        ),
    ]
