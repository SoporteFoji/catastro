# Generated by Django 2.1.1 on 2018-10-28 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0025_auto_20181027_2340'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orchestra',
            name='website',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='facebook',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='instagram',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='pinterest',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='twitter',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='vimeo',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='socialnetworkinformation',
            name='youtube',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]
