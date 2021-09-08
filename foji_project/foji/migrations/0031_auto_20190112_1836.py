# Generated by Django 2.1.5 on 2019-01-12 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foji', '0030_auto_20181028_2239'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoordinatorManager',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AddField(
            model_name='orchestra',
            name='orchestra_status',
            field=models.CharField(choices=[('inactive', 'Inactiva'), ('paused', 'En pausa'), ('active', 'Activa')], default='paused', max_length=256),
        ),
    ]
