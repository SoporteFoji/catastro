# Generated by Django 2.1.1 on 2018-10-14 23:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0017_auto_20181014_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='castmember',
            name='orchestra',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cast_members', to='foji.Orchestra'),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='orchestra',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='instructors', to='foji.Orchestra'),
        ),
    ]