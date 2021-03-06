# Generated by Django 2.1.1 on 2018-09-30 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0003_orchestra'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='facebook',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='instagram',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='pinterest',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='twitter',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='vimeo',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='youtube',
            field=models.URLField(blank=True, null=True),
        ),
    ]
