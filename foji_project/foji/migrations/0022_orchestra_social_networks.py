# Generated by Django 2.1.1 on 2018-10-15 04:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0021_auto_20181014_2220'),
    ]

    operations = [
        migrations.AddField(
            model_name='orchestra',
            name='social_networks',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='foji.SocialNetworkInformation'),
        ),
    ]