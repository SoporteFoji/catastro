# Generated by Django 2.1.1 on 2018-10-27 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0023_auto_20181023_2206'),
    ]

    operations = [
        migrations.AddField(
            model_name='castmember',
            name='instrument',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='director',
            name='instrument',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='instructor',
            name='instrument',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
